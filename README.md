# 🤖💥 AI Bugada – Simulador de Falhas Inteligentes

## 👥 Integrantes
- Nome Completo 1 – Matrícula: XXXXXXX  
- Nome Completo 2 – Matrícula: XXXXXXX  
- Nome Completo 3 – Matrícula: XXXXXXX  

---

## 📌 Descrição do Projeto

O **AI Bugada** é uma aplicação web interativa que utiliza um modelo de linguagem (LLM) para simular respostas incorretas, ilógicas e absurdas de forma intencional e divertida.

A proposta do projeto é demonstrar, de maneira criativa, como o comportamento de uma inteligência artificial pode ser controlado por meio de **prompt engineering**, gerando respostas que misturam lógica com incoerência, humor e imprevisibilidade.

O sistema permite ao usuário:
- Inserir perguntas ou frases
- Escolher o nível de “bug” da IA (leve, médio ou caos)
- Receber respostas engraçadas e propositalmente erradas
- Interagir com a IA de forma dinâmica

---

## 🧠 Tecnologias Utilizadas

### 🔙 Backend
- Python  
- FastAPI  
- Ollama (integração com LLM local)  
- Modelo LLM: Llama3

### 🌐 Frontend
- Next.js (React)  
- Tailwind CSS  
- Vercel (v0 para geração de interface)  

### 🔗 Integração
- API REST (FastAPI)  
- Comunicação via HTTP (JSON)  

---

## ⚙️ Instruções de Execução

### 📥 Pré-requisitos
- Python 3.10+  
- Node.js 18+  
- Ollama instalado  

---

### 🤖 1. Instalar e rodar o modelo (Ollama)

```bash
ollama pull llama3
````

ou (mais leve):

```bash
ollama pull phi3
```

---

### 🔙 2. Rodar o Backend

```bash
cd ai-bugada-backend
python -m venv venv
venv\Scripts\activate  # Windows

pip install fastapi uvicorn requests

uvicorn main:app --reload
```

👉 Backend disponível em:

```
http://localhost:8000
```

---

### 🌐 3. Rodar o Frontend

```bash
cd nome-do-frontend
npm install
npm run dev
```

👉 Frontend disponível em:

```
http://localhost:3000
```

---

### 🔌 4. Integração

O frontend consome o endpoint:

```
POST http://localhost:8000/bugada
```

Exemplo de requisição:

```json
{
  "pergunta": "Quanto é 2+2?",
  "nivel": "caos"
}
```

---

## 🚀 Funcionalidades

* Geração de respostas com “falhas inteligentes”
* Níveis de bug (leve, médio, caos)
* Interface interativa e responsiva
* Integração com LLM local via Ollama
* Simulação de comportamento imprevisível de IA

---

## 🎯 Objetivo Acadêmico

Demonstrar o uso prático de modelos de linguagem (LLMs) em aplicações reais, explorando:

* Engenharia de prompts
* Integração frontend + backend
* Uso de IA em sistemas interativos
* Criatividade no desenvolvimento de software

---

## 💡 Observação

Este projeto tem caráter educativo e experimental, com foco em explorar o comportamento de modelos de linguagem de forma criativa e controlada.

```
