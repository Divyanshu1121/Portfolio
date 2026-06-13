import os
import json
from datetime import datetime
from typing import Dict
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

app = FastAPI(title="Arya Shah Portfolio Backend", version="1.0.0")

# Setup CORS so the React frontend running locally can hit these endpoints
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_origins_regex=r"https?://localhost:\d+", # Matches any localhost port
    allow_methods=["*"],
    allow_headers=["*"],
)

# File to log messages
LOG_FILE = os.path.join(os.path.dirname(__file__), "messages.json")

class ContactMessage(BaseModel):
  name: str
  email: EmailStr
  subject: str
  message: str

@app.post("/api/contact")
async def save_contact_message(data: ContactMessage) -> Dict[str, str]:
  try:
    message_dict = data.model_dump()
    message_dict["timestamp"] = datetime.utcnow().isoformat() + "Z"
    
    # Read existing messages
    messages = []
    if os.path.exists(LOG_FILE):
      try:
        with open(LOG_FILE, "r") as f:
          messages = json.load(f)
      except json.JSONDecodeError:
        messages = []
        
    # Append new message
    messages.append(message_dict)
    
    # Write back
    with open(LOG_FILE, "w") as f:
      json.dump(messages, f, indent=2)
      
    print(f"\n[NEW MESSAGE RECEIVED] {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"Name: {data.name}")
    print(f"Email: {data.email}")
    print(f"Subject: {data.subject}")
    print(f"Message: {data.message}\n")
    
    return {"status": "success", "message": "Message saved successfully!"}
  
  except Exception as e:
    print(f"Error saving message: {str(e)}")
    raise HTTPException(status_code=500, detail="Failed to save message on server.")

@app.get("/")
async def root():
  return {
    "app": "Arya Shah Portfolio Backend API",
    "status": "active",
    "endpoints": ["POST /api/contact"]
  }
