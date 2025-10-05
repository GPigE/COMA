"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Download, TrendingUp, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

const historicalData = [
  { year: 2007, cancun: 0, playaDelCarmen: 0, tulum: 0, holbox: 0 },
  { year: 2008, cancun: 0.8, playaDelCarmen: 0.6, tulum: 0.5, holbox: 0.7 },
  { year: 2009, cancun: 1.5, playaDelCarmen: 1.2, tulum: 1.0, holbox: 1.4 },
  { year: 2010, cancun: 2.3, playaDelCarmen: 1.8, tulum: 1.5, holbox: 2.1 },
  { year: 2011, cancun: 3.1, playaDelCarmen: 2.5, tulum: 2.2, holbox: 2.8 },
  { year: 2012, cancun: 3.8, playaDelCarmen: 3.1, tulum: 2.8, holbox: 3.5 },
  { year: 2013, cancun: 4.2, playaDelCarmen: 3.5, tulum: 3.2, holbox: 3.9 },
  { year: 2014, cancun: 4.7, playaDelCarmen: 3.9, tulum: 3.6, holbox: 4.3 },
  { year: 2015, cancun: 5.2, playaDelCarmen: 4.1, tulum: 3.8, holbox: 4.5 },
  { year: 2016, cancun: 5.9, playaDelCarmen: 4.8, tulum: 4.3, holbox: 5.2 },
  { year: 2017, cancun: 6.5, playaDelCarmen: 5.4, tulum: 4.9, holbox: 5.8 },
  { year: 2018, cancun: 7.2, playaDelCarmen: 6.1, tulum: 5.5, holbox: 6.5 },
  { year: 2019, cancun: 7.8, playaDelCarmen: 6.7, tulum: 6.0, holbox: 7.1 },
  { year: 2020, cancun: 8.7, playaDelCarmen: 7.2, tulum: 6.5, holbox: 7.8 },
  { year: 2021, cancun: 9.5, playaDelCarmen: 8.0, tulum: 7.2, holbox: 8.6 },
  { year: 2022, cancun: 10.8, playaDelCarmen: 9.1, tulum: 8.3, holbox: 9.8 },
  { year: 2023, cancun: 11.6, playaDelCarmen: 9.7, tulum: 8.8, holbox: 10.5 },
  { year: 2024, cancun: 12.4, playaDelCarmen: 10.1, tulum: 9.3, holbox: 11.2 },
]

const eventData = [
  { year: 2007, storms: 2, floods: 1, erosionEvents: 3 },
  { year: 2010, storms: 4, floods: 2, erosionEvents: 5 },
  { year: 2015, storms: 6, floods: 4, erosionEvents: 8 },
  { year: 2020, storms: 8, floods: 6, erosionEvents: 12 },
  { year: 2024, storms: 11, floods: 9, erosionEvents: 15 },
]

export function HistoricalAnalysis() {
  const [chartType, setChartType] = useState<"line" | "bar">("line")
  const [dataView, setDataView] = useState<"advancement" | "events">("advancement")

  const downloadCSV = () => {
    const csv = [
      ["Año", "Cancún (m)", "Playa del Carmen (m)", "Tulum (m)", "Holbox (m)"],
      ...historicalData.map((row) => [row.year, row.cancun, row.playaDelCarmen, row.tulum, row.holbox]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "datos-historicos-costa-yucatan.csv"
    a.click()
  }

  const downloadJSON = () => {
    const json = JSON.stringify(historicalData, null, 2)
    const blob = new Blob([json], { type: "application/json" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "datos-historicos-costa-yucatan.json"
    a.click()
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Análisis Histórico</h2>
          <p className="text-sm text-muted-foreground">Evolución costera 2007-2024</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={downloadCSV}>
            <Download className="h-4 w-4" />
            <span className="ml-2">CSV</span>
          </Button>
          <Button variant="outline" size="sm" onClick={downloadJSON}>
            <Download className="h-4 w-4" />
            <span className="ml-2">JSON</span>
          </Button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setDataView("advancement")}
          className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            dataView === "advancement"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          <TrendingUp className="mx-auto mb-1 h-4 w-4" />
          Avance del Mar
        </button>
        <button
          onClick={() => setDataView("events")}
          className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            dataView === "events"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          <Calendar className="mx-auto mb-1 h-4 w-4" />
          Eventos Climáticos
        </button>
      </div>

      {/* Chart Type Toggle */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setChartType("line")}
          className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
            chartType === "line" ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"
          }`}
        >
          Línea
        </button>
        <button
          onClick={() => setChartType("bar")}
          className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
            chartType === "bar" ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"
          }`}
        >
          Barras
        </button>
      </div>

      {/* Chart */}
      <div className="mb-6 rounded-lg border border-border bg-card p-4">
        <ResponsiveContainer width="100%" height={300}>
          {dataView === "advancement" ? (
            chartType === "line" ? (
              <LineChart data={historicalData}>
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
                <Line type="monotone" dataKey="cancun" stroke="#3b82f6" name="Cancún" strokeWidth={2} />
                <Line
                  type="monotone"
                  dataKey="playaDelCarmen"
                  stroke="#8b5cf6"
                  name="Playa del Carmen"
                  strokeWidth={2}
                />
                <Line type="monotone" dataKey="tulum" stroke="#10b981" name="Tulum" strokeWidth={2} />
                <Line type="monotone" dataKey="holbox" stroke="#f59e0b" name="Holbox" strokeWidth={2} />
              </LineChart>
            ) : (
              <BarChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="cancun" fill="#3b82f6" name="Cancún" />
                <Bar dataKey="playaDelCarmen" fill="#8b5cf6" name="Playa del Carmen" />
                <Bar dataKey="tulum" fill="#10b981" name="Tulum" />
                <Bar dataKey="holbox" fill="#f59e0b" name="Holbox" />
              </BarChart>
            )
          ) : (
            <BarChart data={eventData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="storms" fill="#ef4444" name="Tormentas" />
              <Bar dataKey="floods" fill="#3b82f6" name="Inundaciones" />
              <Bar dataKey="erosionEvents" fill="#f59e0b" name="Eventos de Erosión" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Comparison Stats */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-semibold text-foreground">Comparación 2007 vs 2024</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-border bg-background p-3">
            <p className="text-xs text-muted-foreground">Cancún</p>
            <p className="text-lg font-bold text-foreground">+12.4m</p>
            <p className="text-xs text-green-500">↑ 100% desde 2007</p>
          </div>
          <div className="rounded-lg border border-border bg-background p-3">
            <p className="text-xs text-muted-foreground">Playa del Carmen</p>
            <p className="text-lg font-bold text-foreground">+10.1m</p>
            <p className="text-xs text-green-500">↑ 100% desde 2007</p>
          </div>
          <div className="rounded-lg border border-border bg-background p-3">
            <p className="text-xs text-muted-foreground">Tulum</p>
            <p className="text-lg font-bold text-foreground">+9.3m</p>
            <p className="text-xs text-green-500">↑ 100% desde 2007</p>
          </div>
          <div className="rounded-lg border border-border bg-background p-3">
            <p className="text-xs text-muted-foreground">Holbox</p>
            <p className="text-lg font-bold text-foreground">+11.2m</p>
            <p className="text-xs text-green-500">↑ 100% desde 2007</p>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="rounded-lg border border-border bg-muted/50 p-4">
        <h3 className="mb-2 text-sm font-semibold text-foreground">Hallazgos Clave</h3>
        <ul className="space-y-2 text-xs text-muted-foreground">
          <li>• El avance promedio del mar en la costa de Yucatán es de 10.75m desde 2007</li>
          <li>• Cancún muestra el mayor avance con 12.4m en 17 años</li>
          <li>• Se observa una aceleración en el ritmo de avance después de 2020</li>
          <li>• Los eventos climáticos extremos han aumentado un 450% desde 2007</li>
        </ul>
      </div>
    </div>
  )
}
