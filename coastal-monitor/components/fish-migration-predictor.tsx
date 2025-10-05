"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts"
import { Fish, AlertCircle, XCircle, AlertTriangle, CheckCircle2 } from "lucide-react"

interface FishMigrationPredictorProps {
  selectedYear: number
}

export function FishMigrationPredictor({ selectedYear }: FishMigrationPredictorProps) {
  const migrationData = [
    { month: "Ene", distanciaPromedio: 2.1, acumulacionArena: 0.3 },
    { month: "Feb", distanciaPromedio: 2.3, acumulacionArena: 0.4 },
    { month: "Mar", distanciaPromedio: 2.8, acumulacionArena: 0.6 },
    { month: "Abr", distanciaPromedio: 3.2, acumulacionArena: 0.8 },
    { month: "May", distanciaPromedio: 4.1, acumulacionArena: 1.2 },
    { month: "Jun", distanciaPromedio: 5.3, acumulacionArena: 1.6 },
    { month: "Jul", distanciaPromedio: 6.2, acumulacionArena: 1.9 },
    { month: "Ago", distanciaPromedio: 7.1, acumulacionArena: 2.1 },
    { month: "Sep", distanciaPromedio: 7.8, acumulacionArena: 2.3 },
    { month: "Oct", distanciaPromedio: 6.9, acumulacionArena: 2.0 },
    { month: "Nov", distanciaPromedio: 5.8, acumulacionArena: 1.7 },
    { month: "Dic", distanciaPromedio: 4.5, acumulacionArena: 1.3 },
  ]

  const predictions = [
    {
      zone: "Progreso Centro",
      currentDistance: "8.2 km",
      trend: "increasing",
      prediction: "Peces continuarán alejándose. Se espera 9-10km en próximas 2 semanas.",
      danger: "critical",
    },
    {
      zone: "Chicxulub Puerto",
      currentDistance: "5.8 km",
      trend: "stable",
      prediction: "Distancia estable. Monitorear cambios en acumulación de arena.",
      danger: "medium",
    },
    {
      zone: "Telchac Puerto",
      currentDistance: "2.1 km",
      trend: "decreasing",
      prediction: "Condiciones mejorando. Peces regresando a zonas normales.",
      danger: "low",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Alert Card */}
      <Card className="border-orange-600/20 bg-orange-600/5 p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-orange-600" />
          <div>
            <h3 className="font-bold text-orange-600">Predicción de Migración Activa</h3>
            <p className="mt-1 text-sm text-foreground">
              Los peces están migrando a aguas más profundas debido a montículos de arena. La distancia promedio de
              pesca ha aumentado de 2.1km a 8.2km en Progreso Centro.
            </p>
          </div>
        </div>
      </Card>

      {/* Migration Chart */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-bold text-foreground">
          Correlación: Acumulación de Arena vs Distancia de Pesca
        </h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Cuando aumenta la acumulación de arena, los peces se alejan más de la costa
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={migrationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" label={{ value: "Distancia (km)", angle: -90, position: "insideLeft" }} />
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{ value: "Acumulación Arena (m)", angle: 90, position: "insideRight" }}
            />
            <Tooltip />
            <Legend />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="distanciaPromedio"
              stroke="#2563eb"
              fill="#2563eb"
              fillOpacity={0.3}
              name="Distancia Promedio de Pesca (km)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="acumulacionArena"
              stroke="#dc2626"
              strokeWidth={2}
              name="Acumulación de Arena (m)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Predictions by Zone */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-bold text-foreground">Predicciones por Zona</h3>
        <div className="space-y-4">
          {predictions.map((pred, index) => (
            <div
              key={index}
              className={`rounded-lg border p-4 ${
                pred.danger === "critical"
                  ? "border-red-600/20 bg-red-600/5"
                  : pred.danger === "medium"
                    ? "border-yellow-600/20 bg-yellow-600/5"
                    : "border-green-600/20 bg-green-600/5"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Fish className="h-5 w-5 text-blue-600" />
                  <h4 className="font-bold text-foreground">{pred.zone}</h4>
                </div>
                <Badge
                  variant={pred.danger === "critical" ? "destructive" : "default"}
                  className={
                    pred.danger === "medium"
                      ? "bg-yellow-600 text-white"
                      : pred.danger === "low"
                        ? "bg-green-600 text-white"
                        : ""
                  }
                >
                  {pred.trend === "increasing"
                    ? "↑ Alejándose"
                    : pred.trend === "stable"
                      ? "→ Estable"
                      : "↓ Acercándose"}
                </Badge>
              </div>
              <div className="mt-3 space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground">Distancia Actual de Pesca:</p>
                  <p className="text-lg font-bold text-foreground">{pred.currentDistance}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Predicción:</p>
                  <p className="text-sm text-foreground">{pred.prediction}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Explanation Card */}
      <Card className="border-blue-600/20 bg-blue-600/5 p-4">
        <h4 className="mb-2 font-bold text-blue-600">¿Por qué migran los peces?</h4>
        <p className="text-sm text-foreground">
          Cuando el oleaje forma montículos de arena, estos bloquean las rutas naturales de los peces. Los peces no
          pueden cruzar estas barreras de arena y deben buscar rutas alternativas más profundas en el mar. Esto obliga a
          los pescadores a seguirlos a altamar, lo cual es peligroso.
        </p>
      </Card>

      {/* Fishing Zones Status Section */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-bold text-foreground">Estado de Zonas de Pesca</h3>
        <div className="space-y-3">
          {[
            {
              name: "Progreso Centro",
              status: "danger",
              risk: "Alto",
              reason: "Montículos de arena bloqueando acceso",
            },
            { name: "Chicxulub Puerto", status: "warning", risk: "Medio", reason: "Acumulación moderada detectada" },
            { name: "Telchac Puerto", status: "safe", risk: "Bajo", reason: "Condiciones normales" },
            { name: "Sisal", status: "safe", risk: "Bajo", reason: "Sin cambios significativos" },
          ].map((zone) => (
            <div key={zone.name} className="flex items-start gap-3 rounded-lg border border-border bg-background p-3">
              <div className="mt-0.5">
                {zone.status === "danger" && <XCircle className="h-5 w-5 text-red-500" />}
                {zone.status === "warning" && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                {zone.status === "safe" && <CheckCircle2 className="h-5 w-5 text-green-500" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-foreground">{zone.name}</p>
                  <Badge
                    variant={
                      zone.status === "danger" ? "destructive" : zone.status === "warning" ? "default" : "outline"
                    }
                  >
                    {zone.risk}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{zone.reason}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-blue-600/20 bg-blue-600/10 p-3">
          <p className="text-sm text-blue-600">
            <strong>Recomendación:</strong> Evitar Progreso Centro. Pesca segura en Telchac y Sisal.
          </p>
        </div>
      </Card>
    </div>
  )
}
