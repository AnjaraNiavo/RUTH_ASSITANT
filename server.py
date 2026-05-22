"""
API Flask pour connecter l'interface React à l'assistant JARVIS.
Lancer : python server.py  (depuis le venv, à la racine du projet)
"""

from flask import Flask, jsonify, request
from flask_cors import CORS

import main as jarvis

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "assistant": "JARVIS"})


@app.route("/api/status", methods=["GET"])
def status():
    return jsonify(jarvis.get_system_status())


@app.route("/api/command", methods=["POST"])
def command():
    body = request.get_json(silent=True) or {}
    query = body.get("query", "")
    speak = body.get("speak", False)

    outcome = jarvis.process_command(query, speak_response=speak)
    return jsonify(outcome)


@app.route("/api/welcome", methods=["GET"])
def welcome():
    jarvis.wishMe()
    return jsonify({"response": "Welcome message spoken"})


if __name__ == "__main__":
    print("JARVIS API — http://127.0.0.1:5000")
    print("Lancez le frontend : cd frontend && npm run dev")
    app.run(host="127.0.0.1", port=5000, debug=False, use_reloader=False)
