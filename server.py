"""
API Flask — liaison avec main.py sans modifier sa structure.
Réutilise les fonctions de main (speak, social_media, modèle NLU, etc.).
"""

import io
import sys
import threading
from contextlib import redirect_stdout

import numpy as np
import psutil
from flask import Flask, jsonify, request
from flask_cors import CORS
from tensorflow.keras.preprocessing.sequence import pad_sequences

import main as jarvis

# Référence à la vraie fonction speak() de main.py (évite la récursion)
_ORIGINAL_SPEAK = jarvis.speak

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Textes capturés pendant une commande (affichés dans l'interface)
_spoken_parts = []
_voice_enabled = True


def _capture_speak(text):
    """Enregistre le texte (la voix est lancée en arrière-plan à la fin)."""
    if text:
        _spoken_parts.append(str(text))


def _start_voice_playback():
    """Lit les réponses à voix haute sans bloquer la réponse HTTP."""
    if not _voice_enabled or not _spoken_parts:
        return 0

    parts = list(_spoken_parts)

    def _run():
        for part in parts:
            _ORIGINAL_SPEAK(part)

    threading.Thread(target=_run, daemon=True).start()
    return sum(len(p) for p in parts) * 85


def get_system_status():
    """Statut CPU / batterie pour les jauges HUD."""
    usage = int(psutil.cpu_percent(interval=0.5))
    battery = psutil.sensors_battery()
    percentage = int(battery.percent) if battery else 0
    plugged = bool(battery.power_plugged) if battery else False

    if percentage >= 70:
        power_message = "Enough power to continue"
    elif percentage >= 30:
        power_message = "Consider charging the laptop"
    else:
        power_message = "Warning: battery is low"

    return {
        "cpu": usage,
        "battery": percentage,
        "plugged": plugged,
        "power_message": power_message,
    }


def execute_command(query, speak=True):
    """
    Exécute la même logique que la boucle if __name__ == "__main__" dans main.py.
    Retourne un dict pour l'interface (texte + synthèse vocale optionnelle).
    """
    global _spoken_parts, _voice_enabled
    _spoken_parts = []
    _voice_enabled = speak

    query = (query or "").strip().lower()
    result = {
        "query": query,
        "response": "",
        "type": "unknown",
        "success": True,
        "exit": False,
        "spoken": speak,
    }

    if not query:
        result["success"] = False
        result["response"] = "Empty command"
        return result

    def say(text):
        _capture_speak(text)
        result["response"] = text

    try:
        if ("facebook" in query) or ("youtube" in query) or ("whatsapp" in query) or ("discord" in query):
            _run_with_captured_speak(lambda: jarvis.social_media(query))
            result["type"] = "social_media"
            if not result["response"]:
                result["response"] = _spoken_parts[-1] if _spoken_parts else f"Opening {query}"

        elif ("university time table" in query) or ("schedule" in query):
            _run_with_captured_speak(jarvis.schedule)
            result["type"] = "schedule"
            if not result["response"]:
                result["response"] = _spoken_parts[-1] if _spoken_parts else "Schedule displayed"

        elif ("volume up" in query) or ("increase volume" in query):
            jarvis.pyautogui.press("volumeup")
            say("volume increased")
            result["type"] = "volume"

        elif ("volume down" in query) or ("decrease volume" in query):
            jarvis.pyautogui.press("volumedown")
            say("volume decreased")
            result["type"] = "volume"

        elif ("volume mute" in query) or ("mute the sound" in query):
            jarvis.pyautogui.press("volumemute")
            say("volume muted")
            result["type"] = "volume"

        elif ("open calculator" in query) or ("open notepad" in query):
            _run_with_captured_speak(lambda: jarvis.openApp(query))
            result["type"] = "app"
            if not result["response"]:
                result["response"] = _spoken_parts[-1] if _spoken_parts else f"Opening {query}"

        elif ("close calculator" in query) or ("close notepad" in query):
            _run_with_captured_speak(lambda: jarvis.closeApp(query))
            result["type"] = "app"
            if not result["response"]:
                result["response"] = _spoken_parts[-1] if _spoken_parts else f"Closing {query}"

        elif ("what" in query) or ("how" in query) or ("hi" in query) or ("thanks" in query) or ("hello" in query) or ("who" in query):
            padded_sequences = pad_sequences(
                jarvis.tokenizer.texts_to_sequences([query]),
                maxlen=20,
                truncating="post",
            )
            pred = jarvis.model.predict(padded_sequences, verbose=0)
            tag = jarvis.label_encoder.inverse_transform([np.argmax(pred)])[0]

            for intent in jarvis.data["intents"]:
                if intent["tag"] == tag:
                    response_text = np.random.choice(intent["responses"])
                    print(response_text)
                    say(response_text)
                    result["type"] = "chat"
                    result["tag"] = tag
                    break

        elif "open google" in query:
            # Évite command() micro (bloquant) : ouverture Google directe
            say("Opening Google for you Boss")
            jarvis.webbrowser.open("https://www.google.com")
            result["type"] = "browser"

        elif ("system  condition" in query) or ("condition of the system" in query):

            def _check_system():
                jarvis.speak("Checking the system condition")
                jarvis.condition()

            _run_with_captured_speak(_check_system)
            result["type"] = "system"
            result["system"] = get_system_status()
            result["response"] = " ".join(_spoken_parts)

        elif "exit" in query:
            say("Program finished")
            result["type"] = "exit"
            result["exit"] = True

        else:
            result["success"] = False
            msg = "Command not recognized. Try hello, schedule, or system condition."
            _capture_speak(msg)
            result["response"] = msg

        if _spoken_parts and not result["response"]:
            result["response"] = " ".join(_spoken_parts)

    except Exception as exc:
        result["success"] = False
        result["response"] = f"Error: {exc}"
        print(result["response"], file=sys.stderr)

    duration = _start_voice_playback()
    if duration:
        result["speak_duration_ms"] = max(1500, duration)

    return result


def _run_with_captured_speak(action):
    """Redirige speak() de main vers _capture_speak le temps d'une action."""
    jarvis.speak = _capture_speak
    try:
        action()
    finally:
        jarvis.speak = _ORIGINAL_SPEAK


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "assistant": "JARVIS"})


@app.route("/api/status", methods=["GET"])
def status():
    return jsonify(get_system_status())


@app.route("/api/command", methods=["POST"])
def command():
    body = request.get_json(silent=True) or {}
    query = body.get("query", "")
    # Par défaut : réponse vocale activée depuis l'interface web
    speak = body.get("speak", True)

    outcome = execute_command(query, speak=speak)
    return jsonify(outcome)


@app.route("/api/welcome", methods=["GET"])
def welcome():
    jarvis.wishMe()
    return jsonify({"response": "Welcome message spoken"})


if __name__ == "__main__":
    print("JARVIS API — http://127.0.0.1:5000")
    print("Liaison active avec main.py (voix + commandes)")
    print("Frontend : cd frontend && npm run dev")
    app.run(host="127.0.0.1", port=5000, debug=False, use_reloader=False)
