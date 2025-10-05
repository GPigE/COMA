"use client"

import { useState } from "react"
import { CoastalMap } from "@/components/coastal-map"
import { SandAccumulationAlerts } from "@/components/sand-accumulation-alerts"
import { SARDataComparison } from "@/components/sar-data-comparison"
import { SafetyDashboard } from "@/components/safety-dashboard"
import { Anchor, AlertTriangle, Map, Satellite, Shield, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const years = Array.from({ length: 18 }, (_, i) => 2007 + i)

export default function Home() {
  const [selectedYear, setSelectedYear] = useState(2024)
  const [activeTab, setActiveTab] = useState("map")
  const [criticalAlerts, setCriticalAlerts] = useState(3)
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false)

  const yearIndex = years.indexOf(selectedYear)

  const handleSliderChange = (value: number[]) => {
    setSelectedYear(years[value[0]])
  }

  const goToPreviousYear = () => {
    const currentIndex = years.indexOf(selectedYear)
    if (currentIndex > 0) {
      setSelectedYear(years[currentIndex - 1])
    }
  }

  const goToNextYear = () => {
    const currentIndex = years.indexOf(selectedYear)
    if (currentIndex < years.length - 1) {
      setSelectedYear(years[currentIndex + 1])
    }
  }

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-background">
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-600 p-2">
              <Anchor className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">COMA</h1>
              <p className="text-xs text-muted-foreground">Sistema de Alerta Temprana - Yucatán</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {criticalAlerts > 0 && (
              <Button variant="destructive" size="sm" className="gap-2" onClick={() => setActiveTab("alerts")}>
                <AlertTriangle className="h-4 w-4" />
                {criticalAlerts} Alertas Críticas
              </Button>
            )}
            <DropdownMenu open={yearDropdownOpen} onOpenChange={setYearDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <button className="rounded-lg border border-border bg-background px-3 py-1.5 text-center transition-colors hover:bg-muted">
                  <p className="text-xs font-medium text-muted-foreground">Año</p>
                  <p className="text-lg font-bold text-blue-600">{selectedYear}</p>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={goToPreviousYear}
                      disabled={selectedYear === 2007}
                      className="h-8 w-8 bg-transparent"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{selectedYear}</p>
                      <p className="text-xs text-muted-foreground">Año seleccionado</p>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={goToNextYear}
                      disabled={selectedYear === 2024}
                      className="h-8 w-8 bg-transparent"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <Slider
                    value={[yearIndex]}
                    onValueChange={handleSliderChange}
                    max={years.length - 1}
                    step={1}
                    className="w-full"
                  />

                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>2007</span>
                    <span>2024</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedYear(2007)
                        setYearDropdownOpen(false)
                      }}
                      className="flex-1 rounded-lg bg-muted px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted/80"
                    >
                      Inicio (2007)
                    </button>
                    <button
                      onClick={() => {
                        setSelectedYear(2024)
                        setYearDropdownOpen(false)
                      }}
                      className="flex-1 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      Actual (2024)
                    </button>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-1 flex-col overflow-hidden">
        <div className="border-b border-border bg-card px-6">
          <TabsList className="h-auto w-full justify-start gap-2 bg-transparent p-0">
            <TabsTrigger
              value="map"
              className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
            >
              <Map className="h-4 w-4" />
              Mapa Costero
            </TabsTrigger>
            <TabsTrigger
              value="alerts"
              className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
            >
              <AlertTriangle className="h-4 w-4" />
              Alertas de Arena
              {criticalAlerts > 0 && (
                <Badge variant="destructive" className="ml-1 h-5 px-1.5 text-xs">
                  {criticalAlerts}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="safety"
              className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
            >
              <Shield className="h-4 w-4" />
              Seguridad
            </TabsTrigger>
            <TabsTrigger
              value="sar"
              className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
            >
              <Satellite className="h-4 w-4" />
              Datos SAR (2015-2025)
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="map" className="relative m-0 h-full">
            <CoastalMap selectedYear={selectedYear} />
          </TabsContent>

          <TabsContent value="alerts" className="m-0 h-full overflow-auto p-6">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-2 text-2xl font-bold text-foreground">Alertas de Acumulación de Arena</h2>
              <p className="mb-6 text-sm text-muted-foreground">
                Monitoreo de montículos de arena que bloquean el paso de peces y obligan a pescar en altamar
              </p>
              <SandAccumulationAlerts onAlertCountChange={setCriticalAlerts} />
            </div>
          </TabsContent>

          <TabsContent value="safety" className="m-0 h-full overflow-auto p-6">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-2 text-2xl font-bold text-foreground">Panel de Seguridad</h2>
              <p className="mb-6 text-sm text-muted-foreground">
                Evaluación de riesgos y recomendaciones para evitar pesca en aguas peligrosas
              </p>
              <SafetyDashboard />
            </div>
          </TabsContent>

          <TabsContent value="sar" className="m-0 h-full overflow-auto p-6">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-2 text-2xl font-bold text-foreground">Comparación de Datos SAR (2015-2025)</h2>
              <p className="mb-6 text-sm text-muted-foreground">
                Análisis multitemporal de rugosidad superficial y retrodispersión para detectar pérdida de arena
              </p>
              <SARDataComparison selectedYear={selectedYear} onYearChange={setSelectedYear} />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
