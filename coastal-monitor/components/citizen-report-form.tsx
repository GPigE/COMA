"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Send, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

const reportTypes = [
  { id: "erosion", label: "Erosión Costera", color: "bg-orange-500" },
  { id: "flooding", label: "Inundación", color: "bg-blue-500" },
  { id: "debris", label: "Escombros/Basura", color: "bg-gray-500" },
  { id: "infrastructure", label: "Daño a Infraestructura", color: "bg-red-500" },
  { id: "wildlife", label: "Vida Silvestre Afectada", color: "bg-green-500" },
  { id: "other", label: "Otro", color: "bg-purple-500" },
]

const locations = [
  "Cancún - Zona Hotelera",
  "Cancún - Playa Delfines",
  "Playa del Carmen - Centro",
  "Playa del Carmen - Playacar",
  "Tulum - Zona Arqueológica",
  "Tulum - Playa Paraíso",
  "Holbox - Centro",
  "Holbox - Punta Cocos",
  "Otro",
]

export function CitizenReportForm() {
  const { toast } = useToast()
  const [selectedType, setSelectedType] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [photos, setPhotos] = useState<string[]>([])
  const [useCurrentLocation, setUseCurrentLocation] = useState(false)
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newPhotos = Array.from(files).map((file) => URL.createObjectURL(file))
      setPhotos([...photos, ...newPhotos].slice(0, 3)) // Max 3 photos
    }
  }

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index))
  }

  const getCurrentLocation = () => {
    setUseCurrentLocation(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          toast({
            title: "Ubicación obtenida",
            description: "Se ha registrado tu ubicación actual",
          })
        },
        (error) => {
          toast({
            title: "Error",
            description: "No se pudo obtener la ubicación",
            variant: "destructive",
          })
          setUseCurrentLocation(false)
        },
      )
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Reporte enviado",
      description: "Gracias por tu contribución. Tu reporte ha sido registrado.",
    })

    // Reset form
    setSelectedType("")
    setLocation("")
    setDescription("")
    setPhotos([])
    setCoordinates(null)
    setUseCurrentLocation(false)
    setIsSubmitting(false)
  }

  const isFormValid = selectedType && (location || coordinates) && description.length >= 20

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col overflow-y-auto p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground">Reportar Observación</h2>
        <p className="text-sm text-muted-foreground">Ayuda a monitorear la costa compartiendo tus observaciones</p>
      </div>

      {/* Report Type */}
      <div className="mb-6">
        <Label className="mb-3 block text-sm font-semibold text-foreground">Tipo de Reporte *</Label>
        <div className="grid grid-cols-2 gap-2">
          {reportTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => setSelectedType(type.id)}
              className={`rounded-lg border-2 p-3 text-left text-sm font-medium transition-all ${
                selectedType === type.id
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-primary/50"
              }`}
            >
              <div className={`mb-1 h-2 w-2 rounded-full ${type.color}`} />
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="mb-6">
        <Label className="mb-3 block text-sm font-semibold text-foreground">Ubicación *</Label>
        <div className="space-y-2">
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            disabled={useCurrentLocation}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground disabled:opacity-50"
          >
            <option value="">Selecciona una ubicación</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={getCurrentLocation}
            disabled={useCurrentLocation}
            className="w-full bg-transparent"
          >
            <MapPin className="h-4 w-4" />
            <span className="ml-2">{useCurrentLocation ? "Ubicación registrada" : "Usar mi ubicación actual"}</span>
          </Button>
          {coordinates && (
            <p className="text-xs text-muted-foreground">
              Coordenadas: {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <Label htmlFor="description" className="mb-3 block text-sm font-semibold text-foreground">
          Descripción * (mínimo 20 caracteres)
        </Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe lo que observaste: ¿Qué viste? ¿Cuándo ocurrió? ¿Hay algún detalle importante?"
          className="min-h-32 resize-none"
        />
        <p className="mt-1 text-xs text-muted-foreground">{description.length}/20 caracteres mínimos</p>
      </div>

      {/* Photo Upload */}
      <div className="mb-6">
        <Label className="mb-3 block text-sm font-semibold text-foreground">Fotos (opcional, máximo 3)</Label>
        <div className="space-y-3">
          {photos.length < 3 && (
            <label className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 p-6 transition-colors hover:border-primary hover:bg-muted">
              <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} className="hidden" />
              <div className="text-center">
                <Upload className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">Subir fotos</p>
                <p className="text-xs text-muted-foreground">PNG, JPG hasta 5MB</p>
              </div>
            </label>
          )}

          {photos.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="group relative aspect-square overflow-hidden rounded-lg border border-border"
                >
                  <img
                    src={photo || "/placeholder.svg"}
                    alt={`Foto ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute right-1 top-1 rounded-full bg-destructive p-1 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <X className="h-3 w-3 text-destructive-foreground" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-auto space-y-3">
        <Button type="submit" disabled={!isFormValid || isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Enviando...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span className="ml-2">Enviar Reporte</span>
            </>
          )}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Tu reporte será revisado por nuestro equipo y contribuirá al monitoreo costero
        </p>
      </div>
    </form>
  )
}
