"use client"

import { useState, useEffect } from "react"
import { Zap, Skull, AlertCircle } from "lucide-react"

export type Nivel = "leve" | "medio" | "severo" | "caos"

interface InputFormProps {
  pergunta: string
  nivel: Nivel
  loading: boolean
  onChange: (value: string) => void
  onNivelChange: (nivel: Nivel) => void
  onSubmit: () => void
  onPiorar: () => void
  hasResponse: boolean
}

const nivelConfig: Record<Nivel, { label: string; color: string; description: string }> = {
  leve: { label: "Leve", color: "text-green-400", description: "Erros sutis e plausíveis" },
  medio: { label: "Médio", color: "text-yellow-400", description: "Mentiras convincentes" },
  severo: { label: "Severo", color: "text-orange-400", description: "Absurdos elaborados" },
  caos: { label: "CAOS", color: "text-destructive", description: "Loucura total" },
}

const placeholders = [
  "Digite algo para quebrar a IA...",
  "Faça uma pergunta (resposta errada garantida)...",
  "Insira dados para corrupção...",
  "Alimente a confusão...",
  "Qual sua dúvida? (Certeza de erro)",
]

export function InputForm({
  pergunta,
  nivel,
  loading,
  onChange,
  onNivelChange,
  onSubmit,
  onPiorar,
  hasResponse,
}: InputFormProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [buttonGlitch, setButtonGlitch] = useState(false)
  const [placeholder, setPlaceholder] = useState(placeholders[0])

  // Rotate placeholders
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholder(placeholders[Math.floor(Math.random() * placeholders.length)])
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Random button glitch
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        setButtonGlitch(true)
        setTimeout(() => setButtonGlitch(false), 150)
      }
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSubmit()
    }
  }

  const currentNivel = nivelConfig[nivel]

  return (
    <div className="flex flex-col gap-5">
      {/* Textarea with enhanced effects */}
      <div className="relative group">
        {/* Glow effect behind */}
        <div 
          className={`absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50 opacity-0 blur transition-opacity duration-300 ${
            isFocused ? "opacity-100" : "group-hover:opacity-50"
          }`}
          aria-hidden="true"
        />
        
        <div className="relative">
          <textarea
            value={pergunta}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            rows={3}
            maxLength={500}
            className={`w-full resize-none rounded-xl border bg-input px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-200 ${
              isFocused 
                ? "border-primary ring-2 ring-primary/30" 
                : "border-border hover:border-primary/50"
            }`}
          />
          
          {/* Character counter with warning */}
          <div className={`absolute bottom-2 right-3 font-mono text-xs transition-colors ${
            pergunta.length > 450 ? "text-destructive" : "text-muted-foreground"
          }`}>
            {pergunta.length > 450 && <AlertCircle className="mr-1 inline h-3 w-3" />}
            {pergunta.length}/500
          </div>

          {/* Typing indicator line */}
          {isFocused && (
            <div 
              className="absolute bottom-0 left-4 right-4 h-[2px] overflow-hidden rounded-full"
              aria-hidden="true"
            >
              <div 
                className="h-full w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent"
                style={{ animation: "shimmer 2s linear infinite" }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Nivel selector - segmented control style */}
      <div>
        <label className="mb-2 flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <Skull className="h-3 w-3" />
          Nível de desinformação:
        </label>
        <div className="flex rounded-xl border border-border bg-muted/30 p-1">
          {(Object.keys(nivelConfig) as Nivel[]).map((key) => {
            const config = nivelConfig[key]
            const isSelected = nivel === key
            return (
              <button
                key={key}
                onClick={() => onNivelChange(key)}
                className={`group relative flex-1 rounded-lg px-3 py-2 font-mono text-xs transition-all duration-200 ${
                  isSelected 
                    ? "bg-card text-foreground shadow-md" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {/* Glow for selected */}
                {isSelected && (
                  <div 
                    className="absolute inset-0 rounded-lg neon-border-purple"
                    aria-hidden="true"
                  />
                )}
                <span className={`relative ${config.color}`}>
                  {config.label}
                </span>
                {/* Tooltip on hover */}
                <span className="pointer-events-none absolute -bottom-8 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded bg-popover px-2 py-1 text-[10px] text-popover-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                  {config.description}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row">
        {/* Primary submit button */}
        <button
          onClick={onSubmit}
          disabled={loading || !pergunta.trim()}
          className={`group relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl border border-primary bg-primary px-6 py-3 font-mono text-sm font-bold text-primary-foreground transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
            buttonGlitch ? "glitch-rgb" : ""
          } ${!loading && pergunta.trim() ? "hover:scale-[1.02] active:scale-95" : ""}`}
          style={buttonGlitch ? { transform: `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)` } : undefined}
        >
          {/* Animated background */}
          <span 
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full"
            aria-hidden="true"
          />
          
          {/* Neon glow */}
          <span 
            className="absolute inset-0 opacity-50 neon-glow-purple"
            aria-hidden="true"
          />
          
          {loading ? (
            <>
              <span className="relative inline-block" style={{ animation: "spin 0.5s linear infinite" }}>
                <Zap className="h-4 w-4" />
              </span>
              <span className="relative glitch-skew">Corrompendo...</span>
            </>
          ) : (
            <>
              <Zap className="relative h-4 w-4" />
              <span className="relative">Quebrar a IA</span>
            </>
          )}
        </button>

        {/* Secondary worsen button */}
        <button
          onClick={onPiorar}
          disabled={loading || !hasResponse}
          className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl border border-secondary bg-secondary/10 px-6 py-3 font-mono text-sm font-bold text-secondary transition-all duration-200 hover:bg-secondary/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
        >
          {/* Animated border */}
          <span 
            className="absolute inset-0 rounded-xl opacity-0 transition-opacity group-hover:opacity-100 neon-border-blue"
            aria-hidden="true"
          />
          <Skull className="relative h-4 w-4" />
          <span className="relative">Piorar resposta</span>
        </button>
      </div>

      {/* Fun warning message */}
      <p className="text-center font-mono text-[10px] text-muted-foreground/70 data-corrupt">
        Aviso: todas as respostas são intencionalmente incorretas
      </p>
    </div>
  )
}
