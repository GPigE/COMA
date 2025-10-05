"use client"

import { useState } from "react"
import { Play, Pause, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

const years = [2007, 2010, 2015, 2020, 2024]

export function CoastalEvolutionMap() {
  const [currentYearIndex, setCurrentYearIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const currentYear = years[currentYearIndex]

  const handlePlay = () => {
    if (isPlaying) {
      setIsPlaying(false)
      return
    }

    setIsPlaying(true)
    const interval = setInterval(() => {
      setCurrentYearIndex((prev) => {
        if (prev >= years.length - 1) {
          setIsPlaying(false)
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 1500)
  }

  const handleReset = () => {
    setIsPlaying(false)
    setCurrentYearIndex(0)
  }

  return (
    <div className="flex h-full flex-col p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-foreground">Evolución Costera</h2>
        <p className="text-sm text-muted-foreground">Visualización del cambio de línea costera</p>
      </div>

      {/* Map Visualization */}
      <div className="mb-4 flex-1 rounded-lg border border-border bg-card p-4">
        <div className="relative h-full">
          <svg viewBox="0 0 600 400" className="h-full w-full">
            {/* Ocean */}
            <rect width="600" height="400" fill="#0c2340" />

            {/* Coastline layers for different years */}
            {years.map((year, index) => {
              const opacity = index <= currentYearIndex ? 0.3 + (index / years.length) * 0.7 : 0.1
              const offset = index * 8
              const color = index === currentYearIndex ? "#3b82f6" : "#1a3a5a"

              return (
                <g key={year}>
                  <path
                    d={`M 100 ${200 - offset} Q 200 ${150 - offset} 300 ${140 - offset} Q 400 ${135 - offset} 500 ${150 - offset}`}
                    fill="none"
                    stroke={color}
                    strokeWidth={index === currentYearIndex ? "3" : "2"}
                    opacity={opacity}
                  />
                  {index === currentYearIndex && (
                    <text x="520" y={150 - offset} fill={color} fontSize="14" fontWeight="bold">
                      {year}
                    </text>
                  )}
                </g>
              )
            })}

            {/* Legend */}
            <g transform="translate(20, 320)">
              <text fill="hsl(var(--foreground))" fontSize="12" fontWeight="bold">
                Línea Costera por Año
              </text>
              {years.map((year, index) => (
                <g key={year} transform={`translate(0, ${20 + index * 15})`}>
                  <line
                    x1="0"
                    y1="0"
                    x2="20"
                    y2="0"
                    stroke={index === currentYearIndex ? "#3b82f6" : "#1a3a5a"}
                    strokeWidth="2"
                  />
                  <text x="25" y="4" fill="hsl(var(--muted-foreground))" fontSize="11">
                    {year}
                  </text>
                </g>
              ))}
            </g>
          </svg>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Button size="sm" onClick={handlePlay} variant={isPlaying ? "secondary" : "default"}>
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button size="sm" variant="outline" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <Slider
              value={[currentYearIndex]}
              onValueChange={(value) => {
                setIsPlaying(false)
                setCurrentYearIndex(value[0])
              }}
              max={years.length - 1}
              step={1}
            />
          </div>
          <span className="text-sm font-semibold text-foreground">{currentYear}</span>
        </div>

        <div className="rounded-lg border border-border bg-muted/50 p-3">
          <p className="text-xs text-muted-foreground">
            Cada línea representa la posición de la costa en diferentes años. El avance del mar es visible en el
            desplazamiento hacia el interior.
          </p>
        </div>
      </div>
    </div>
  )
}
