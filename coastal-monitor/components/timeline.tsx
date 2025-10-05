"use client"

import { Slider } from "@/components/ui/slider"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TimelineProps {
  selectedYear: number
  onYearChange: (year: number) => void
}

const years = Array.from({ length: 18 }, (_, i) => 2007 + i) // 2007-2024

export function Timeline({ selectedYear, onYearChange }: TimelineProps) {
  const yearIndex = years.indexOf(selectedYear)

  const handleSliderChange = (value: number[]) => {
    onYearChange(years[value[0]])
  }

  const goToPreviousYear = () => {
    const currentIndex = years.indexOf(selectedYear)
    if (currentIndex > 0) {
      onYearChange(years[currentIndex - 1])
    }
  }

  const goToNextYear = () => {
    const currentIndex = years.indexOf(selectedYear)
    if (currentIndex < years.length - 1) {
      onYearChange(years[currentIndex + 1])
    }
  }

  return (
    <div className="rounded-xl border border-border bg-card/95 p-6 shadow-2xl backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Línea de Tiempo</h3>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Evolución costera</p>
          <p className="text-sm font-medium text-foreground">2007 - 2024</p>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={goToPreviousYear}
          disabled={selectedYear === 2007}
          className="h-10 w-10 bg-transparent"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div className="flex min-w-[120px] flex-col items-center">
          <p className="text-4xl font-bold text-primary">{selectedYear}</p>
          <p className="text-xs text-muted-foreground">Año seleccionado</p>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={goToNextYear}
          disabled={selectedYear === 2024}
          className="h-10 w-10 bg-transparent"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Slider */}
      <div className="space-y-4">
        <Slider
          value={[yearIndex]}
          onValueChange={handleSliderChange}
          max={years.length - 1}
          step={1}
          className="w-full"
        />

        {/* Year Markers */}
        <div className="flex justify-between px-1">
          {years.map((year, index) => {
            const isKeyYear = year % 5 === 0 || year === 2024
            const isSelected = year === selectedYear

            return (
              <button
                key={year}
                onClick={() => onYearChange(year)}
                className={`flex flex-col items-center transition-all ${isSelected ? "scale-110" : "hover:scale-105"}`}
              >
                <div
                  className={`h-2 w-2 rounded-full transition-all ${
                    isSelected ? "bg-primary" : isKeyYear ? "bg-muted-foreground" : "bg-muted"
                  }`}
                />
                {isKeyYear && (
                  <span
                    className={`mt-1 text-xs transition-colors ${
                      isSelected ? "font-semibold text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {year}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Quick Jump Buttons */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onYearChange(2007)}
          className="flex-1 rounded-lg bg-muted px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted/80"
        >
          Inicio (2007)
        </button>
        <button
          onClick={() => onYearChange(2024)}
          className="flex-1 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Actual (2024)
        </button>
      </div>
    </div>
  )
}
