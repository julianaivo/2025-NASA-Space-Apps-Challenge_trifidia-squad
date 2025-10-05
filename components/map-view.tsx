"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"

export function MapView() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const [clickedLocation, setClickedLocation] = useState<{ lat: number; lng: number }>({
    lat: -10.9472,
    lng: -37.0731,
  })

  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return

    import("mapbox-gl").then((mapboxgl) => {
      if (!mapContainerRef.current || mapRef.current) return

      // Initialize Mapbox map
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [-37.0731, -10.9472], // Aracaju, Brazil
        zoom: 11,
        accessToken:
          process.env.NEXT_PUBLIC_MAPBOX_TOKEN ||
          "pk.eyJ1IjoidjBkZXYiLCJhIjoiY20yNXB5ZGZxMDFrYzJqcHptdGN5dGJhZCJ9.example",
      })

      mapRef.current = map

      map.on("load", () => {
        // Seismic Effect (outermost, blue)
        map.addLayer({
          id: "seismic-outer",
          type: "circle",
          source: {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [-37.0731, -10.9472],
              },
              properties: {},
            },
          },
          paint: {
            "circle-radius": {
              stops: [
                [0, 0],
                [22, 800],
              ],
              base: 2,
            },
            "circle-color": "#3b82f6",
            "circle-opacity": 0.05,
            "circle-blur": 0.8,
          },
        })

        // Radiation (yellow/orange)
        map.addLayer({
          id: "radiation",
          type: "circle",
          source: {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [-37.0731, -10.9472],
              },
              properties: {},
            },
          },
          paint: {
            "circle-radius": {
              stops: [
                [0, 0],
                [22, 600],
              ],
              base: 2,
            },
            "circle-color": "#fbbf24",
            "circle-opacity": 0.15,
            "circle-blur": 0.7,
          },
        })

        // Shock Wave (cyan/teal)
        map.addLayer({
          id: "shockwave",
          type: "circle",
          source: {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [-37.0731, -10.9472],
              },
              properties: {},
            },
          },
          paint: {
            "circle-radius": {
              stops: [
                [0, 0],
                [22, 400],
              ],
              base: 2,
            },
            "circle-color": "#06b6d4",
            "circle-opacity": 0.2,
            "circle-blur": 0.6,
          },
        })

        // Heat/Thermal (orange)
        map.addLayer({
          id: "heat",
          type: "circle",
          source: {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [-37.0731, -10.9472],
              },
              properties: {},
            },
          },
          paint: {
            "circle-radius": {
              stops: [
                [0, 0],
                [22, 250],
              ],
              base: 2,
            },
            "circle-color": "#f97316",
            "circle-opacity": 0.3,
            "circle-blur": 0.5,
          },
        })

        // Fireball (bright orange/red)
        map.addLayer({
          id: "fireball",
          type: "circle",
          source: {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [-37.0731, -10.9472],
              },
              properties: {},
            },
          },
          paint: {
            "circle-radius": {
              stops: [
                [0, 0],
                [22, 120],
              ],
              base: 2,
            },
            "circle-color": "#ef4444",
            "circle-opacity": 0.4,
            "circle-blur": 0.4,
          },
        })

        // Core/Epicenter (bright white/yellow)
        map.addLayer({
          id: "epicenter-glow",
          type: "circle",
          source: {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [-37.0731, -10.9472],
              },
              properties: {},
            },
          },
          paint: {
            "circle-radius": {
              stops: [
                [0, 0],
                [22, 50],
              ],
              base: 2,
            },
            "circle-color": "#fef3c7",
            "circle-opacity": 0.8,
            "circle-blur": 0.3,
          },
        })

        // Epicenter marker
        const el = document.createElement("div")
        el.className = "epicenter-marker"
        el.style.width = "32px"
        el.style.height = "32px"
        el.style.background = "radial-gradient(circle, #ffffff 0%, #fbbf24 50%, transparent 100%)"
        el.style.borderRadius = "50%"
        el.style.border = "3px solid #ffffff"
        el.style.boxShadow = "0 0 30px #fbbf24, 0 0 60px #f97316"

        new mapboxgl.Marker({ element: el }).setLngLat([-37.0731, -10.9472]).addTo(map)
      })

      map.on("click", (e) => {
        setClickedLocation({ lat: e.lngLat.lat, lng: e.lngLat.lng })
      })

      return () => {
        map.remove()
        mapRef.current = null
      }
    })
  }, [])

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Coordinates Display */}
      <Card className="absolute bottom-4 left-4 px-3 py-2 bg-card/95 backdrop-blur border-border">
        <div className="text-xs font-mono text-muted-foreground">
          <div>Lat: {clickedLocation.lat.toFixed(4)}°</div>
          <div>Lng: {clickedLocation.lng.toFixed(4)}°</div>
        </div>
      </Card>

      {/* Instruction Tooltip */}
      <Card className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-card/95 backdrop-blur border-border">
        <p className="text-xs text-muted-foreground">Clique no mapa para selecionar o local de impacto</p>
      </Card>

      <style jsx global>{`
        @import url("https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css");

        .mapboxgl-ctrl-attrib {
          font-size: 10px;
          background-color: rgba(0, 0, 0, 0.5) !important;
        }

        .mapboxgl-ctrl-logo {
          display: none !important;
        }

        .epicenter-marker {
          cursor: pointer;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  )
}
