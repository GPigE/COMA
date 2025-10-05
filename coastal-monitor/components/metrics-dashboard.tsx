"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Thermometer, Wind, Droplets, Waves, TrendingUp, TrendingDown, AlertCircle } from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

type TimeRange = "day" | "week" | "month"

// Mock data for weather metrics
const temperatureData = [
  { time: "00:00", temp: 18, feels: 16 },
  { time: "04:00", temp: 16, feels: 14 },
  { time: "08:00", temp: 19, feels: 17 },
  { time: "12:00", temp: 24, feels: 23 },
  { time: "16:00", temp: 26, feels: 25 },
  { time: "20:00", temp: 22, feels: 20 },
]

const windData = [
  { time: "00:00", speed: 25, gusts: 35 },
  { time: "04:00", speed: 30, gusts: 42 },
  { time: "08:00", speed: 35, gusts: 48 },
  { time: "12:00", speed: 45, gusts: 60 },
  { time: "16:00", speed: 52, gusts: 68 },
  { time: "20:00", speed: 40, gusts: 55 },
]

const tideData = [
  { time: "00:00", height: 1.2 },
  { time: "02:00", height: 1.8 },
  { time: "04:00", height: 2.3 },
  { time: "06:00", height: 2.6 },
  { time: "08:00", height: 2.4 },
  { time: "10:00", height: 1.9 },
  { time: "12:00", height: 1.3 },
  { time: "14:00", height: 1.0 },
  { time: "16:00", height: 1.2 },
  { time: "18:00", height: 1.7 },
  { time: "20:00", height: 2.2 },
  { time: "22:00", height: 2.5 },
]

const riskTrendData = [
  { date: "Lun", erosion: 45, flood: 30, storm: 20 },
  { date: "Mar", erosion: 52, flood: 35, storm: 25 },
  { date: "Mié", erosion: 48, flood: 42, storm: 38 },
  { date: "Jue", erosion: 55, flood: 55, storm: 45 },
  { date: "Vie", erosion: 58, flood: 62, storm: 58 },
  { date: "Sáb", erosion: 62, flood: 68, storm: 65 },
  { date: "Dom", erosion: 60, flood: 65, storm: 62 },
]

export function MetricsDashboard() {
  const [timeRange, setTimeRange] = useState<TimeRange>("day")

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Panel de Métricas</h1>
          <p className="text-muted-foreground mt-1">Estado actual del clima y riesgos costeros</p>
        </div>
        <div className="flex gap-2">
          <Button variant={timeRange === "day" ? "default" : "outline"} size="sm" onClick={() => setTimeRange("day")}>
            Día
          </Button>
          <Button variant={timeRange === "week" ? "default" : "outline"} size="sm" onClick={() => setTimeRange("week")}>
            Semana
          </Button>
          <Button
            variant={timeRange === "month" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("month")}
          >
            Mes
          </Button>
        </div>
      </div>

      {/* Current Weather Metrics */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Estado Actual del Clima</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-1/10">
                  <Thermometer className="h-5 w-5 text-chart-1" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Temperatura</span>
              </div>
              <TrendingUp className="h-4 w-4 text-success" />
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-foreground">24°C</p>
              <p className="text-xs text-muted-foreground">Sensación térmica: 23°C</p>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-2/10">
                  <Wind className="h-5 w-5 text-chart-2" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Viento</span>
              </div>
              <TrendingUp className="h-4 w-4 text-warning" />
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-foreground">45 km/h</p>
              <p className="text-xs text-muted-foreground">Ráfagas: 60 km/h</p>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-3/10">
                  <Droplets className="h-5 w-5 text-chart-3" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Precipitación</span>
              </div>
              <TrendingDown className="h-4 w-4 text-success" />
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-foreground">12 mm</p>
              <p className="text-xs text-muted-foreground">Últimas 24 horas</p>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-4/10">
                  <Waves className="h-5 w-5 text-chart-4" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Marea</span>
              </div>
              <TrendingUp className="h-4 w-4 text-chart-4" />
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-foreground">2.3 m</p>
              <p className="text-xs text-muted-foreground">Marea alta: 2.6 m</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Risk Indicators */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Indicadores de Riesgo</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-foreground">Nivel de Erosión</h3>
              <AlertCircle className="h-4 w-4 text-warning" />
            </div>
            <div className="space-y-3">
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-foreground">62%</span>
                <span className="text-sm text-warning mb-1">Alto</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-warning rounded-full" style={{ width: "62%" }} />
              </div>
              <p className="text-xs text-muted-foreground">Retroceso de 2.3m en últimos 30 días</p>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-foreground">Probabilidad de Inundación</h3>
              <AlertCircle className="h-4 w-4 text-destructive" />
            </div>
            <div className="space-y-3">
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-foreground">68%</span>
                <span className="text-sm text-destructive mb-1">Crítico</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-destructive rounded-full" style={{ width: "68%" }} />
              </div>
              <p className="text-xs text-muted-foreground">Basado en marea y condiciones actuales</p>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-foreground">Cambio en Línea Costera</h3>
              <AlertCircle className="h-4 w-4 text-chart-2" />
            </div>
            <div className="space-y-3">
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-foreground">-3.8m</span>
                <span className="text-sm text-chart-2 mb-1">Retroceso</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-chart-2 rounded-full" style={{ width: "45%" }} />
              </div>
              <p className="text-xs text-muted-foreground">Comparado con año anterior</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">Temperatura (24h)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={temperatureData}>
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="temp"
                stroke="hsl(var(--chart-1))"
                fill="url(#tempGradient)"
                strokeWidth={2}
                name="Temperatura"
              />
              <Line
                type="monotone"
                dataKey="feels"
                stroke="hsl(var(--chart-5))"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="Sensación"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">Viento (24h)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={windData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line type="monotone" dataKey="speed" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Velocidad" />
              <Line
                type="monotone"
                dataKey="gusts"
                stroke="hsl(var(--chart-5))"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Ráfagas"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">Nivel de Marea (24h)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={tideData}>
              <defs>
                <linearGradient id="tideGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-4))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-4))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="height"
                stroke="hsl(var(--chart-4))"
                fill="url(#tideGradient)"
                strokeWidth={2}
                name="Altura (m)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">Tendencia de Riesgos (7 días)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={riskTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="erosion" fill="hsl(var(--chart-2))" name="Erosión" radius={[4, 4, 0, 0]} />
              <Bar dataKey="flood" fill="hsl(var(--chart-3))" name="Inundación" radius={[4, 4, 0, 0]} />
              <Bar dataKey="storm" fill="hsl(var(--chart-1))" name="Tormenta" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}
