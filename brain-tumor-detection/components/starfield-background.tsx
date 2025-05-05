"use client"

import { useEffect, useRef } from "react"

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  twinkleSpeed: number
  twinklePhase: number
}

export function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const animationFrameRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    // Initialize stars
    const initStars = () => {
      const starCount = Math.floor((canvas.width * canvas.height) / 10000) // Adjust density
      starsRef.current = []

      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5, // Size between 0.5 and 2
          opacity: Math.random() * 0.5 + 0.2, // Opacity between 0.2 and 0.7
          speed: Math.random() * 0.05 + 0.01, // Slow movement
          twinkleSpeed: Math.random() * 0.02 + 0.005, // Twinkle speed
          twinklePhase: Math.random() * Math.PI * 2, // Random starting phase
        })
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw stars
      starsRef.current.forEach((star) => {
        // Update twinkle phase
        star.twinklePhase += star.twinkleSpeed
        if (star.twinklePhase > Math.PI * 2) {
          star.twinklePhase -= Math.PI * 2
        }

        // Calculate current opacity based on twinkle
        const currentOpacity = star.opacity * (0.5 + 0.5 * Math.sin(star.twinklePhase))

        // Draw star
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`
        ctx.fill()

        // Move star slightly (subtle drift)
        star.y += star.speed

        // Reset position if off screen
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Set up canvas and start animation
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    animate()

    // Clean up
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" aria-hidden="true" />
}

