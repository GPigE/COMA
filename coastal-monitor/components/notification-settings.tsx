"use client"

import { useState } from "react"
import { Bell, MapPin, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

interface NotificationSettings {
  storms: boolean
  floods: boolean
  erosion: boolean
  cancun: boolean
  playaDelCarmen: boolean
  tulum: boolean
  holbox: boolean
  criticalOnly: boolean
}

export function NotificationSettings() {
  const [settings, setSettings] = useState<NotificationSettings>({
    storms: true,
    floods: true,
    erosion: true,
    cancun: true,
    playaDelCarmen: true,
    tulum: true,
    holbox: true,
    criticalOnly: false,
  })

  const toggleSetting = (key: keyof NotificationSettings) => {
    setSettings({ ...settings, [key]: !settings[key] })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
          <AlertTriangle className="h-4 w-4" />
          Tipos de Alerta
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
            <span className="text-sm text-foreground">Tormentas</span>
            <Switch checked={settings.storms} onCheckedChange={() => toggleSetting("storms")} />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
            <span className="text-sm text-foreground">Inundaciones</span>
            <Switch checked={settings.floods} onCheckedChange={() => toggleSetting("floods")} />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
            <span className="text-sm text-foreground">Erosión Costera</span>
            <Switch checked={settings.erosion} onCheckedChange={() => toggleSetting("erosion")} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
          <MapPin className="h-4 w-4" />
          Zonas Geográficas
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
            <span className="text-sm text-foreground">Cancún</span>
            <Switch checked={settings.cancun} onCheckedChange={() => toggleSetting("cancun")} />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
            <span className="text-sm text-foreground">Playa del Carmen</span>
            <Switch checked={settings.playaDelCarmen} onCheckedChange={() => toggleSetting("playaDelCarmen")} />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
            <span className="text-sm text-foreground">Tulum</span>
            <Switch checked={settings.tulum} onCheckedChange={() => toggleSetting("tulum")} />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
            <span className="text-sm text-foreground">Holbox</span>
            <Switch checked={settings.holbox} onCheckedChange={() => toggleSetting("holbox")} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
          <Bell className="h-4 w-4" />
          Preferencias
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
            <div>
              <span className="text-sm font-medium text-foreground">Solo alertas críticas</span>
              <p className="text-xs text-muted-foreground">Recibir únicamente alertas de alta prioridad</p>
            </div>
            <Switch checked={settings.criticalOnly} onCheckedChange={() => toggleSetting("criticalOnly")} />
          </div>
        </div>
      </div>

      <Button className="w-full">Guardar Configuración</Button>
    </div>
  )
}
