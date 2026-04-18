"use client"

import { useState, useEffect } from "react"
import { Clock, Database, Trash2 } from "lucide-react"

export interface HistoryItem {
  pergunta: string
  resposta: string
  nivel: string
  timestamp: Date
}

interface HistoryListProps {
  items: HistoryItem[]
}

const nivelBadge: Record<string, string> = {
  leve: "text-green-400 border-green-400/40 bg-green-400/10",
  medio: "text-yellow-400 border-yellow-400/40 bg-yellow-400/10",
  severo: "text-orange-400 border-orange-400/40 bg-orange-400/10",
  caos: "text-destructive border-destructive/40 bg-destructive/10",
}

const nivelLabel: Record<string, string> = {
  leve: "Leve",
  medio: "Médio",
  severo: "Severo",
  caos: "CAOS",
}

export function HistoryList({ items }: HistoryListProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [glitchIndex, setGlitchIndex] = useState<number | null>(null)

  // Random glitch on history items
  useEffect(() => {
    const interval = setInterval(() => {
      if (items.length > 0 && Math.random() > 0.8) {
        const randomIndex = Math.floor(Math.random() * items.length)
        setGlitchIndex(randomIndex)
        setTimeout(() => setGlitchIndex(null), 150)
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [items.length])

  if (items.length === 0) return null

  return (
    <div className="mt-8">
      {/* Header with animated underline */}
      <div className="relative mb-4">
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4 text-primary" style={{ animation: "pulse-neon 2s infinite" }} />
          <h2 className="font-mono text-sm font-semibold text-foreground uppercase tracking-widest">
            Histórico de falhas
          </h2>
          <span className="ml-auto font-mono text-[10px] text-muted-foreground">
            {items.length} registro{items.length !== 1 ? "s" : ""}
          </span>
        </div>
        <div 
          className="absolute -bottom-1 left-0 h-[1px] w-full bg-gradient-to-r from-primary via-secondary to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* History items */}
      <div className="flex flex-col gap-3">
        {items.map((item, i) => {
          const isGlitching = glitchIndex === i
          const isHovered = hoveredIndex === i
          
          return (
            <div
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative overflow-hidden rounded-xl border bg-card p-4 transition-all duration-200 ${
                isGlitching 
                  ? "border-glitch-red glitch-horizontal" 
                  : isHovered 
                    ? "border-primary/50 neon-border-purple" 
                    : "border-border hover:border-border/80"
              }`}
              style={isGlitching ? { 
                transform: `translate(${Math.random() * 4 - 2}px, ${Math.random() * 2 - 1}px)` 
              } : undefined}
            >
              {/* Animated background on hover */}
              <div 
                className={`absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 transition-opacity duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden="true"
              />

              {/* Scan line effect on hover */}
              {isHovered && (
                <div 
                  className="absolute inset-0 pointer-events-none"
                  aria-hidden="true"
                >
                  <div 
                    className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                    style={{ animation: "scan-line-move 2s linear infinite" }}
                  />
                </div>
              )}

              {/* Content */}
              <div className="relative">
                {/* Top row: question + metadata */}
                <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                  <div className="flex items-center gap-2 max-w-[60%]">
                    <span className="font-mono text-[10px] text-primary opacity-50">Q:</span>
                    <p className="truncate font-mono text-xs font-medium text-foreground">
                      {item.pergunta}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full border px-2 py-0.5 font-mono text-[10px] ${nivelBadge[item.nivel]}`}
                    >
                      {nivelLabel[item.nivel]}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {item.timestamp.toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                {/* Response preview */}
                <div className="flex items-start gap-2">
                  <span className="font-mono text-[10px] text-secondary opacity-50">R:</span>
                  <p className={`line-clamp-2 font-mono text-xs text-muted-foreground leading-relaxed ${
                    isGlitching ? "glitch-rgb" : ""
                  }`}>
                    {item.resposta}
                  </p>
                </div>

                {/* Decorative corner */}
                <div 
                  className="absolute -bottom-2 -right-2 h-6 w-6 border-b border-r border-border/30 opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                />
              </div>

              {/* Hover action hint */}
              <div 
                className={`absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 font-mono text-[9px] text-muted-foreground transition-all ${
                  isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
                }`}
              >
                <Trash2 className="h-3 w-3" />
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer decoration */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-border" />
        <span className="font-mono text-[9px] text-muted-foreground/50 data-corrupt">
          cache: corrupted
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-border" />
      </div>
    </div>
  )
}
