"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Satellite, Download, Calendar } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"

interface SARDataComparisonProps {
  selectedYear: number
  onYearChange: (year: number) => void
}

export function SARDataComparison({ selectedYear, onYearChange }: SARDataComparisonProps) {
  const sarTimeline = Array.from({ length: 11 }, (_, i) => ({
    year: 2015 + i,
    retrodispersion: -8 - i * 0.4,
    rugosidad: 15 + i * 2.1,
    perdidaArena: i * 0.3,
  }))

  const locations = [
    { name: "Progreso", retrodispersion: -12.4, rugosidad: 35.2, cambio: "Crítico" },
    { name: "Chicxulub", retrodispersion: -10.1, rugosidad: 28.7, cambio: "Alto" },
    { name: "Telchac", retrodispersion: -7.8, rugosidad: 18.3, cambio: "Moderado" },
    { name: "Sisal", retrodispersion: -6.2, rugosidad: 14.1, cambio: "Bajo" },
  ]

  return (
    <div className="space-y-6">
      {/* Info Card */}
      <Card className="border-blue-600/20 bg-blue-600/5 p-4">
        <div className="flex items-start gap-3">
          <Satellite className="h-5 w-5 text-blue-600" />
          <div>
            <h3 className="font-bold text-blue-600">Datos SAR (Radar de Apertura Sintética)</h3>
            <p className="mt-1 text-sm text-foreground">
              Análisis multitemporal usando Sentinel-1 y ALOS PALSAR. Los cambios en retrodispersión y rugosidad
              superficial indican pérdida de arena y formación de montículos.
            </p>
          </div>
        </div>
      </Card>

      {/* Timeline Slider */}
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-foreground">Línea de Tiempo SAR (2015-2025)</h3>
            <p className="text-sm text-muted-foreground">Desliza para comparar datos de diferentes años</p>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-2xl font-bold text-blue-600">{selectedYear}</span>
          </div>
        </div>
        <Slider
          value={[selectedYear]}
          onValueChange={(value) => onYearChange(value[0])}
          min={2015}
          max={2025}
          step={1}
          className="mb-4"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>2015</span>
          <span>2020</span>
          <span>2025</span>
        </div>
      </Card>

      {/* Temporal Evolution Chart */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-bold text-foreground">Evolución Temporal (2015-2025)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={sarTimeline}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="retrodispersion"
              stroke="#dc2626"
              strokeWidth={2}
              name="Retrodispersión SAR (dB)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="rugosidad"
              stroke="#2563eb"
              strokeWidth={2}
              name="Rugosidad Superficial (%)"
            />
          </LineChart>
        </ResponsiveContainer>
        <p className="mt-4 text-sm text-muted-foreground">
          La disminución en retrodispersión indica pérdida de arena en la costa. El aumento en rugosidad indica
          formación de montículos.
        </p>
      </Card>

      {/* Location Comparison */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-bold text-foreground">Comparación por Ubicación ({selectedYear})</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={locations}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="retrodispersion" fill="#dc2626" name="Retrodispersión (dB)" />
            <Bar dataKey="rugosidad" fill="#2563eb" name="Rugosidad (%)" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Location Details */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-bold text-foreground">Análisis Detallado por Zona</h3>
        <div className="space-y-3">
          {locations.map((loc, index) => (
            <div key={index} className="rounded-lg border border-border bg-background p-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-foreground">{loc.name}</h4>
                <Badge
                  variant={loc.cambio === "Crítico" ? "destructive" : loc.cambio === "Alto" ? "default" : "outline"}
                  className={loc.cambio === "Alto" ? "bg-orange-600 text-white" : ""}
                >
                  {loc.cambio}
                </Badge>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Retrodispersión SAR</p>
                  <p className="text-lg font-bold text-red-600">{loc.retrodispersion} dB</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Rugosidad Superficial</p>
                  <p className="text-lg font-bold text-blue-600">{loc.rugosidad}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Download Data */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-foreground">Descargar Datos SAR</h4>
            <p className="text-sm text-muted-foreground">Datos completos 2015-2025 en formato CSV/JSON</p>
          </div>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Descargar
          </Button>
        </div>
      </Card>
    </div>
  )
}
