"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { MapPin, BarChart3, CheckCircle2, Search, Loader2, AlertTriangle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useSimulationContext } from "@/contexts/SimulationContext"
import { AsteroidInputData, asteroidTypeMapping } from "@/lib/types"

declare global {
  interface Window {
    mapboxgl: any
  }
}

export function AsteroidConfig() {
  const router = useRouter()
  const { simulationState, runSimulation, clearError } = useSimulationContext()

  const [currentStep, setCurrentStep] = useState(1)
  const [angle, setAngle] = useState(45.0)
  const [velocity, setVelocity] = useState(20.0)
  const [projectileDiameter, setProjectileDiameter] = useState("0.15")
  const [projectileDensity, setProjectileDensity] = useState("3.0")
  const [densityType, setDensityType] = useState("custom")
  const [asteroidType, setAsteroidType] = useState("sedimentary-rock")
  const [location, setLocation] = useState("Center, Aracaju")
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null)

  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const marker = useRef<any>(null)

  const densityPresets: Record<string, string> = {
    ice: "0.9",
    iron: "7.8",
    stone: "3.0",
  }

  const handleDensityTypeChange = (value: string) => {
    setDensityType(value)
    if (value !== "custom") {
      setProjectileDensity(densityPresets[value])
    } else if (!projectileDensity) {
      // Se mudou para custom mas não tem valor, define um padrão
      setProjectileDensity("3.0")
    }
  }

  // Inicializar coordenadas padrão
  useEffect(() => {
    if (!coordinates) {
      setCoordinates({ lat: -10.9472, lng: -37.0731 });
    }
  }, []); // Remove coordinates da dependência para evitar loop

  // Function to validate data before sending
  const validateFormData = (): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []

    // Diameter validation
    const diameterValue = projectileDiameter.trim()
    if (!diameterValue) {
      errors.push("Please enter the projectile diameter")
    } else if (isNaN(Number(diameterValue)) || Number(diameterValue) <= 0) {
      errors.push("Diameter must be a positive number (e.g. 0.15)")
    }

    // Density validation
    const densityValue = projectileDensity.trim()
    if (!densityValue) {
      errors.push("Please enter the projectile density")
    } else if (isNaN(Number(densityValue)) || Number(densityValue) <= 0) {
      errors.push("Density must be a positive number (e.g. 3.0)")
    }

    // Validação das coordenadas
    if (!coordinates) {
      errors.push("Please select a location on the map by clicking on it or searching for a location")
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  // Função para executar a simulação
  const handleSimulateImpact = async () => {
    // Limpa erros anteriores
    clearError()

    // Validate data
    const validation = validateFormData()
    if (!validation.isValid) {
      // Show validation errors to user
      const errorMessage = validation.errors.join('\n• ')
      console.error("Invalid data:", validation.errors)
      
      // Use alert temporarily to show error to user
      alert(`Validation error:\n• ${errorMessage}`)
      return
    }

    if (!coordinates) return

    // Prepare data for sending
    const inputData: AsteroidInputData = {
      diameter_km: Number(projectileDiameter.trim()),
      velocity_km_s: velocity,
      impact_angle: angle,
      impact_lat: coordinates.lat,
      impact_lng: coordinates.lng,
      asteroid_type: asteroidTypeMapping[asteroidType] || asteroidType,
    }

    console.log('Data to be sent:', inputData)

    try {
      await runSimulation(inputData)
      
      // Se chegou até aqui, a simulação foi bem sucedida
      // Navegar para o dashboard
      router.push('/dashboard')
    } catch (error) {
      console.error("Erro na simulação:", error)
      
      // Mostra erro para o usuário
      if (error instanceof Error) {
        alert(`Erro na simulação:\n${error.message}`)
      } else {
        alert('Erro desconhecido na simulação')
      }
    }
  }

  useEffect(() => {
    if (map.current) return

    const script = document.createElement("script")
    script.src = "https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.js"
    script.async = true
    document.head.appendChild(script)

    const link = document.createElement("link")
    link.href = "https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css"
    link.rel = "stylesheet"
    document.head.appendChild(link)

    script.onload = () => {
      if (!mapContainer.current) return

      window.mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

      map.current = new window.mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/satellite-streets-v12",
        center: [-37.0731, -10.9472],
        zoom: 12,
      })

      // Add initial marker for the default location
      marker.current = new window.mapboxgl.Marker({ color: "#A1E077" })
        .setLngLat([-37.0731, -10.9472])
        .addTo(map.current)

      map.current.on("click", (e: any) => {
        const { lng, lat } = e.lngLat
        
        // Salva as coordenadas
        setCoordinates({ lat, lng })
        
        // Remove existing marker if it exists
        if (marker.current) {
          marker.current.remove()
        }
        
        // Add new marker at clicked location
        marker.current = new window.mapboxgl.Marker({ color: "#A1E077" }).setLngLat([lng, lat]).addTo(map.current)
        
        fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${window.mapboxgl.accessToken}`,
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.features && data.features.length > 0) {
              setLocation(data.features[0].place_name)
            }
          })
      })
    }

    return () => {
      if (marker.current) {
        marker.current.remove()
        marker.current = null
      }
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchSuggestions(searchQuery)
    }, 300) // Debounce de 300ms

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.search-container')) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const fetchSuggestions = async (query: string) => {
    if (!query.trim() || query.length < 2) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          query,
        )}.json?access_token=${window.mapboxgl.accessToken}&limit=5`,
      )
      const data = await response.json()

      if (data.features && data.features.length > 0) {
        setSuggestions(data.features)
        setShowSuggestions(true)
      } else {
        setSuggestions([])
        setShowSuggestions(false)
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error)
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion: any) => {
    const [lng, lat] = suggestion.center
    
    // Salva as coordenadas
    setCoordinates({ lat, lng })
    
    setLocation(suggestion.place_name)
    setSearchQuery(suggestion.place_name)
    setShowSuggestions(false)

    if (map.current) {
      map.current.flyTo({
        center: [lng, lat],
        zoom: 12,
      })

      // Remove existing marker if it exists
      if (marker.current) {
        marker.current.remove()
      }
      
      // Add new marker at selected location
      marker.current = new window.mapboxgl.Marker({ color: "#A1E077" }).setLngLat([lng, lat]).addTo(map.current)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          searchQuery,
        )}.json?access_token=${window.mapboxgl.accessToken}`,
      )
      const data = await response.json()

      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center
        
        // Salva as coordenadas
        setCoordinates({ lat, lng })
        
        setLocation(data.features[0].place_name)

        if (map.current) {
          map.current.flyTo({
            center: [lng, lat],
            zoom: 12,
          })

          // Remove existing marker if it exists
          if (marker.current) {
            marker.current.remove()
          }
          
          // Add new marker at searched location
          marker.current = new window.mapboxgl.Marker({ color: "#A1E077" }).setLngLat([lng, lat]).addTo(map.current)
        }
      }
    } catch (error) {
      console.error("Error searching location:", error)
    }
  }

  const steps = [
    { id: 1, name: "Location", icon: MapPin },
    { id: 2, name: "Parameters", icon: BarChart3 },
    { id: 3, name: "Resumo", icon: CheckCircle2 },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Title */}
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-4xl font-bold text-foreground">Asteroid</h2>
          <h2 className="mb-4 text-5xl font-bold italic text-primary">IMPACT</h2>
          <p className="text-lg text-muted-foreground">Simulator</p>
        </div>

        {/* Error Alert */}
        {simulationState.error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {simulationState.error}
            </AlertDescription>
          </Alert>
        )}

        {/* Map Section */}
        <section className="mb-12">
          <h3 className="mb-2 text-3xl font-bold text-foreground">Map:</h3>
          <p className="mb-6 text-muted-foreground">Define the region of the planet where the simulation will be carried out</p>

          <div className="mb-4 flex gap-2">
            <div className="relative flex-1 search-container">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch()
                    setShowSuggestions(false)
                  }
                  if (e.key === "Escape") {
                    setShowSuggestions(false)
                  }
                }}
                onFocus={() => {
                  if (suggestions.length > 0) {
                    setShowSuggestions(true)
                  }
                }}
                placeholder="Search location..."
                className="border-muted bg-input pl-10 text-foreground placeholder:text-muted-foreground"
              />
              
              {/* Suggestions dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 z-20 mt-1 bg-card border border-muted rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-4 py-3 hover:bg-accent cursor-pointer border-b border-muted last:border-b-0 transition-colors"
                    >
                      <div className="font-medium text-foreground text-sm">
                        {suggestion.text}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {suggestion.place_name}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Button onClick={handleSearch} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Search
            </Button>
          </div>

          <div className="overflow-hidden rounded-2xl border-2 border-primary">
            <div ref={mapContainer} className="h-96 w-full" />
            <div className="bg-card px-4 py-2 text-center text-sm font-medium text-foreground">{location}</div>
          </div>
        </section>

        {/* Parameters Section */}
        <section className="mb-12">
          <h3 className="mb-2 text-3xl font-bold text-foreground">Parameters:</h3>
          <p className="mb-6 text-muted-foreground">Define the region of the planet where the simulation will be carried out</p>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Projectile Parameters */}
            <Card className="border-2 border-primary bg-card p-6">
              <h4 className="mb-6 text-center text-lg font-semibold text-foreground">Projectile Parameters</h4>
              <div className="space-y-6">
                <div>
                  <div className="mb-2 flex justify-between">
                    <Label className="text-sm text-foreground">Diameter</Label>
                    <span className="text-sm text-muted-foreground">km</span>
                  </div>
                  <Input
                    value={projectileDiameter}
                    onChange={(e) => setProjectileDiameter(e.target.value)}
                    placeholder="Diameter"
                    className="border-muted bg-input text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <div className="mb-2 flex justify-between">
                    <Label className="text-sm text-foreground">Density</Label>
                    <span className="text-sm text-muted-foreground">g/cm³</span>
                  </div>
                  <Select value={densityType} onValueChange={handleDensityTypeChange}>
                    <SelectTrigger className="mb-2 border-muted bg-input text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="custom">Custom</SelectItem>
                      <SelectItem value="ice">Ice (0.9 g/cm³)</SelectItem>
                      <SelectItem value="iron">Iron (7.8 g/cm³)</SelectItem>
                      <SelectItem value="stone">Stone (3.0 g/cm³)</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    value={projectileDensity}
                    onChange={(e) => setProjectileDensity(e.target.value)}
                    placeholder="Density"
                    disabled={densityType !== "custom"}
                    className="border-muted bg-input text-foreground placeholder:text-muted-foreground disabled:opacity-50"
                  />
                </div>
              </div>
            </Card>

            {/* Impact Parameters */}
            <Card className="border-2 border-primary bg-card p-6">
              <h4 className="mb-6 text-center text-lg font-semibold text-foreground">Impact Parameters</h4>
              <div className="space-y-6">
                <div>
                  <Label className="mb-3 block text-sm text-foreground">Angle: {angle.toFixed(1)}°</Label>
                  <Slider
                    value={[angle]}
                    onValueChange={(value) => setAngle(value[0])}
                    max={90}
                    min={0}
                    step={0.1}
                    className="mb-2 [&_[role=slider]]:border-primary [&_[role=slider]]:bg-primary"
                  />
                  <Input
                    type="number"
                    value={angle}
                    onChange={(e) => setAngle(Math.min(90, Math.max(0, Number.parseFloat(e.target.value) || 0)))}
                    min={0}
                    max={90}
                    step={0.1}
                    className="border-muted bg-input text-foreground"
                  />
                </div>
                <div>
                  <Label className="mb-3 block text-sm text-foreground">Velocity: {velocity.toFixed(1)} km/s</Label>
                  <Slider
                    value={[velocity]}
                    onValueChange={(value) => setVelocity(value[0])}
                    max={100}
                    min={1}
                    step={0.1}
                    className="mb-2 [&_[role=slider]]:border-primary [&_[role=slider]]:bg-primary"
                  />
                  <Input
                    type="number"
                    value={velocity}
                    onChange={(e) => setVelocity(Math.min(100, Math.max(1, Number.parseFloat(e.target.value) || 1)))}
                    min={1}
                    max={100}
                    step={0.1}
                    className="border-muted bg-input text-foreground"
                  />
                </div>
              </div>
            </Card>

            {/* Target Parameters */}
            <Card className="border-2 border-primary bg-card p-6">
              <h4 className="mb-6 text-center text-lg font-semibold text-foreground">Target Parameters</h4>
              <div className="space-y-6">
                <div>
                  <Label className="mb-2 block text-sm text-foreground">Asteroid Type</Label>
                  <Select value={asteroidType} onValueChange={setAsteroidType}>
                    <SelectTrigger className="border-muted bg-input text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedimentary-rock">Sedimentary Rock</SelectItem>
                      <SelectItem value="water">Water</SelectItem>
                      <SelectItem value="crystalline-rock">Crystalline Rock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section>
          <Card className="border-2 border-primary bg-card p-6">
            <h4 className="mb-4 text-lg font-semibold text-foreground">Configuration Summary</h4>
            <div className="grid gap-4 text-sm md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Projectile Diameter:</span>
                  <span className="text-foreground">{projectileDiameter || "Not defined"} km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Density:</span>
                  <span className="text-foreground">{projectileDensity || "Not defined"} g/cm³</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Density Type:</span>
                  <span className="text-foreground capitalize">
                    {densityType === "custom" ? "Custom" : densityType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Velocity:</span>
                  <span className="text-foreground">{velocity.toFixed(1)} km/s</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Angle:</span>
                  <span className="text-foreground">{angle.toFixed(1)}°</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Impact Location:</span>
                  <span className="text-foreground">{location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Asteroid Type:</span>
                  <span className="text-foreground">
                    {asteroidType === "sedimentary-rock"
                      ? "Sedimentary Rock"
                      : asteroidType === "water"
                        ? "Water"
                        : "Crystalline Rock"}
                  </span>
                </div>
                {coordinates && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Coordinates:</span>
                    <span className="text-foreground">
                      {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </section>

        {/* Action Button */}
        <div className="mt-8 flex justify-center">
          <Button
            size="lg"
            onClick={handleSimulateImpact}
            disabled={simulationState.loading}
            className="bg-primary px-12 text-lg font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {simulationState.loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Simulating...
              </>
            ) : (
              "Simulate Impact"
            )}
          </Button>
        </div>
      </main>
    </div>
  )
}
