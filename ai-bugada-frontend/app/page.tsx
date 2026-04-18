"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/bugada/header"
import { InputForm, type Nivel } from "@/components/bugada/input-form"
import { ResponseCard } from "@/components/bugada/response-card"
import { HistoryList, type HistoryItem } from "@/components/bugada/history-list"
import { GlitchEffectsProvider } from "@/components/bugada/glitch-effects"

const MAX_HISTORY = 3

export default function Home() {
  const [pergunta, setPergunta] = useState("")
  const [nivel, setNivel] = useState<Nivel>("leve")
  const [resposta, setResposta] = useState("")
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const sendRequest = async (p: string, n: Nivel) => {
    if (!p.trim()) return
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("http://localhost:8000/bugada", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pergunta: p, nivel: n }),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const data = await res.json()
      const novaResposta: string = data.resposta

      setResposta(novaResposta)
      setHistory((prev) => [
        { pergunta: p, resposta: novaResposta, nivel: n, timestamp: new Date() },
        ...prev,
      ].slice(0, MAX_HISTORY))
    } catch (err) {
      console.error("[v0] Erro ao chamar /bugada:", err)
      setError("Falha ao conectar com o backend. Certifique-se que http://localhost:8000 está rodando.")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = () => {
    sendRequest(pergunta, nivel)
  }

  const handlePiorar = () => {
    if (!resposta) return
    sendRequest(resposta, "caos")
  }

  return (
    <GlitchEffectsProvider
      enableOverlay={mounted}
      enableScanline={mounted}
      enableCorruption={mounted}
      enableTear={mounted}
    >
      <div className="relative flex min-h-screen flex-col overflow-hidden">
        {/* Background grid pattern */}
        <div 
          className="pointer-events-none fixed inset-0 z-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(oklch(0.62 0.26 300 / 0.5) 1px, transparent 1px),
              linear-gradient(90deg, oklch(0.62 0.26 300 / 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
          aria-hidden="true"
        />

        {/* Radial gradient spotlight */}
        <div 
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            background: "radial-gradient(circle at 50% 0%, oklch(0.62 0.26 300 / 0.08) 0%, transparent 50%)",
          }}
          aria-hidden="true"
        />

        <Header />

        <main className="relative z-10 flex-1 px-4 py-8 sm:py-12">
          <div className="mx-auto max-w-2xl">

            {/* Hero tagline with glitch */}
            <div className="mb-8 text-center">
              <p className="inline-block font-mono text-sm text-muted-foreground holo-shimmer rounded-lg px-4 py-2">
                A IA mais confiante do mundo. E também a mais errada.
              </p>
            </div>

            {/* Input section */}
            <section className="relative rounded-2xl border border-border bg-card p-5 sm:p-6 border-glow-pulse noise-overlay">
              <InputForm
                pergunta={pergunta}
                nivel={nivel}
                loading={loading}
                onChange={setPergunta}
                onNivelChange={setNivel}
                onSubmit={handleSubmit}
                onPiorar={handlePiorar}
                hasResponse={!!resposta}
              />
            </section>

            {/* Error state with animation */}
            {error && (
              <div className="mt-4 overflow-hidden rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 glitch-horizontal">
                <p className="font-mono text-sm text-destructive flex items-center gap-2">
                  <span className="inline-block animate-pulse">!!</span>
                  {error}
                </p>
              </div>
            )}

            {/* Response */}
            {(loading || resposta) && (
              <div className="mt-6 transition-all duration-300">
                <ResponseCard resposta={resposta} loading={loading} />
              </div>
            )}

            {/* History */}
            {history.length > 0 && (
              <HistoryList items={history} />
            )}
          </div>
        </main>

        {/* Footer with effects */}
        <footer className="relative z-10 border-t border-border bg-card/50 py-4 text-center crt-effect">
          <p className="font-mono text-xs text-muted-foreground">
            <span className="text-pop">AI Bugada</span>
            <span className="mx-2 text-primary">|</span>
            Simulador de Falhas Inteligentes
          </p>
          <p className="mt-1 font-mono text-[10px] text-muted-foreground/50 data-corrupt">
            v0.0.error • uptime: {Math.floor(Math.random() * 999)}ms • erros: infinito
          </p>
        </footer>

        {/* Corner decorations */}
        <div 
          className="pointer-events-none fixed bottom-4 right-4 z-20 font-mono text-[10px] text-primary/30"
          style={{ writingMode: "vertical-rl" }}
          aria-hidden="true"
        >
          SYSTEM_CORRUPT_v0.error
        </div>
      </div>
    </GlitchEffectsProvider>
  )
}
