"use client"

import { useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, TrendingUp, MapPin, Calendar } from "lucide-react"

interface SandAccumulationAlertsProps {
  onAlertCountChange?: (count: number) => void
}

export function SandAccumulationAlerts({ onAlertCountChange }: SandAccumulationAlertsProps) {
  const alerts = [
    {
      id: 1,
      severity: "critical",
      location: "Progreso Centro",
      date: "2024-12-15",
      sandAccumulation: "+2.3m",
      fishImpact: "Peces migrando a 8km mar adentro",
      danger: "Pesca en altamar requerida - PELIGROSO",
      sarData: "Retrodispersión SAR: -12dB (pérdida significativa de arena en costa)",
    },
    {
      id: 2,
      severity: "critical",
      location: "Chicxulub Puerto - Zona Este",
      date: "2024-12-10",
      sandAccumulation: "+1.8m",
      fishImpact: "Acceso bloqueado en 60% de la zona",
      danger: "Evitar pesca en esta zona",
      sarData: "Rugosidad superficial aumentada +35%",
    },
    {
      id: 3,
      severity: "high",
      location: "Yucalpetén",
      date: "2024-12-08",
      sandAccumulation: "+1.2m",
      fishImpact: "Peces desviándose hacia el norte",
      danger: "Monitorear de cerca - puede empeorar",
      sarData: "Cambios detectados en últimas 48 horas",
    },
    {
      id: 4,
      severity: "medium",
      location: "Chuburná Puerto",
      date: "2024-12-05",
      sandAccumulation: "+0.7m",
      fishImpact: "Impacto menor en rutas de peces",
      danger: "Pesca normal por ahora",
      sarData: "Monitoreo preventivo activo",
    },
  ]

  const criticalCount = alerts.filter((a) => a.severity === "critical").length

  useEffect(() => {
    if (onAlertCountChange) {
      onAlertCountChange(criticalCount)
    }
  }, [criticalCount, onAlertCountChange])

  return (
    <div className="space-y-4">
      {/* Summary Card */}
      <Card className="border-red-600/20 bg-red-600/5 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <div className="flex-1">
            <h3 className="font-bold text-red-600">Alerta Crítica: Montículos de Arena Activos</h3>
            <p className="mt-1 text-sm text-foreground">
              {criticalCount} zonas con acumulación crítica de arena están bloqueando el paso de peces. Los pescadores
              deben evitar estas áreas o prepararse para pesca en altamar (PELIGROSO).
            </p>
          </div>
        </div>
      </Card>

      {/* Alert List */}
      <div className="grid gap-4">
        {alerts.map((alert) => (
          <Card
            key={alert.id}
            className={`p-4 ${
              alert.severity === "critical"
                ? "border-red-600/50 bg-red-600/5"
                : alert.severity === "high"
                  ? "border-orange-600/50 bg-orange-600/5"
                  : "border-yellow-600/50 bg-yellow-600/5"
            }`}
          >
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <h4 className="font-bold text-foreground">{alert.location}</h4>
                </div>
                <Badge
                  variant={alert.severity === "critical" ? "destructive" : "default"}
                  className={
                    alert.severity === "high"
                      ? "bg-orange-600 text-white"
                      : alert.severity === "medium"
                        ? "bg-yellow-600 text-white"
                        : ""
                  }
                >
                  {alert.severity === "critical" ? "CRÍTICO" : alert.severity === "high" ? "ALTO" : "MEDIO"}
                </Badge>
              </div>

              {/* Details Grid */}
              <div className="grid gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">Detectado:</span>
                  <span className="font-medium text-foreground">{alert.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">Acumulación:</span>
                  <span className="font-medium text-foreground">{alert.sandAccumulation}</span>
                </div>
              </div>

              {/* Impact Info */}
              <div className="space-y-2 rounded-lg border border-border bg-background p-3">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Impacto en Peces:</p>
                  <p className="text-sm font-medium text-foreground">{alert.fishImpact}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Nivel de Peligro:</p>
                  <p
                    className={`text-sm font-bold ${alert.severity === "critical" ? "text-red-600" : alert.severity === "high" ? "text-orange-600" : "text-yellow-600"}`}
                  >
                    {alert.danger}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Datos SAR:</p>
                  <p className="text-sm text-foreground">{alert.sarData}</p>
                </div>
              </div>

              {/* Action Button */}
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                Ver en Mapa
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
