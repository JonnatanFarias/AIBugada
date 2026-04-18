"use client"

import { useState, useEffect, useCallback } from "react"
import { GlitchText } from "./glitch-effects"

const glitchMessages = [
  "Erro inesperado… ou esperado?",
  "Realidade não encontrada",
  "Carregando desinformação...",
  "Kernel panic: cérebro cheio",
  "404: Lógica não encontrada",
  "SEGFAULT: memória corrompida",
  "Buffer overflow de besteiras",
  "Dividindo por zero... sucesso?",
]

const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`01"

export function Header() {
  const [glitchMsg, setGlitchMsg] = useState(glitchMessages[0])
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayText, setDisplayText] = useState(glitchMessages[0])
  const [logoGlitch, setLogoGlitch] = useState(false)

  const scrambleText = useCallback((targetText: string) => {
    setIsTransitioning(true)
    let iterations = 0
    const maxIterations = 10

    const interval = setInterval(() => {
      setDisplayText(prev => {
        return targetText
          .split("")
          .map((char, index) => {
            if (index < iterations) return targetText[index]
            if (char === " ") return " "
            return glitchChars[Math.floor(Math.random() * glitchChars.length)]
          })
          .join("")
      })
      iterations++
      if (iterations > targetText.length + maxIterations) {
        clearInterval(interval)
        setDisplayText(targetText)
        setIsTransitioning(false)
      }
    }, 30)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const newMsg = glitchMessages[Math.floor(Math.random() * glitchMessages.length)]
      setGlitchMsg(newMsg)
      scrambleText(newMsg)
    }, 4000)
    return () => clearInterval(interval)
  }, [scrambleText])

  // Random logo glitch
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setLogoGlitch(true)
        setTimeout(() => setLogoGlitch(false), 150)
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md crt-effect">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        {/* Logo + Title Section */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Logo Image - Replace /logo.png with your actual logo file */}
          <div 
            className={`relative group flex-shrink-0 overflow-hidden rounded-full transition-all duration-200 hover:scale-110 ${
              logoGlitch ? "glitch-rgb" : ""
            }`}
            style={logoGlitch ? { 
              transform: `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)` 
            } : undefined}
          >
            {/* Neon glow effect */}
            <div 
              className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-secondary to-primary opacity-0 blur transition-opacity group-hover:opacity-50"
              aria-hidden="true"
            />
            <img 
              src="/logo.png" 
              alt="AI Bugada Logo"
              className="relative h-10 w-10 rounded-full border border-primary/30 shadow-lg"
              style={{
                boxShadow: "0 0 12px oklch(0.62 0.26 300 / 0.4), inset 0 0 12px oklch(0.62 0.26 300 / 0.1)"
              }}
            />
          </div>

          {/* Title */}
          <div className="flex flex-col justify-center min-w-0">
            <h1 className="relative font-mono text-lg font-bold tracking-widest text-foreground sm:text-xl">
              <GlitchText intensity="medium" className="text-primary neon-text">
                AI
              </GlitchText>{" "}
              <GlitchText intensity="high" className="text-secondary">
                Bugada
              </GlitchText>
              {/* Decorative glitch layers */}
              <span 
                className="pointer-events-none absolute inset-0 select-none text-glitch-red opacity-0 mix-blend-screen"
                style={{ animation: "horizontal-glitch 8s infinite" }}
                aria-hidden="true"
              >
                AI Bugada
              </span>
            </h1>
            <span className="hidden font-mono text-[9px] text-muted-foreground sm:block">
              Simulador de Falhas Inteligentes
            </span>
          </div>
        </div>

        {/* Status badge */}
        <div className="group relative flex items-center gap-1.5 overflow-hidden rounded-full border border-destructive/40 bg-destructive/10 px-3 py-1.5 transition-all hover:border-destructive/60 hover:bg-destructive/20">
          {/* Animated background */}
          <div 
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-destructive/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"
            aria-hidden="true"
          />
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive" />
          </span>
          <span className="relative font-mono text-xs text-destructive glitch-skew">
            Sistema instável
          </span>
        </div>
      </div>

      {/* Glitch ticker */}
      <div className="relative overflow-hidden border-t border-border/50 bg-muted/30 px-4 py-1.5">
        {/* Moving highlight */}
        <div 
          className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
          style={{ animation: "shimmer 3s linear infinite", left: "-20%" }}
          aria-hidden="true"
        />
        <p className={`font-mono text-xs transition-all duration-100 ${isTransitioning ? "text-primary" : "text-muted-foreground"}`}>
          <span className="mr-2 inline-block text-primary" style={{ animation: "flicker 2s infinite" }}>&gt;&gt;</span>
          <span className={isTransitioning ? "glitch-horizontal" : ""}>{displayText}</span>
          <span className="ml-1 inline-block h-3 w-[2px] bg-primary" style={{ animation: "blink-caret 1s step-end infinite" }} aria-hidden="true" />
        </p>
      </div>

      {/* Bottom neon line */}
      <div 
        className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"
        style={{ animation: "pulse-neon 2s infinite" }}
        aria-hidden="true"
      />
    </header>
  )
}
