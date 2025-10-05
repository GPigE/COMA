"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Shield, AlertTriangle, CheckCircle2, Wind, Waves, Thermometer } from "lucide-react"

export function SafetyDashboard() {
  const safetyMetrics = {
    overallRisk: 65,
    safeFishingZones: 4,
    dangerousZones: 3,
    weatherConditions: "Moderado",
    waveHeight: "1.2m",
    windSpeed: "18 km/h",
    temperature: "26°C",
  }

  const recommendations = [
    {
      type: "danger",
      title: "Evitar Progreso Centro",
      description: "Montículos de arena obligan a pesca en altamar (8km+). Condiciones peligrosas.",
    },
    {
      type: "warning",
      title: "Precaución en Chicxulub",
      description: "Acceso limitado. Considerar zonas alternativas.",
    },
    {
      type: "safe",
      title: "Zonas Seguras Disponibles",
      description: "Telchac Puerto y Sisal tienen condiciones normales de pesca.",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Overall Risk Card */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-orange-600/10 p-3">
              <Shield className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Nivel de Riesgo General</h3>
              <p className="text-2xl font-bold text-foreground">Medio-Alto</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-orange-600">{safetyMetrics.overallRisk}%</p>
            <p className="text-xs text-muted-foreground">Índice de riesgo</p>
          </div>
        </div>
        <Progress value={safetyMetrics.overallRisk} className="mt-4" />
      </Card>

      {/* Zone Status */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-green-600/20 bg-green-600/5 p-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-2xl font-bold text-green-600">{safetyMetrics.safeFishingZones}</p>
              <p className="text-sm text-muted-foreground">Zonas Seguras</p>
            </div>
          </div>
        </Card>
        <Card className="border-red-600/20 bg-red-600/5 p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <div>
              <p className="text-2xl font-bold text-red-600">{safetyMetrics.dangerousZones}</p>
              <p className="text-sm text-muted-foreground">Zonas Peligrosas</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Weather Conditions */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-bold text-foreground">Condiciones Actuales</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-600/10 p-2">
              <Waves className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Altura de Olas</p>
              <p className="text-lg font-bold text-foreground">{safetyMetrics.waveHeight}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-600/10 p-2">
              <Wind className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Viento</p>
              <p className="text-lg font-bold text-foreground">{safetyMetrics.windSpeed}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-600/10 p-2">
              <Thermometer className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Temperatura</p>
              <p className="text-lg font-bold text-foreground">{safetyMetrics.temperature}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Recommendations */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-bold text-foreground">Recomendaciones de Seguridad</h3>
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 rounded-lg border p-3 ${
                rec.type === "danger"
                  ? "border-red-600/20 bg-red-600/5"
                  : rec.type === "warning"
                    ? "border-yellow-600/20 bg-yellow-600/5"
                    : "border-green-600/20 bg-green-600/5"
              }`}
            >
              {rec.type === "danger" && <AlertTriangle className="mt-0.5 h-5 w-5 text-red-600" />}
              {rec.type === "warning" && <AlertTriangle className="mt-0.5 h-5 w-5 text-yellow-600" />}
              {rec.type === "safe" && <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-600" />}
              <div className="flex-1">
                <p className="font-bold text-foreground">{rec.title}</p>
                <p className="text-sm text-muted-foreground">{rec.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
