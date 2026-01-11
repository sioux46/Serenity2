#!/usr/bin/env python3

import os
import requests
import json
import cgi

API_KEY = os.getenv("OPENAI_API_KEY")
URL = "https://api.openai.com/v1/responses"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

form = cgi.FieldStorage()

messages = json.loads(form.getvalue("chatBuffer"))
model = "gpt-4o"   # ou "gpt-5"
temperature = 0.7

# Conversion messages -> texte
input_text = ""
for m in messages:
    input_text += f"{m['role'].upper()}: {m['content']}\n"

print(input_text)


payload = {
    "model": model,
    "input": input_text,
    "max_output_tokens": 1000,
    "temperature": temperature
}

response = requests.post(URL, headers=headers, json=payload)
response.raise_for_status()

data = response.json()

# Extraction texte
output = ""
for item in data["output"]:
    if item["type"] == "message":
        for c in item["content"]:
            if c["type"] == "output_text":
                output += c["text"]

print(output)
