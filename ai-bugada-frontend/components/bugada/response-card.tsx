"use client"

import { useState, useEffect, useRef } from "react"
import { Copy, Check, AlertTriangle } from "lucide-react"

interface ResponseCardProps {
  resposta: string
  loading: boolean
}

const loadingMessages = [
  "Corrompendo resposta...",
  "Consultando fontes duvidosas...",
  "Embaralhando neurônios...",
  "Ignorando fatos...",
  "Inventando dados...",
  "Confundindo lógica...",
]

export function ResponseCard({ resposta, loading }: ResponseCardProps) {
  const [copied, setCopied] = useState(false)
  const [loadingMsg, setLoadingMsg] = useState(loadingMessages[0])
  const [charIndex, setCharIndex] = useState(0)
  const [isGlitching, setIsGlitching] = useState(false)
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 })
  const responseRef = useRef<HTMLParagraphElement>(null)

  // Typing animation
  useEffect(() => {
    if (loading || !resposta) {
      setCharIndex(0)
      return
    }
    
    if (charIndex < resposta.length) {
      const timer = setTimeout(() => {
        setCharIndex(prev => Math.min(prev + 2, resposta.length))
      }, 15)
      return () => clearTimeout(timer)
    }
  }, [resposta, charIndex, loading])

  // Reset char index when response changes
  useEffect(() => {
    setCharIndex(0)
  }, [resposta])

  // Rotating loading messages
  useEffect(() => {
    if (!loading) return
    const interval = setInterval(() => {
      setLoadingMsg(loadingMessages[Math.floor(Math.random() * loadingMessages.length)])
    }, 1500)
    return () => clearInterval(interval)
  }, [loading])

  // Random glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setIsGlitching(true)
        setGlitchOffset({
          x: (Math.random() - 0.5) * 6,
          y: (Math.random() - 0.5) * 4,
        })
        setTimeout(() => {
          setIsGlitching(false)
          setGlitchOffset({ x: 0, y: 0 })
        }, 100)
      }
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const handleCopy = async () => {
    if (!resposta) return
    await navigator.clipboard.writeText(resposta)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!loading && !resposta) return null

  const displayedText = resposta.slice(0, charIndex)
  const isTyping = charIndex < resposta.length && !loading

  return (
    <div 
      className={`relative overflow-hidden rounded-2xl border bg-card transition-all duration-100 ${
        isGlitching 
          ? "border-glitch-red neon-glow-purple" 
          : "border-primary/30 border-glow-pulse"
      }`}
      style={isGlitching ? { transform: `translate(${glitchOffset.x}px, ${glitchOffset.y}px)` } : undefined}
    >
      {/* CRT effect overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 crt-effect" aria-hidden="true" />
      
      {/* Header bar */}
      <div className="relative flex items-center justify-between border-b border-border/50 bg-muted/50 px-4 py-2">
        <div className="flex items-center gap-2">
          {/* Animated dots */}
          <span className="relative h-2.5 w-2.5">
            <span className="absolute inset-0 rounded-full bg-destructive" style={{ animation: "pulse-neon 1s infinite" }} />
            <span className="absolute inset-0 rounded-full bg-destructive animate-ping opacity-50" />
          </span>
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" style={{ animation: "flicker 3s infinite" }} />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
          <span className="ml-2 font-mono text-xs text-muted-foreground glitch-horizontal">
            neural_output.exe
          </span>
          {loading && (
            <span className="ml-2 font-mono text-[10px] text-primary animate-pulse">[PROCESSANDO]</span>
          )}
        </div>
        {!loading && resposta && (
          <button
            onClick={handleCopy}
            className="group relative flex items-center gap-1.5 overflow-hidden rounded-lg border border-border px-3 py-1 font-mono text-xs text-muted-foreground transition-all hover:border-primary hover:text-primary active:scale-95"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/10 to-transparent transition-transform duration-300 group-hover:translate-x-full" />
            {copied ? (
              <>
                <Check className="h-3 w-3 text-green-400" />
                <span className="text-green-400">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                Copiar
              </>
            )}
          </button>
        )}
      </div>

      {/* System message with animation */}
      <div className="relative overflow-hidden border-b border-border/30 bg-primary/5 px-4 py-2">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10"
          style={{ animation: "shimmer 2s linear infinite" }}
          aria-hidden="true"
        />
        <p className="relative font-mono text-xs text-primary/70 flex items-center gap-2">
          {loading ? (
            <>
              <span className="inline-block h-2 w-2 rounded-full bg-primary" style={{ animation: "pulse-neon 0.5s infinite" }} />
              <span className="glitch-skew">{loadingMsg}</span>
            </>
          ) : (
            <>
              <AlertTriangle className="h-3 w-3" />
              <span>Aviso: conteúdo 100% não confiável</span>
            </>
          )}
        </p>
      </div>

      {/* Response body */}
      <div className="relative p-4 sm:p-6">
        {loading ? (
          <div className="flex flex-col gap-4">
            {/* Glitchy spinner */}
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8 flex-shrink-0">
                <div className="absolute inset-0 rounded-full border-2 border-primary/30" />
                <div 
                  className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent"
                  style={{ animation: "spin 0.6s linear infinite" }}
                />
                <div 
                  className="absolute inset-1 rounded-full border border-secondary/50 border-b-transparent"
                  style={{ animation: "spin 0.8s linear infinite reverse" }}
                />
                {/* Glitch flash */}
                {isGlitching && (
                  <div className="absolute inset-0 rounded-full bg-glitch-red/30" />
                )}
              </div>
              <div className="flex flex-col">
                <p className="font-mono text-sm text-foreground">{loadingMsg}</p>
                <p className="font-mono text-[10px] text-muted-foreground">pid: {Math.floor(Math.random() * 9999)}</p>
              </div>
            </div>
            
            {/* Skeleton lines with glitch */}
            <div className="space-y-2">
              {[0.75, 1, 0.6, 0.85, 0.5].map((width, i) => (
                <div 
                  key={i}
                  className="h-3 rounded bg-muted"
                  style={{ 
                    width: `${width * 100}%`,
                    animation: `pulse 1s ease-in-out infinite, horizontal-glitch ${6 + i}s infinite`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>

            {/* Fake progress bar */}
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-primary"
                style={{ 
                  width: "60%",
                  animation: "shimmer 1.5s linear infinite",
                  backgroundSize: "200% 100%",
                }}
              />
            </div>
          </div>
        ) : (
          <div className="flex gap-3">
            {/* Animated robot icon */}
            <div className="relative mt-0.5 flex-shrink-0">
              <span className={`text-2xl transition-transform ${isGlitching ? "scale-110" : ""}`}>🤖</span>
              {isGlitching && (
                <span 
                  className="absolute inset-0 text-2xl opacity-50" 
                  style={{ transform: "translate(2px, -1px)", filter: "hue-rotate(90deg)" }}
                  aria-hidden="true"
                >
                  🤖
                </span>
              )}
            </div>
            <div className="flex-1">
              <p 
                ref={responseRef}
                className="font-mono text-sm leading-relaxed text-foreground whitespace-pre-wrap"
              >
                {displayedText}
                {isTyping && (
                  <span 
                    className="ml-0.5 inline-block h-4 w-[2px] bg-primary align-middle"
                    style={{ animation: "blink-caret 0.5s step-end infinite" }}
                    aria-hidden="true"
                  />
                )}
              </p>
              {/* Confidence meter (fake) */}
              {!isTyping && (
                <div className="mt-4 flex items-center gap-2">
                  <span className="font-mono text-[10px] text-muted-foreground">Confiança:</span>
                  <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-destructive via-yellow-500 to-green-500"
                      style={{ width: `${Math.floor(Math.random() * 30 + 70)}%` }}
                    />
                  </div>
                  <span className="font-mono text-[10px] text-destructive">(incorreta)</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Scanlines */}
      <div className="pointer-events-none absolute inset-0 scanlines" aria-hidden="true" />
      
      {/* Random glitch bar */}
      {isGlitching && (
        <div 
          className="pointer-events-none absolute left-0 right-0 h-2 bg-glitch-red/20"
          style={{ top: `${Math.random() * 100}%` }}
          aria-hidden="true"
        />
      )}

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 vignette" aria-hidden="true" />
    </div>
  )
}
