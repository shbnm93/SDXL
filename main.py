import json
import os
import random
import math

import requests
from flask import Flask, request, render_template

app = Flask(__name__)


def random_number():
    return math.floor(random.random() * 99999999999999 + 1)


@app.get("/")
def index():
    # Returns index.html
    return render_template("index.html")


@app.post("/api")
def api():
    # Get the request from Body
    prompt = request.json["prompt"]
    negativePrompt = request.json["negativePrompt"]
    model = request.json["model"]

    print(prompt, negativePrompt, model)

    response = requests.post(
        f"https://api.segmind.com/v1/{model}",
        headers={
            "x-api-key": os.getenv("SG_396311d270ffbbc1"),
            "Content-Type": "application/json",
        },
        data=json.dumps({
            "prompt": prompt,
            "negative_prompt": negativePrompt,
            "samples": 1,
            "scheduler": "UniPC",
            "num_inference_steps": 25,
            "guidance_scale": 7.5,
            "img_width": 1024,
            "img_height": 1024,
            "seed": random_number(),
        }),
    )

    # Response is image
    return response.content


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
