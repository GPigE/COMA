"use client"

import { useState } from "react"
import { AlertTriangle, Bell, BellOff, MapPin, Clock, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Alert {
  id: string
  type: "storm" | "flood" | "erosion"
  severity: "low" | "medium" | "high" | "critical"
  location: string
  message: string
  timestamp: Date
  active: boolean
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "storm",
    severity: "high",
    location: "Cancún",
    message: "Tormenta tropical aproximándose. Vientos de hasta 85 km/h esperados.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    active: true,
  },
  {
    id: "2",
    type: "erosion",
    severity: "medium",
    location: "Playa del Carmen",
    message: "Erosión costera acelerada detectada en zona hotelera.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    active: true,
  },
  {
    id: "3",
    type: "flood",
    severity: "low",
    location: "Tulum",
    message: "Riesgo de inundación menor por marea alta.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    active: true,
  },
  {
    id: "4",
    type: "storm",
    severity: "critical",
    location: "Holbox",
    message: "Alerta crítica: Huracán categoría 3 a 200km de la costa.",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    active: true,
  },
]

function getSeverityColor(severity: string) {
  switch (severity) {
    case "low":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20"
    case "medium":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
    case "high":
      return "bg-orange-500/10 text-orange-500 border-orange-500/20"
    case "critical":
      return "bg-red-500/10 text-red-500 border-red-500/20"
    default:
      return "bg-muted text-muted-foreground"
  }
}

function getTypeIcon(type: string) {
  switch (type) {
    case "storm":
      return "🌪️"
    case "flood":
      return "🌊"
    case "erosion":
      return "⚠️"
    default:
      return "📍"
  }
}

function getTimeAgo(date: Date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (seconds < 60) return "Hace menos de 1 min"
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `Hace ${minutes} min`
  const hours = Math.floor(minutes / 60)
  return `Hace ${hours}h`
}

export function AlertsPanel() {
  const [alerts, setAlerts] = useState(mockAlerts)
  const [filter, setFilter] = useState<"all" | "critical" | "high" | "medium" | "low">("all")
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === "all") return alert.active
    return alert.severity === filter && alert.active
  })

  const dismissAlert = (id: string) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, active: false } : alert)))
  }

  const criticalCount = alerts.filter((a) => a.severity === "critical" && a.active).length
  const highCount = alerts.filter((a) => a.severity === "high" && a.active).length

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">Centro de Alertas</h2>
            <p className="text-sm text-muted-foreground">{filteredAlerts.length} alertas activas</p>
          </div>
          <Button
            variant={notificationsEnabled ? "default" : "outline"}
            size="sm"
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
          >
            {notificationsEnabled ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3">
            <p className="text-xs text-red-500">Críticas</p>
            <p className="text-2xl font-bold text-red-500">{criticalCount}</p>
          </div>
          <div className="rounded-lg border border-orange-500/20 bg-orange-500/10 p-3">
            <p className="text-xs text-orange-500">Altas</p>
            <p className="text-2xl font-bold text-orange-500">{highCount}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-border bg-background p-4">
        <div className="flex gap-2 overflow-x-auto">
          {["all", "critical", "high", "medium", "low"].map((severity) => (
            <button
              key={severity}
              onClick={() => setFilter(severity as typeof filter)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === severity
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {severity === "all" ? "Todas" : severity.charAt(0).toUpperCase() + severity.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {filteredAlerts.length === 0 ? (
            <div className="flex h-full items-center justify-center py-12">
              <div className="text-center">
                <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-2 text-sm text-muted-foreground">No hay alertas activas</p>
              </div>
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`rounded-lg border p-4 transition-all hover:shadow-md ${getSeverityColor(alert.severity)}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getTypeIcon(alert.type)}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold uppercase ${getSeverityColor(
                          alert.severity,
                        )}`}
                      >
                        {alert.severity}
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-medium">{alert.message}</p>
                    <div className="mt-3 flex items-center gap-4 text-xs opacity-70">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{alert.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{getTimeAgo(alert.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="rounded-lg p-1 transition-colors hover:bg-background/50"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
