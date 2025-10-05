"use client"

import { TrendingUp, Waves, AlertTriangle, Activity } from "lucide-react"

interface MetricsPanelProps {
  selectedYear: number
}

export function MetricsPanel({ selectedYear }: MetricsPanelProps) {
  // Calculate metrics based on year
  const baseAdvancement = selectedYear <= 2007 ? 0 : (selectedYear - 2007) * 0.7
  const avgAdvancement = baseAdvancement.toFixed(1)
  const affectedArea = (baseAdvancement * 2.3).toFixed(1)
  const riskLevel = baseAdvancement < 5 ? "Bajo" : baseAdvancement < 10 ? "Moderado" : "Alto"
  const riskColor = baseAdvancement < 5 ? "text-green-500" : baseAdvancement < 10 ? "text-yellow-500" : "text-red-500"

  return (
    <div className="flex h-full flex-col overflow-y-auto p-6">
      <h2 className="mb-6 text-xl font-bold text-foreground">Métricas del Año {selectedYear}</h2>

      {/* Metrics Cards */}
      <div className="space-y-4">
        {/* Average Advancement */}
        <div className="rounded-lg border border-border bg-background p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Waves className="h-4 w-4 text-blue-500" />
                <p className="text-sm text-muted-foreground">Avance Promedio</p>
              </div>
              <p className="mt-2 text-3xl font-bold text-foreground">{avgAdvancement}m</p>
              <p className="mt-1 text-xs text-muted-foreground">Desde 2007</p>
            </div>
            <div className="rounded-full bg-blue-500/10 p-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Affected Area */}
        <div className="rounded-lg border border-border bg-background p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-purple-500" />
                <p className="text-sm text-muted-foreground">Área Afectada</p>
              </div>
              <p className="mt-2 text-3xl font-bold text-foreground">{affectedArea}km²</p>
              <p className="mt-1 text-xs text-muted-foreground">Costa de Yucatán</p>
            </div>
            <div className="rounded-full bg-purple-500/10 p-2">
              <Activity className="h-5 w-5 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Risk Level */}
        <div className="rounded-lg border border-border bg-background p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <AlertTriangle className={`h-4 w-4 ${riskColor}`} />
                <p className="text-sm text-muted-foreground">Nivel de Riesgo</p>
              </div>
              <p className={`mt-2 text-3xl font-bold ${riskColor}`}>{riskLevel}</p>
              <p className="mt-1 text-xs text-muted-foreground">Evaluación actual</p>
            </div>
            <div className={`rounded-full ${riskColor.replace("text-", "bg-")}/10 p-2`}>
              <AlertTriangle className={`h-5 w-5 ${riskColor}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Locations Summary */}
      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold text-foreground">Puntos Monitoreados</h3>
        <div className="space-y-2">
          {["Cancún", "Playa del Carmen", "Tulum", "Holbox"].map((location) => (
            <div
              key={location}
              className="flex items-center justify-between rounded-lg border border-border bg-background p-3"
            >
              <span className="text-sm text-foreground">{location}</span>
              <div className="h-2 w-2 rounded-full bg-primary" />
            </div>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-6 rounded-lg border border-border bg-muted/50 p-4">
        <p className="text-xs text-muted-foreground">
          Los datos mostrados representan el avance promedio del nivel del mar en la costa de Yucatán desde 2007. Use la
          línea de tiempo para explorar diferentes años.
        </p>
      </div>
    </div>
  )
}
