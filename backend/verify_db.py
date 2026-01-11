import requests
import json
import jwt
import os
from dotenv import load_dotenv

load_dotenv()

CLERK_ISSUER_URL = os.getenv("CLERK_ISSUER_URL")
# Helper to get kid (simplified from debug_ai.py)
try:
    jwks = requests.get(f"{CLERK_ISSUER_URL}/.well-known/jwks.json").json()
    kid = jwks["keys"][0]["kid"]
except:
    kid = "unknown"

headers_jwt = {"kid": kid}
token = jwt.encode({"sub": "debug_user_db_test"}, "secret", algorithm="HS256", headers=headers_jwt)

url = "http://localhost:8000/api/chat/"
headers = {"Authorization": f"Bearer {token}"}

print(f"Testing DB connection via {url}...")
try:
    response = requests.get(url, headers=headers)
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        print("Success! Database Connected.")
        print(response.json())
    else:
        print(f"Failed: {response.text}")
except Exception as e:
    print(f"Request failed: {e}")
