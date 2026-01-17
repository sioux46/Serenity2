#!/usr/bin/env python2
# -*- coding: utf-8 -*-

import os
import sys
import json
import cgi
import urllib2

# CGI headers
print "Content-Type: text/plain; charset=utf-8"
print ""

try:
    # Lecture POST
    form = cgi.FieldStorage()

    chatBuffer = json.loads(form.getvalue("chatBuffer", "[]"))
    model = json.loads(form.getvalue("model", "\"mistral-large-latest\""))
    temperature = json.loads(form.getvalue("temperature", "0"))
    style = json.loads(form.getvalue("style", "\"\""))
    details = json.loads(form.getvalue("details", "\"\""))

    # Clé API
    api_key = os.environ.get("MISTRAL_API_KEY")
    if not api_key:
        print "Error: Missing MISTRAL_API_KEY"
        sys.exit(1)

    url = "https://api.mistral.ai/v1/chat/completions"

    payload = {
        "model": "mistral-large-latest",
        "messages": chatBuffer,
        "max_tokens": 1000,
        "temperature": temperature
    }

    data = json.dumps(payload)

    request = urllib2.Request(url, data)
    request.add_header("Content-Type", "application/json")
    request.add_header("Authorization", "Bearer " + api_key)

    response = urllib2.urlopen(request, timeout=30)
    response_data = json.loads(response.read())

    # Extraction réponse assistant
    if ("choices" in response_data and
        len(response_data["choices"]) > 0 and
        "message" in response_data["choices"][0] and
        "content" in response_data["choices"][0]["message"]):

        print response_data["choices"][0]["message"]["content"]
    else:
        print "Error: Invalid API response"

except Exception as e:
    print "Error:", str(e)
