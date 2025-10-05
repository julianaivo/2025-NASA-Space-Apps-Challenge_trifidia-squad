"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"

type MapViewProps = {
  onLocationSelect?: (lat: number, lng: number) => void
  impactLocation?: { lat: number; lng: number }
  damageData?: {
    crater: number
    thermal: number
    shockwave: number
    seismic: number
    final: number
  }
  animationPhase?: number
  isAnimating?: boolean
}

export function MapView({ 
  onLocationSelect, 
  impactLocation, 
  damageData, 
  animationPhase = 0, 
  isAnimating = false 
}: MapViewProps = {}) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const [clickedLocation, setClickedLocation] = useState<{ lat: number; lng: number }>({
    lat: impactLocation?.lat || -10.9472,
    lng: impactLocation?.lng || -37.0731,
  })
  const [mapError, setMapError] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return

    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (!mapboxToken) {
      setMapError("Token do Mapbox não configurado. Configure NEXT_PUBLIC_MAPBOX_TOKEN nas variáveis de ambiente.")
      return
    }

    import("mapbox-gl")
      .then((module) => {
        const mapboxgl = module.default
        if (!mapContainerRef.current || mapRef.current) return

        mapboxgl.accessToken = mapboxToken

        // Initialize Mapbox map
        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: "mapbox://styles/mapbox/dark-v11",
          center: [-37.0731, -10.9472], // Aracaju, Brazil
          zoom: 11,
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
          const location = { lat: e.lngLat.lat, lng: e.lngLat.lng }
          setClickedLocation(location)
          onLocationSelect?.(location.lat, location.lng)
        })
      })
      .catch((error) => {
        console.error("[v0] Error loading Mapbox:", error)
        setMapError("Erro ao carregar o Mapbox. Verifique a conexão com a internet.")
      })

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [onLocationSelect])

  // Atualizar animação baseada nos dados reais
  useEffect(() => {
    if (!mapRef.current || !impactLocation || !damageData) return;

    const map = mapRef.current;
    const coordinates = [impactLocation.lng, impactLocation.lat];

    // Calcular raios baseados na fase da animação
    const currentPhase = animationPhase / 100;
    
    // Converter km para pixels de mapa baseado no zoom
    const zoom = map.getZoom();
    const kmToPixels = (km: number) => {
      // Aproximação: 1 km ≈ (2^zoom) * 0.5 pixels no nível do mar
      return km * Math.pow(2, zoom - 8) * 0.5;
    };
    
    const layerUpdates = [
      {
        id: 'seismic-outer',
        radius: kmToPixels(damageData.seismic * currentPhase),
        color: '#3b82f6',
        opacity: 0.05 * currentPhase
      },
      {
        id: 'radiation',
        radius: kmToPixels(damageData.thermal * currentPhase),
        color: '#fbbf24',
        opacity: 0.15 * currentPhase
      },
      {
        id: 'shockwave',
        radius: kmToPixels(damageData.shockwave * currentPhase),
        color: '#06b6d4',
        opacity: 0.2 * currentPhase
      },
      {
        id: 'heat',
        radius: kmToPixels(damageData.thermal * currentPhase * 0.8),
        color: '#f97316',
        opacity: 0.3 * currentPhase
      },
      {
        id: 'fireball',
        radius: kmToPixels(damageData.crater * currentPhase),
        color: '#ef4444',
        opacity: 0.4 * currentPhase
      },
      {
        id: 'epicenter-glow',
        radius: kmToPixels(0.5 * currentPhase),
        color: '#ffffff',
        opacity: 0.8 * currentPhase
      }
    ];

    // Atualizar cada camada
    layerUpdates.forEach(layer => {
      if (map.getLayer(layer.id)) {
        const source = map.getSource(layer.id);
        if (source && source.setData) {
          source.setData({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: coordinates,
            },
            properties: {},
          });
        }

        // Atualizar propriedades visuais
        map.setPaintProperty(layer.id, 'circle-radius', Math.max(0, layer.radius));
        map.setPaintProperty(layer.id, 'circle-color', layer.color);
        map.setPaintProperty(layer.id, 'circle-opacity', layer.opacity);
      }
    });

    // Centralizar no local de impacto na primeira execução
    if (currentPhase === 0 && isAnimating) {
      map.flyTo({
        center: coordinates,
        zoom: 11,
        duration: 1500
      });
    }
  }, [impactLocation, damageData, animationPhase, isAnimating]);

  if (mapError) {
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-muted/20">
        <Card className="p-6 max-w-md">
          <h3 className="text-lg font-semibold text-destructive mb-2">Erro de Configuração</h3>
          <p className="text-sm text-muted-foreground mb-4">{mapError}</p>
          <p className="text-xs text-muted-foreground">
            Adicione a variável de ambiente nas Configurações do Projeto (ícone de engrenagem no canto superior
            direito).
          </p>
        </Card>
      </div>
    )
  }

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
