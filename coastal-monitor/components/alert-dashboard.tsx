"use client"

import { useState } from "react"
import { Bell, AlertTriangle, Waves, Wind, MapPin, Filter } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type AlertSeverity = "critical" | "high" | "medium" | "low"
type AlertType = "storm" | "flood" | "erosion" | "wind"

interface Alert {
  id: string
  type: AlertType
  severity: AlertSeverity
  title: string
  description: string
  location: string
  timestamp: Date
  active: boolean
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "storm",
    severity: "critical",
    title: "Tormenta Severa Aproximándose",
    description: "Sistema de baja presión con vientos de hasta 120 km/h esperado en las próximas 6 horas.",
    location: "Costa Norte - Sector A",
    timestamp: new Date(Date.now() - 15 * 60000),
    active: true,
  },
  {
    id: "2",
    type: "flood",
    severity: "high",
    title: "Alerta de Inundación Costera",
    description: "Marea alta combinada con oleaje fuerte. Riesgo de inundación en zonas bajas.",
    location: "Bahía Central",
    timestamp: new Date(Date.now() - 45 * 60000),
    active: true,
  },
  {
    id: "3",
    type: "erosion",
    severity: "medium",
    title: "Erosión Costera Acelerada",
    description: "Retroceso de línea costera detectado. Monitoreo continuo requerido.",
    location: "Playa Sur - Km 12",
    timestamp: new Date(Date.now() - 2 * 3600000),
    active: true,
  },
  {
    id: "4",
    type: "wind",
    severity: "medium",
    title: "Vientos Fuertes",
    description: "Vientos sostenidos de 60-80 km/h. Precaución en actividades marítimas.",
    location: "Costa Este",
    timestamp: new Date(Date.now() - 4 * 3600000),
    active: true,
  },
  {
    id: "5",
    type: "storm",
    severity: "low",
    title: "Condiciones Meteorológicas Adversas",
    description: "Lluvia moderada y oleaje incrementado. Condiciones mejorando.",
    location: "Costa Oeste",
    timestamp: new Date(Date.now() - 6 * 3600000),
    active: false,
  },
]

const severityConfig = {
  critical: { color: "bg-destructive", textColor: "text-destructive-foreground", label: "Crítico" },
  high: { color: "bg-warning", textColor: "text-warning-foreground", label: "Alto" },
  medium: { color: "bg-accent", textColor: "text-accent-foreground", label: "Medio" },
  low: { color: "bg-muted", textColor: "text-muted-foreground", label: "Bajo" },
}

const alertTypeConfig = {
  storm: { icon: AlertTriangle, label: "Tormenta" },
  flood: { icon: Waves, label: "Inundación" },
  erosion: { icon: MapPin, label: "Erosión" },
  wind: { icon: Wind, label: "Viento" },
}

export function AlertDashboard() {
  const [selectedSeverity, setSelectedSeverity] = useState<AlertSeverity | "all">("all")
  const [showActiveOnly, setShowActiveOnly] = useState(true)

  const filteredAlerts = mockAlerts.filter((alert) => {
    if (showActiveOnly && !alert.active) return false
    if (selectedSeverity !== "all" && alert.severity !== selectedSeverity) return false
    return true
  })

  const activeAlerts = mockAlerts.filter((a) => a.active)
  const criticalCount = activeAlerts.filter((a) => a.severity === "critical").length
  const highCount = activeAlerts.filter((a) => a.severity === "high").length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Panel de Alertas</h1>
          <p className="text-muted-foreground mt-1">Monitoreo en tiempo real de eventos costeros</p>
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Bell className="h-4 w-4" />
          Configurar Notificaciones
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Alertas Activas</p>
              <p className="text-2xl font-bold text-foreground mt-1">{activeAlerts.length}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Bell className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Críticas</p>
              <p className="text-2xl font-bold text-destructive mt-1">{criticalCount}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Alta Prioridad</p>
              <p className="text-2xl font-bold text-warning mt-1">{highCount}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning/10">
              <Waves className="h-6 w-6 text-warning" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Zonas Afectadas</p>
              <p className="text-2xl font-bold text-foreground mt-1">8</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
              <MapPin className="h-6 w-6 text-accent" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Filtros:</span>
          </div>

          <div className="flex gap-2">
            <Button
              variant={selectedSeverity === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSeverity("all")}
            >
              Todas
            </Button>
            <Button
              variant={selectedSeverity === "critical" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSeverity("critical")}
            >
              Críticas
            </Button>
            <Button
              variant={selectedSeverity === "high" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSeverity("high")}
            >
              Altas
            </Button>
            <Button
              variant={selectedSeverity === "medium" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSeverity("medium")}
            >
              Medias
            </Button>
          </div>

          <div className="ml-auto">
            <Button
              variant={showActiveOnly ? "default" : "outline"}
              size="sm"
              onClick={() => setShowActiveOnly(!showActiveOnly)}
            >
              {showActiveOnly ? "Solo Activas" : "Todas las Alertas"}
            </Button>
          </div>
        </div>
      </Card>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.map((alert) => {
          const AlertIcon = alertTypeConfig[alert.type].icon
          const severityStyle = severityConfig[alert.severity]

          return (
            <Card key={alert.id} className="p-4 hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", severityStyle.color)}>
                  <AlertIcon className={cn("h-5 w-5", severityStyle.textColor)} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{alert.title}</h3>
                        <Badge className={cn(severityStyle.color, severityStyle.textColor)}>
                          {severityStyle.label}
                        </Badge>
                        {alert.active && (
                          <Badge variant="outline" className="border-success text-success">
                            <span className="mr-1 inline-block h-2 w-2 rounded-full bg-success animate-pulse" />
                            Activa
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {alert.location}
                        </span>
                        <span>{formatTimestamp(alert.timestamp)}</span>
                      </div>
                    </div>

                    <Button variant="outline" size="sm">
                      Ver Detalles
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {filteredAlerts.length === 0 && (
        <Card className="p-12">
          <div className="text-center">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No hay alertas</h3>
            <p className="text-muted-foreground">No se encontraron alertas con los filtros seleccionados.</p>
          </div>
        </Card>
      )}
    </div>
  )
}

function formatTimestamp(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)

  if (diffMins < 60) {
    return `Hace ${diffMins} minutos`
  } else if (diffHours < 24) {
    return `Hace ${diffHours} horas`
  } else {
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    })
  }
}
