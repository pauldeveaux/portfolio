# Portfolio Backend

This is the **backend** of my personal portfolio, built with **Python** and **FastAPI**.  
It powers the AI chatbot API, email management, and connects to the CMS for content updates.

---

## Features

- **AI Chatbot API:** Dynamic responses for portfolio visitors.
- **Email Management:** Send and receive emails via API endpoints.
- **CMS Integration:** Fetch and update portfolio content from the CMS.

---

## Tech Stack

- Python 3.11+ / FastAPI  
- Docker (optional for deployment)  

---

## Quick Start

```bash
git clone https://github.com/pauldeveaux/portfolio.git
cd backend
uv sync
uv run
```

The API will be available at **http://localhost:8000**

---

## Environment Variables

Copy `.env.example` to `.env` and fill in the required values:

```bash
cp .env.example .env
```

Variables include database access, API keys, email settings, etc.  
Never commit the `.env` file containing secrets.

---

## Deployment

A `compose.yaml` file at the project root allows you to launch all services with Docker:

```bash
docker compose up
```

---

## License

© 2025 Paul Deveaux \| All rights reserved.  
This project is provided for consultation only.  
Any use, modification, reproduction, or distribution is prohibited without the express permission of the author.

---

Paul Deveaux