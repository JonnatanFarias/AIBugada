import requests

def gerar_resposta(prompt, model="llama3"):
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": model,
            "prompt": prompt,
            "stream": False,
            "options": {
                "temperature": 0.9,
                "num_predict": 80
            }
        },
        timeout=60
    )

    data = response.json()
    return data.get("response", "Bug até na resposta 😵")