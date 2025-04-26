# Chatbot Layanan Puskesmas (RAG + React)

This project is a React-based interactive chatbot connected to the FastAPI backend using the **Retrieval-Augmented Generation (RAG) approach**. This chatbot is designed to answer questions related to health center services based on an internal knowledge base.

---
![image](https://github.com/user-attachments/assets/c00388f2-174e-430c-b90a-8e7d3f8f9164) ![image](https://github.com/user-attachments/assets/75ae2f7e-8425-4542-9feb-af472fa48f21)



## Feature

- React-based chat user interface
- AI answering using LLM (Groq + LLaMA 3.1)
- Chat is saved and can be retrieved based on `session_id`
- Supports Markdown format in answers
- Bot typing indicator
- Conversation history storage

---

## Tech

**Frontend:**

- React + Tailwind CSS
- `uuid` for dynamic session ID
- `react-markdown` for render Markdown

**Backend:**

- Python
- Beutifulshop
- LangChain
- Postgree SQL
- Groq Cloud
- Llama3.1

## Installation

### 1. Clone Repo
```bash
git clone https://github.com/yudifaturohman/chatbot-ai-puskesmas-client.git
cd chatbot-ai-puskesmas-client
```

### 2. Install Dependency Frontend
```bash
npm install
```

### 3. Running Frontend
```bash
npm run dev or npm start
```

## Example API Endpoint

### POST /chat
```bash
{
  "query": "Apa layanan yang tersedia di Puskesmas A?",
  "session_id": "abcd-1234"
}
```
### GET messages/{session_id}
```bash
[
  {
    "id": 1,
    "message": {
      "type": "human",
      "data": {
        "content": "Apa itu Puskesmas?"
      }
    }
  },
  {
    "id": 2,
    "message": {
      "type": "ai",
      "data": {
        "content": "**Puskesmas** adalah..."
      }
    }
  }
]
```
