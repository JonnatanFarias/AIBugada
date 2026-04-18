"use client"

import { useEffect, useState, useRef } from "react"

/**
 * Random glitch overlay that occasionally distorts part of the screen
 */
export function GlitchOverlay() {
  const [active, setActive] = useState(false)
  const [position, setPosition] = useState({ top: 0, height: 20 })

  useEffect(() => {
    const triggerGlitch = () => {
      const shouldGlitch = Math.random() > 0.7
      if (shouldGlitch) {
        setPosition({
          top: Math.random() * 80,
          height: 5 + Math.random() * 15,
        })
        setActive(true)
        setTimeout(() => setActive(false), 100 + Math.random() * 200)
      }
    }

    const interval = setInterval(triggerGlitch, 2000 + Math.random() * 3000)
    return () => clearInterval(interval)
  }, [])

  if (!active) return null

  return (
    <div
      className="pointer-events-none fixed left-0 right-0 z-[9999] overflow-hidden"
      style={{
        top: `${position.top}%`,
        height: `${position.height}%`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, 
            transparent 0%, 
            oklch(0.62 0.26 300 / 0.1) 20%, 
            oklch(0.65 0.22 220 / 0.15) 40%, 
            oklch(0.65 0.28 25 / 0.1) 60%,
            transparent 100%)`,
          transform: `translateX(${Math.random() > 0.5 ? 5 : -5}px)`,
          animation: "horizontal-glitch 0.1s linear",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: "hue-rotate(90deg) saturate(2)",
          clipPath: `polygon(0 ${Math.random() * 30}%, 100% ${Math.random() * 30}%, 100% ${70 + Math.random() * 30}%, 0 ${70 + Math.random() * 30}%)`,
        }}
      />
    </div>
  )
}

/**
 * Animated scanline that moves down the screen
 */
export function MovingScanline() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[9998] overflow-hidden">
      <div
        className="absolute left-0 right-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, 
            transparent 0%, 
            oklch(0.62 0.26 300 / 0.3) 20%,
            oklch(0.62 0.26 300 / 0.5) 50%,
            oklch(0.62 0.26 300 / 0.3) 80%,
            transparent 100%)`,
          animation: "scan-line-move 4s linear infinite",
          boxShadow: "0 0 10px oklch(0.62 0.26 300 / 0.5)",
        }}
      />
    </div>
  )
}

/**
 * Random "matrix-like" data corruption text that flashes briefly
 */
export function DataCorruptionFlash() {
  const [visible, setVisible] = useState(false)
  const [text, setText] = useState("")
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`01アイウエオカキクケコ"

  useEffect(() => {
    const generateGlitchText = () => {
      const length = 5 + Math.floor(Math.random() * 15)
      return Array.from({ length }, () => 
        glitchChars[Math.floor(Math.random() * glitchChars.length)]
      ).join("")
    }

    const triggerFlash = () => {
      if (Math.random() > 0.6) {
        setText(generateGlitchText())
        setPosition({
          x: 10 + Math.random() * 80,
          y: 10 + Math.random() * 80,
        })
        setVisible(true)
        setTimeout(() => setVisible(false), 50 + Math.random() * 150)
      }
    }

    const interval = setInterval(triggerFlash, 3000 + Math.random() * 4000)
    return () => clearInterval(interval)
  }, [])

  if (!visible) return null

  return (
    <div
      className="pointer-events-none fixed z-[9997] font-mono text-xs text-neon-blue opacity-70"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        textShadow: "0 0 5px oklch(0.65 0.22 220)",
        animation: "flicker 0.1s infinite",
      }}
    >
      {text}
    </div>
  )
}

/**
 * Glitch text component with RGB split effect
 */
interface GlitchTextProps {
  children: string
  className?: string
  intensity?: "low" | "medium" | "high"
}

export function GlitchText({ children, className = "", intensity = "medium" }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const glitchProbability = intensity === "low" ? 0.1 : intensity === "high" ? 0.4 : 0.2
    const interval = setInterval(() => {
      if (Math.random() < glitchProbability) {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 100 + Math.random() * 200)
      }
    }, 2000)
    return () => clearInterval(interval)
  }, [intensity])

  return (
    <span
      className={`relative inline-block ${className}`}
      data-text={children}
    >
      <span className={isGlitching ? "glitch-rgb" : ""}>{children}</span>
      {isGlitching && (
        <>
          <span
            className="absolute left-0 top-0 -translate-x-[2px] text-glitch-red opacity-70"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)" }}
            aria-hidden="true"
          >
            {children}
          </span>
          <span
            className="absolute left-0 top-0 translate-x-[2px] text-neon-blue opacity-70"
            style={{ clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)" }}
            aria-hidden="true"
          >
            {children}
          </span>
        </>
      )}
    </span>
  )
}

/**
 * Glitchy cursor that occasionally twitches
 */
export function GlitchCursor() {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const cursorRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        setOffset({
          x: (Math.random() - 0.5) * 20,
          y: (Math.random() - 0.5) * 20,
        })
        setTimeout(() => setOffset({ x: 0, y: 0 }), 50)
      }
    }, 500)

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearInterval(glitchInterval)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed z-[9999] hidden h-4 w-4 mix-blend-difference md:block"
      style={{
        left: mousePos.x + offset.x - 8,
        top: mousePos.y + offset.y - 8,
        transition: offset.x === 0 ? "transform 0.1s ease-out" : "none",
      }}
    >
      <div className="absolute inset-0 rounded-full border border-primary opacity-50" />
      <div className="absolute inset-[3px] rounded-full bg-primary opacity-30" />
      {offset.x !== 0 && (
        <>
          <div
            className="absolute inset-0 rounded-full border border-glitch-red opacity-50"
            style={{ transform: "translate(-3px, -1px)" }}
          />
          <div
            className="absolute inset-0 rounded-full border border-neon-blue opacity-50"
            style={{ transform: "translate(3px, 1px)" }}
          />
        </>
      )}
    </div>
  )
}

/**
 * Screen tear effect
 */
export function ScreenTear() {
  const [tears, setTears] = useState<Array<{ id: number; top: number; offset: number }>>([])

  useEffect(() => {
    const createTear = () => {
      if (Math.random() > 0.85) {
        const id = Date.now()
        const newTear = {
          id,
          top: Math.random() * 100,
          offset: (Math.random() - 0.5) * 20,
        }
        setTears(prev => [...prev, newTear])
        setTimeout(() => {
          setTears(prev => prev.filter(t => t.id !== id))
        }, 100)
      }
    }

    const interval = setInterval(createTear, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {tears.map(tear => (
        <div
          key={tear.id}
          className="pointer-events-none fixed left-0 right-0 z-[9996] h-[3px]"
          style={{
            top: `${tear.top}%`,
            background: `linear-gradient(90deg, 
              transparent, 
              oklch(0.08 0.01 270) 10%, 
              oklch(0.08 0.01 270) 90%, 
              transparent)`,
            transform: `translateX(${tear.offset}px)`,
            boxShadow: `0 0 1px oklch(0.62 0.26 300 / 0.5)`,
          }}
        />
      ))}
    </>
  )
}

/**
 * Combined glitch effects wrapper
 */
interface GlitchEffectsProviderProps {
  children: React.ReactNode
  enableOverlay?: boolean
  enableScanline?: boolean
  enableCorruption?: boolean
  enableCursor?: boolean
  enableTear?: boolean
}

export function GlitchEffectsProvider({
  children,
  enableOverlay = true,
  enableScanline = true,
  enableCorruption = true,
  enableCursor = false,
  enableTear = true,
}: GlitchEffectsProviderProps) {
  return (
    <>
      {children}
      {enableOverlay && <GlitchOverlay />}
      {enableScanline && <MovingScanline />}
      {enableCorruption && <DataCorruptionFlash />}
      {enableCursor && <GlitchCursor />}
      {enableTear && <ScreenTear />}
    </>
  )
}
