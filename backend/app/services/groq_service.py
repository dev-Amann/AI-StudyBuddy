import os
import groq
import json
from app.config import settings

class GroqService:
    def __init__(self):
        self.client = groq.AsyncGroq(api_key=settings.GROQ_API_KEY)

    async def get_explanation(self, topic: str) -> str:
        prompt = f"Explain the topic '{topic}' in a created, simplified way suitable for a student. Use analogies if helpful. Keep it concise but informative."
        
        chat_completion = await self.client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful AI Study Buddy. Your goal is to simplify complex topics."
                },
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model="llama-3.3-70b-versatile", # Using a fast model
            temperature=0.7,
            max_tokens=1024,
        )
        return chat_completion.choices[0].message.content

    async def summarize_text(self, text: str) -> str:
        prompt = f"Summarize the following text into key bullet points and a brief overview:\n\n{text[:15000]}" # Truncate to avoid context limit roughly
        
        chat_completion = await self.client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert summarizer."
                },
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model="llama-3.3-70b-versatile",
        )
        return chat_completion.choices[0].message.content

    async def generate_quiz(self, topic: str, difficulty: str) -> dict:
        prompt = f"Generate a {difficulty} difficulty quiz regarding '{topic}' with 5 multiple choice questions. Return strictly valid JSON in the following format: {{'title': 'Quiz Title', 'questions': [{{'question': 'Q1?', 'options': ['A', 'B', 'C', 'D'], 'correct_answer': 0}}]}}. Ensure correct_answer is an integer index (0-3)."
        
        chat_completion = await self.client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are a quiz assistant. Output ONLY JSON."
                },
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model="llama-3.3-70b-versatile",
            response_format={"type": "json_object"}
        )
        
        try:
            return json.loads(chat_completion.choices[0].message.content)
        except json.JSONDecodeError:
            # Fallback if JSON is malformed
            return {
                "title": f"Quiz on {topic} (Error Generating)",
                "questions": []
            }

    async def generate_flashcards(self, topic: str) -> dict:
        prompt = f"Generate 5 flashcards for the topic '{topic}'. Return strictly valid JSON in the following format: {{'flashcards': [{{'front': 'Term', 'back': 'Definition'}}]}}."
        
        chat_completion = await self.client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are a study aid generator. Output ONLY JSON."
                },
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model="llama-3.3-70b-versatile",
            response_format={"type": "json_object"}
        )
        
        try:
            return json.loads(chat_completion.choices[0].message.content)
        except json.JSONDecodeError:
             return {
                "flashcards": []
            }

groq_service = GroqService()
