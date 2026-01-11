import requests
import json
import jwt
import os
from dotenv import load_dotenv

load_dotenv()

CLERK_ISSUER_URL = os.getenv("CLERK_ISSUER_URL")
if not CLERK_ISSUER_URL:
    print("CLERK_ISSUER_URL not found in environment")
    exit(1)

jwks_url = f"{CLERK_ISSUER_URL}/.well-known/jwks.json"

print(f"Fetching JWKS from {jwks_url}...")
try:
    jwks = requests.get(jwks_url).json()
    if "keys" not in jwks or not jwks["keys"]:
        print("No keys found in JWKS")
        exit(1)
    kid = jwks["keys"][0]["kid"]
    print(f"Found kid: {kid}")
except Exception as e:
    print(f"Failed to fetch JWKS: {e}")
    exit(1)

# Create dummy token with valid kid
# Note: The algorithm doesn't matter for the backend verification since it skips signature check, 
# but we need to encode it successfully.
headers_jwt = {"kid": kid}
token = jwt.encode({"sub": "debug_user"}, "secret", algorithm="HS256", headers=headers_jwt)

print(f"Generated token: {token[:20]}...")

url = "http://localhost:8000/api/explain/"
headers = {"Authorization": f"Bearer {token}"}
data = {"topic": "Photosynthesis"}

print(f"Sending request to {url}...")
try:
    response = requests.post(url, json=data, headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Request failed: {e}")
