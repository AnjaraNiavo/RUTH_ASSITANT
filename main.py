
import webbrowser
import pyttsx3
import speech_recognition as sr
import datetime
import webbrowser
import time
import pyautogui
import os
import sys
import json
import pickle
import random
import numpy as np
import psutil

'''from elevenlabs import generate, play
from elevenlabs import set_api_key
from api_key import api_key_data
'''
from os import system
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences


#set_api_key(api__key_data)


with open("intents.json") as file:
    data = json.load(file)


model = load_model("chat_models.h5")

with open("tokenizer.pkl","rb") as f:
    tokenizer = pickle.load(f)

with open("label_encoder.pkl","rb") as encoder_file:
    label_encoder = pickle.load(encoder_file)


def initialize_engine ():
    #sapi5 : Speech API version 5
    engine = pyttsx3.init("sapi5")
    voices = engine.getProperty("voices")
    engine.setProperty('voice',voices[1].id)

    #Vitesse de la voix
    rate = engine.getProperty('rate')
    engine.setProperty('rate',rate-50)

    #volume
    
    engine.setProperty('volume', 0.25)

    return engine

def speak(text):
    engine = initialize_engine()
    engine.say(text)
    engine.runAndWait()

# Commande pour ecoute
def command ():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        #adjust for the noise like ventilator
        r.adjust_for_ambient_noise(source, duration = 0.5)
        print("Listening ....", end="",flush=True
        )

        r.pause_threshold = 2
        r.phrase_threshold = 0.3
        r.operation_timeout = 5
        r.non_speaking_duration = 0.5
        r.dynamic_energy_threshold = 0.8
        r.energy_threshold  = 4000
        

        #print(sr.Microphone.list_microphine_names())
        audio = r.listen(source,phrase_time_limit = 5)

        try:

            print("Recognizing ....", end="", flush=True)
            query =r.recognize_google (audio, language = "en-in")
            print("\r", end="",flush=True)

        except Exception as e:
            print("Say that again please")
            return None

        return query


def call_day():
    day = datetime.datetime.today().weekday() + 1
    day_dict = {
        1:"Monday",
        2: "Tuesday",
        3:"Wednesday",
        4: "Thursday",
        5:"Friday",
        6:"Satursday",
        7:"Sunday"
    }

    if day in day_dict.keys():
        day_of_week = day_dict[day]
        print(day_of_week)

    return day_of_week

def wishMe():
    hour = int(datetime.datetime.now().hour)
    t = time.strftime("%I:%M %p")
    day = call_day()

    if (hour >= 0) and (hour <= 12) and ('AM' in t):
        speak(f"Good morning Sir, it's {day} and the time is {t}")

    elif(hour >= 12) and (hour <= 16) and ('AM' in t):

        speak(f"Good afternoon Sir, it's {day} and the time is {t}")

    else:
        speak(f"Good evening Sir, it's {day} and the time is {t}")


def social_media(command):
    if 'facebook' in command:
        speak(f'Opening your facebook')
        print(f"Facebook is opening")
        webbrowser.open("https://www.facebook.com/")

    elif 'youtube' in command:
        speak(f'Opening your youtube')
        print(f"Youtube is opening")
        webbrowser.open("https://www.youtube.com/")

    elif 'discord' in command:
        speak(f'Opening your discord server')
        print(f"Discord server is opening")
        webbrowser.open("https://discord.com/")

    elif 'whatsapp' in command:
        speak(f'Opening your whatsapp')
        print(f"whatsapp is opening")
        webbrowser.open("https://www.whatsapp.com/")

    else:
        speak(f"Invalid command")
        print(f"Try again.....")

def schedule():

    day = call_day().lower()

    week_day= {
        "monday": "Boss, from 9:00 am to 9:50 pm you've have an Java course",
        "tuesday": "Boss, from 10:00 am to 12: 50 pm you've have an Python course",
        "wendnesday": "Boss, from 7:00 am to 8:00 pm you've have an Java course",
        "thursday": "Boss, from 3:00 am to 17:00 pm you've have an Java course",
        "Friday": "Boss, from 16: 00 pm to 20: 00 pm you've have an Java course",
        "saturday": "Boss, from 9:00 am to 9:50pm you've have an Java course",
        "sunday": "Boss, from 9:00 am to 9: 01 am you've have an Java course"
    }

    if day in week_day.keys():
        print(f"{day} ..> {week_day[day]}")
        speak(week_day[day])

def openApp(command):
    if "calculator" in command:
        speak(f"opening calculator")
        os.startfile('C:\Windows\System32\calc.exe')

    
    elif "notepad" in command:
        speak(f"opening Notepad")
        os.startfile('C:\\Windows\\System32\\notepad.exe')


def closeApp(command):

    if "calculator" in command:
        speak(f"Closing calculator")
        os.system('taskkill /f /im CalculatorApp.exe')
    
    elif "notepad" in command:
        speak(f"closing Notepad")
        os.system('taskkill /f /im notepad.exe')
        

def browsing(query):
    if 'google' in query:
        speak("Boss, what can I help you?")
        search = command()
        webbrowser.open(f"{search}")

def condition ():
    usage =  int(psutil.cpu_percent())
    print(f"CPU is at {usage} %")
    speak(f"CPU is at {usage} %")

    battery = psutil.sensors_battery()
    percentage = battery.percent
    print(f"Boss you're battery is {percentage}%")
    speak(f"Boss you're battery is {percentage}%")

    if (percentage >= 70 ):
        print(f"And we have enough power to continue our conversation")
        speak(f"Boss we have enough power to continue our conversation")

    elif ( percentage >= 30 ):
        print(f" we need to charge our laptop")
        speak(f" we need to charge our laptop")

    else :
        print (f"Warning ... you are running of your battery")
        speak (f"Warning ... you are running of your battery")


'''def engine_talk(query):
    audio = generate(
        text = query,
        voice_id= "7NcHAzFqfCpxFyONh7M8",
        model= "eleven_nonolinual_v1"
    )'''

if __name__ == "__main__":
    wishMe()
    
    while True:
        #query = command().lower()
        query = input("Enter your command: ").lower()
        if ('facebook' in query) or ('youtube' in query) or ('whatsapp' in query) or ('discord' in query):
            social_media (query)

        elif ('university time table' in query) or ("schedule" in query):
            schedule()

        elif ("volume up" in query) or ("increase volume" in query):
            pyautogui.press("volumeup")
            speak("volume increased")

        elif ("volume down" in query) or ("decrease volume" in query):
            pyautogui.press("volumedown")
            speak("volume decreased")

        elif ("volume mute" in query) or ("mute the sound" in query):
            pyautogui.press("volumemute")
            speak("volume muted")

        elif ("open calculator" in query) or("open notepad" in query):
    
            openApp(query)
        
        elif ("close calculator" in query) or("close notepad" in query):
    
            closeApp(query)

        elif ("what" in query) or ("how" in query) or ("hi" in query) or ("thanks" in query) or ("hello" in query) or ("who" in query):
            padded_sequences = pad_sequences(tokenizer.texts_to_sequences([query]),maxlen= 20, truncating='post')
            result = model.predict(padded_sequences)
            tag = label_encoder.inverse_transform([np.argmax(result)])[0]

            for i in data['intents']:
                if i['tag'] == tag:
                    print(np.random.choice(i['responses']))
                    speak(np.random.choice(i['responses']))

        elif ("open google" in query) :
            browsing(query)
                    
        elif ("system z condition" in query) or ("condition of the system" in query):
            speak("Checking the system condition")
            condition() 

        elif "exit" in query:
            speak("Programm finished")
            sys.exit()

    
        



