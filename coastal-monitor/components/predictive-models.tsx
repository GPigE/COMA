"use client"

import { useState } from "react"
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts"
import { Droplets, Wind, Thermometer } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

interface PredictionParams {
  seaLevelRise: number // cm per year
  stormIntensity: number // 1-10 scale
  temperature: number // degrees celsius increase
}

export function PredictiveModels() {
  const [params, setParams] = useState<PredictionParams>({
    seaLevelRise: 3.5,
    stormIntensity: 5,
    temperature: 1.5,
  })

  const [timeframe, setTimeframe] = useState<"short" | "medium" | "long">("medium")

  // Generate predictions based on parameters
  const generatePredictions = () => {
    const currentYear = 2024
    const years = timeframe === "short" ? 5 : timeframe === "medium" ? 10 : 20
    const baseAdvancement = 12.4 // Current Cancun advancement

    const predictions = []
    for (let i = 0; i <= years; i++) {
      const year = currentYear + i
      const seaLevelEffect = (params.seaLevelRise / 10) * i
      const stormEffect = (params.stormIntensity / 10) * i * 0.5
      const tempEffect = (params.temperature / 2) * i * 0.3

      const conservative = baseAdvancement + seaLevelEffect * 0.7 + stormEffect * 0.5 + tempEffect * 0.5
      const moderate = baseAdvancement + seaLevelEffect + stormEffect + tempEffect
      const aggressive = baseAdvancement + seaLevelEffect * 1.3 + stormEffect * 1.5 + tempEffect * 1.5

      predictions.push({
        year,
        conservative: Number.parseFloat(conservative.toFixed(1)),
        moderate: Number.parseFloat(moderate.toFixed(1)),
        aggressive: Number.parseFloat(aggressive.toFixed(1)),
      })
    }

    return predictions
  }

  const predictions = generatePredictions()
  const finalYear = predictions[predictions.length - 1]

  const resetParams = () => {
    setParams({
      seaLevelRise: 3.5,
      stormIntensity: 5,
      temperature: 1.5,
    })
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground">Modelos Predictivos</h2>
        <p className="text-sm text-muted-foreground">Simulación de cambios costeros futuros</p>
      </div>

      {/* Timeframe Selection */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-semibold text-foreground">Horizonte Temporal</h3>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setTimeframe("short")}
            className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
              timeframe === "short"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Corto Plazo
            <span className="block text-xs opacity-70">5 años</span>
          </button>
          <button
            onClick={() => setTimeframe("medium")}
            className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
              timeframe === "medium"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Mediano Plazo
            <span className="block text-xs opacity-70">10 años</span>
          </button>
          <button
            onClick={() => setTimeframe("long")}
            className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
              timeframe === "long"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Largo Plazo
            <span className="block text-xs opacity-70">20 años</span>
          </button>
        </div>
      </div>

      {/* Parameter Controls */}
      <div className="mb-6 space-y-6 rounded-lg border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Parámetros del Modelo</h3>
          <Button variant="outline" size="sm" onClick={resetParams}>
            Restablecer
          </Button>
        </div>

        {/* Sea Level Rise */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium text-foreground">Aumento del Nivel del Mar</span>
            </div>
            <span className="text-sm font-bold text-primary">{params.seaLevelRise.toFixed(1)} cm/año</span>
          </div>
          <Slider
            value={[params.seaLevelRise]}
            onValueChange={(value) => setParams({ ...params, seaLevelRise: value[0] })}
            min={1}
            max={10}
            step={0.1}
            className="w-full"
          />
          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
            <span>Bajo (1 cm)</span>
            <span>Alto (10 cm)</span>
          </div>
        </div>

        {/* Storm Intensity */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium text-foreground">Intensidad de Tormentas</span>
            </div>
            <span className="text-sm font-bold text-primary">{params.stormIntensity}/10</span>
          </div>
          <Slider
            value={[params.stormIntensity]}
            onValueChange={(value) => setParams({ ...params, stormIntensity: value[0] })}
            min={1}
            max={10}
            step={1}
            className="w-full"
          />
          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
            <span>Baja</span>
            <span>Extrema</span>
          </div>
        </div>

        {/* Temperature Increase */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium text-foreground">Aumento de Temperatura</span>
            </div>
            <span className="text-sm font-bold text-primary">+{params.temperature.toFixed(1)}°C</span>
          </div>
          <Slider
            value={[params.temperature]}
            onValueChange={(value) => setParams({ ...params, temperature: value[0] })}
            min={0.5}
            max={4}
            step={0.1}
            className="w-full"
          />
          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
            <span>+0.5°C</span>
            <span>+4°C</span>
          </div>
        </div>
      </div>

      {/* Prediction Chart */}
      <div className="mb-6 rounded-lg border border-border bg-card p-4">
        <h3 className="mb-4 text-sm font-semibold text-foreground">Proyección de Avance Costero (Cancún)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={predictions}>
            <defs>
              <linearGradient id="colorConservative" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorModerate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorAggressive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              label={{ value: "Metros", angle: -90, position: "insideLeft" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="conservative"
              stroke="#10b981"
              fillOpacity={1}
              fill="url(#colorConservative)"
              name="Escenario Conservador"
            />
            <Area
              type="monotone"
              dataKey="moderate"
              stroke="#f59e0b"
              fillOpacity={1}
              fill="url(#colorModerate)"
              name="Escenario Moderado"
            />
            <Area
              type="monotone"
              dataKey="aggressive"
              stroke="#ef4444"
              fillOpacity={1}
              fill="url(#colorAggressive)"
              name="Escenario Agresivo"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Prediction Summary */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-semibold text-foreground">
          Proyección para {finalYear.year} ({timeframe === "short" ? "5" : timeframe === "medium" ? "10" : "20"} años)
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-3">
            <p className="text-xs text-green-500">Conservador</p>
            <p className="text-2xl font-bold text-green-500">{finalYear.conservative}m</p>
            <p className="text-xs text-green-500/70">+{(finalYear.conservative - 12.4).toFixed(1)}m</p>
          </div>
          <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-3">
            <p className="text-xs text-yellow-500">Moderado</p>
            <p className="text-2xl font-bold text-yellow-500">{finalYear.moderate}m</p>
            <p className="text-xs text-yellow-500/70">+{(finalYear.moderate - 12.4).toFixed(1)}m</p>
          </div>
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3">
            <p className="text-xs text-red-500">Agresivo</p>
            <p className="text-2xl font-bold text-red-500">{finalYear.aggressive}m</p>
            <p className="text-xs text-red-500/70">+{(finalYear.aggressive - 12.4).toFixed(1)}m</p>
          </div>
        </div>
      </div>

      {/* Model Info */}
      <div className="rounded-lg border border-border bg-muted/50 p-4">
        <h3 className="mb-2 text-sm font-semibold text-foreground">Acerca del Modelo</h3>
        <p className="text-xs text-muted-foreground">
          Este modelo predictivo utiliza datos históricos y parámetros ajustables para simular tres escenarios posibles
          de cambio costero. Los resultados son estimaciones basadas en tendencias actuales y no deben considerarse
          predicciones exactas.
        </p>
      </div>
    </div>
  )
}
