"use client"

import { useState } from "react"
import { MapPin, Calendar, User, ThumbsUp, MessageSquare } from "lucide-react"

interface Report {
  id: string
  type: string
  location: string
  description: string
  date: string
  author: string
  photos: number
  likes: number
  comments: number
  status: "pending" | "verified" | "resolved"
}

const mockReports: Report[] = [
  {
    id: "1",
    type: "Erosión Costera",
    location: "Cancún - Playa Delfines",
    description: "Se observa erosión significativa en la playa, con pérdida de aproximadamente 2 metros de arena.",
    date: "2024-01-15",
    author: "María G.",
    photos: 2,
    likes: 12,
    comments: 3,
    status: "verified",
  },
  {
    id: "2",
    type: "Inundación",
    location: "Playa del Carmen - Centro",
    description: "Inundación en la zona costera después de la tormenta de ayer. Agua llegó hasta la calle principal.",
    date: "2024-01-14",
    author: "Carlos R.",
    photos: 3,
    likes: 8,
    comments: 5,
    status: "verified",
  },
  {
    id: "3",
    type: "Escombros/Basura",
    location: "Tulum - Playa Paraíso",
    description: "Gran cantidad de escombros y basura arrastrados por las olas. Se requiere limpieza urgente.",
    date: "2024-01-13",
    author: "Ana L.",
    photos: 1,
    likes: 15,
    comments: 2,
    status: "pending",
  },
]

export function CitizenReportsList() {
  const [filter, setFilter] = useState<"all" | "pending" | "verified" | "resolved">("all")

  const filteredReports = filter === "all" ? mockReports : mockReports.filter((r) => r.status === filter)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "resolved":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "verified":
        return "Verificado"
      case "pending":
        return "Pendiente"
      case "resolved":
        return "Resuelto"
      default:
        return status
    }
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground">Reportes Ciudadanos</h2>
        <p className="text-sm text-muted-foreground">Observaciones compartidas por la comunidad</p>
      </div>

      {/* Filter Buttons */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
            filter === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}
        >
          Todos ({mockReports.length})
        </button>
        <button
          onClick={() => setFilter("verified")}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
            filter === "verified" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}
        >
          Verificados
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
            filter === "pending" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}
        >
          Pendientes
        </button>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <div key={report.id} className="rounded-lg border border-border bg-card p-4">
            <div className="mb-3 flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-foreground">{report.type}</h3>
                <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {report.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(report.date).toLocaleDateString("es-MX")}
                  </span>
                </div>
              </div>
              <span className={`rounded-full border px-2 py-1 text-xs font-medium ${getStatusColor(report.status)}`}>
                {getStatusLabel(report.status)}
              </span>
            </div>

            <p className="mb-3 text-sm text-muted-foreground">{report.description}</p>

            <div className="flex items-center justify-between border-t border-border pt-3">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <User className="h-3 w-3" />
                {report.author}
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground">
                  <ThumbsUp className="h-3 w-3" />
                  {report.likes}
                </button>
                <button className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground">
                  <MessageSquare className="h-3 w-3" />
                  {report.comments}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
