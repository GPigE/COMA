"use client"

import { useEffect, useRef } from "react"

interface CoastalMapProps {
  selectedYear: number
}

export function CoastalMap({ selectedYear }: CoastalMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const coastlineLayerRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return

    const loadLeaflet = async () => {
      // Load Leaflet CSS
      if (!document.getElementById("leaflet-css")) {
        const link = document.createElement("link")
        link.id = "leaflet-css"
        link.rel = "stylesheet"
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        document.head.appendChild(link)
      }

      // Load Leaflet JS
      if (!(window as any).L) {
        await new Promise<void>((resolve) => {
          const script = document.createElement("script")
          script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          script.onload = () => resolve()
          document.head.appendChild(script)
        })
      }

      const L = (window as any).L

      // Initialize map only once
      if (!mapInstanceRef.current && mapRef.current) {
        const map = L.map(mapRef.current, {
          center: [20.5, -88.5],
          zoom: 8,
          zoomControl: true,
        })

        // Add base tile layer with custom styling
        L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
          attribution: "© OpenStreetMap contributors © CARTO",
          maxZoom: 19,
        }).addTo(map)

        // Apply CSS filter to make land blue and water white
        const tileLayer = map.getPanes().tilePane as HTMLElement
        if (tileLayer) {
          tileLayer.style.filter = "invert(1) hue-rotate(180deg) saturate(3) brightness(0.9)"
        }

        mapInstanceRef.current = map

        // Add legend
        const legend = L.control({ position: "bottomleft" })
        legend.onAdd = () => {
          const div = L.DomUtil.create("div", "info legend")
          div.style.background = "rgba(0, 0, 0, 0.8)"
          div.style.padding = "10px"
          div.style.borderRadius = "8px"
          div.style.color = "white"
          div.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 8px;">Nivel de Elevación Costera</div>
            <div style="display: flex; align-items: center; margin-bottom: 4px;">
              <div style="width: 20px; height: 4px; background: #22c55e; margin-right: 8px;"></div>
              <span style="font-size: 12px;">Seguro (>3m)</span>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 4px;">
              <div style="width: 20px; height: 4px; background: #eab308; margin-right: 8px;"></div>
              <span style="font-size: 12px;">Moderado (2-3m)</span>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 4px;">
              <div style="width: 20px; height: 4px; background: #f97316; margin-right: 8px;"></div>
              <span style="font-size: 12px;">Riesgo (1-2m)</span>
            </div>
            <div style="display: flex; align-items: center;">
              <div style="width: 20px; height: 4px; background: #ef4444; margin-right: 8px;"></div>
              <span style="font-size: 12px;">Crítico (<1m)</span>
            </div>
          `
          return div
        }
        legend.addTo(map)
      }
    }

    loadLeaflet()
  }, [])

  // Update coastline based on selected year
  useEffect(() => {
    if (!mapInstanceRef.current || typeof window === "undefined") return

    const L = (window as any).L
    if (!L) return

    // Remove existing coastline layer
    if (coastlineLayerRef.current) {
      mapInstanceRef.current.removeLayer(coastlineLayerRef.current)
    }

    // Generate coastline data for the selected year
    const coastlineData = generateCoastlineForYear(selectedYear)

    // Create feature group for coastline segments
    const featureGroup = L.featureGroup()

    coastlineData.forEach((segment: any) => {
      const color = getColorForHeight(segment.height)

      const polyline = L.polyline(segment.coordinates, {
        color: color,
        weight: 6,
        opacity: 0.8,
      })

      polyline.bindTooltip(
        `<strong>${segment.name}</strong><br/>Año: ${selectedYear}<br/>Elevación: ${segment.height.toFixed(2)}m`,
        { sticky: true },
      )

      polyline.addTo(featureGroup)
    })

    featureGroup.addTo(mapInstanceRef.current)
    coastlineLayerRef.current = featureGroup
  }, [selectedYear])

  return <div ref={mapRef} className="h-full w-full" />
}

// Generate plausible coastline data for a given year
function generateCoastlineForYear(year: number) {
  const baseYear = 2000
  const yearDiff = year - baseYear
  const erosionRate = 0.15 // meters per year

  const segments = [
    {
      name: "Celestún",
      coords: [
        [-90.4, 20.85],
        [-90.2, 20.9],
      ],
      baseHeight: 3.5,
    },
    {
      name: "Sisal",
      coords: [
        [-90.2, 20.9],
        [-90.0, 21.0],
      ],
      baseHeight: 3.2,
    },
    {
      name: "Progreso",
      coords: [
        [-90.0, 21.0],
        [-89.7, 21.3],
      ],
      baseHeight: 2.8,
    },
    {
      name: "Telchac",
      coords: [
        [-89.7, 21.3],
        [-89.3, 21.35],
      ],
      baseHeight: 3.0,
    },
    {
      name: "Dzilam",
      coords: [
        [-89.3, 21.35],
        [-88.9, 21.4],
      ],
      baseHeight: 3.3,
    },
    {
      name: "San Felipe",
      coords: [
        [-88.9, 21.4],
        [-88.3, 21.5],
      ],
      baseHeight: 3.6,
    },
    {
      name: "Río Lagartos",
      coords: [
        [-88.3, 21.5],
        [-87.8, 21.55],
      ],
      baseHeight: 3.8,
    },
    {
      name: "Holbox",
      coords: [
        [-87.8, 21.55],
        [-87.3, 21.5],
      ],
      baseHeight: 2.5,
    },
    {
      name: "Isla Mujeres",
      coords: [
        [-87.3, 21.5],
        [-86.8, 21.2],
      ],
      baseHeight: 2.3,
    },
    {
      name: "Cancún Norte",
      coords: [
        [-86.8, 21.2],
        [-86.75, 21.1],
      ],
      baseHeight: 2.0,
    },
    {
      name: "Cancún Centro",
      coords: [
        [-86.75, 21.1],
        [-86.77, 21.0],
      ],
      baseHeight: 1.8,
    },
    {
      name: "Puerto Morelos",
      coords: [
        [-86.77, 21.0],
        [-86.85, 20.85],
      ],
      baseHeight: 2.4,
    },
    {
      name: "Playa del Carmen",
      coords: [
        [-86.85, 20.85],
        [-86.95, 20.6],
      ],
      baseHeight: 2.2,
    },
    {
      name: "Akumal",
      coords: [
        [-86.95, 20.6],
        [-87.2, 20.4],
      ],
      baseHeight: 2.6,
    },
    {
      name: "Tulum",
      coords: [
        [-87.2, 20.4],
        [-87.4, 20.2],
      ],
      baseHeight: 2.1,
    },
    {
      name: "Sian Ka'an",
      coords: [
        [-87.4, 20.2],
        [-87.5, 19.8],
      ],
      baseHeight: 3.1,
    },
    {
      name: "Mahahual",
      coords: [
        [-87.5, 19.8],
        [-87.7, 18.7],
      ],
      baseHeight: 2.9,
    },
  ]

  return segments.map((segment) => ({
    name: segment.name,
    coordinates: segment.coords,
    height: Math.max(0.5, segment.baseHeight - erosionRate * yearDiff),
  }))
}

// Get color based on height (green = safe, red = critical)
function getColorForHeight(height: number): string {
  if (height >= 3.0) return "#22c55e" // Green - Safe
  if (height >= 2.0) return "#eab308" // Yellow - Moderate
  if (height >= 1.0) return "#f97316" // Orange - Risk
  return "#ef4444" // Red - Critical
}
