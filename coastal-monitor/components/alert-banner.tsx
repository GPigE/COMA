"use client"

import { AlertCircle, X } from "lucide-react"

interface AlertBannerProps {
  onClose: () => void
}

export function AlertBanner({ onClose }: AlertBannerProps) {
  return (
    <div className="border-b border-orange-500/20 bg-orange-500/10 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-orange-500" />
          <div>
            <p className="text-sm font-medium text-orange-500">Alerta de Monitoreo Activa</p>
            <p className="text-xs text-orange-500/80">
              Se detectó un incremento en el nivel del mar en la zona de Cancún
            </p>
          </div>
        </div>
        <button onClick={onClose} className="rounded-lg p-1 text-orange-500 transition-colors hover:bg-orange-500/10">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
