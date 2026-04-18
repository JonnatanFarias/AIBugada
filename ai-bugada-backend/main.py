from fastapi import FastAPI
from pydantic import BaseModel
from services.ollama_service import gerar_resposta
from prompts.bug_prompts import gerar_prompt
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",  # Next.js local
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # quem pode acessar
    allow_credentials=True,
    allow_methods=["*"],  # GET, POST, etc
    allow_headers=["*"],
)

class Pergunta(BaseModel):
    pergunta: str
    nivel: str = "medio"

@app.post("/bugada")
def responder(dados: Pergunta):
    prompt = gerar_prompt(dados.pergunta, dados.nivel)
    try:
        resposta = gerar_resposta(prompt)
    except Exception:
        resposta = "A AI Bugada bugou de verdade dessa vez 😵"

    print(f"Pergunta: {dados.pergunta} | Nivel: {dados.nivel}")

    return {
        "pergunta": dados.pergunta,
        "nivel": dados.nivel,
        "resposta": resposta
    }

@app.get("/health")
def health():
    return {"status": "AI Bugada funcionando (mais ou menos)"}


