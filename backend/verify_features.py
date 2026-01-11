import requests
import json
import jwt
import os
from dotenv import load_dotenv

load_dotenv()

CLERK_ISSUER_URL = os.getenv("CLERK_ISSUER_URL")
# Helper to get kid
try:
    jwks = requests.get(f"{CLERK_ISSUER_URL}/.well-known/jwks.json").json()
    kid = jwks["keys"][0]["kid"]
except:
    kid = "unknown"

headers_jwt = {"kid": kid}
token = jwt.encode({"sub": "debug_user_features"}, "secret", algorithm="HS256", headers=headers_jwt)

base_url = "http://localhost:8000/api"
headers = {"Authorization": f"Bearer {token}"}

def test_quiz(topic):
    print(f"\n--- Testing Quiz ({topic}) ---")
    try:
        response = requests.post(f"{base_url}/quiz/", json={"topic": topic, "difficulty": "easy"}, headers=headers)
        if response.status_code == 200:
            data = response.json()
            print(f"Title: {data.get('title')}")
            print(f"Questions: {len(data.get('questions', []))}")
            if data['questions']:
                print(f"Sample: {data['questions'][0]['question']}")
        else:
            print(f"Failed: {response.text}")
    except Exception as e:
        print(f"Error: {e}")

def test_flashcards(topic):
    print(f"\n--- Testing Flashcards ({topic}) ---")
    try:
        response = requests.post(f"{base_url}/flashcards/", json={"topic": topic}, headers=headers)
        if response.status_code == 200:
            data = response.json()
            print(f"Flashcards: {len(data.get('flashcards', []))}")
            if data['flashcards']:
                print(f"Sample: {data['flashcards'][0]['front']} -> {data['flashcards'][0]['back']}")
        else:
            print(f"Failed: {response.text}")
    except Exception as e:
        print(f"Error: {e}")

test_quiz("Solar System")
test_flashcards("Python Lists")
