"use client"

import { useEffect, useRef } from "react"

export function AsteroidVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let rotation = 0

    const animate = () => {
      ctx.fillStyle = "oklch(0.14 0.01 264)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = 80

      // Draw asteroid sphere with rotation effect
      const gradient = ctx.createRadialGradient(centerX - 20, centerY - 20, 10, centerX, centerY, radius)
      gradient.addColorStop(0, "oklch(0.45 0.05 30)")
      gradient.addColorStop(0.7, "oklch(0.30 0.03 30)")
      gradient.addColorStop(1, "oklch(0.15 0.01 30)")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.fill()

      // Draw craters
      const craters = [
        { x: -30, y: -20, r: 12 },
        { x: 25, y: -35, r: 8 },
        { x: 40, y: 15, r: 15 },
        { x: -15, y: 30, r: 10 },
      ]

      craters.forEach((crater) => {
        const craterX = centerX + crater.x * Math.cos(rotation)
        const craterY = centerY + crater.y

        ctx.fillStyle = "oklch(0.12 0.01 30)"
        ctx.beginPath()
        ctx.arc(craterX, craterY, crater.r, 0, Math.PI * 2)
        ctx.fill()
      })

      rotation += 0.005
      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <div className="w-full h-full bg-card flex items-center justify-center">
      <div className="text-center">
        <canvas ref={canvasRef} width={300} height={250} />
        <p className="text-xs text-muted-foreground mt-2">Asteroide 2024 XR-7</p>
        <p className="text-xs text-muted-foreground">Rotação simulada</p>
      </div>
    </div>
  )
}
