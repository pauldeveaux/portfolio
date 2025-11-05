# Portfolio RAG - Paul Deveaux

This project is an AI-powered portfolio platform, composed of three main modules: backend (Python), CMS (Strapi), and frontend (React/Next.js).

## Project Structure

- `backend/`: Python API (FastAPI) for chatbot and email management.
- `cms/`: Headless CMS (Strapi) for administration and content management.
- `frontend/`: Next.js web application for portfolio display.

## Prerequisites

- Node.js & npm/yarn
- Python 3.11+
- Docker (optional for deployment)

## Installation

### Backend

```bash
cd backend
uv sync
uv run 
```

### CMS

```bash
npm run build
npm run start
```

### Frontend

```bash
cd frontend
npm run build
npm run start
```

## Environment Variable Configuration

Each module (`backend`, `cms`, `frontend`) contains a `.env.example` file listing the required environment variables for configuration.  
To activate the configuration, copy the `.env.example` file to `.env` in each folder and fill in the appropriate values:

```bash
cp .env.example .env
```

**Example:**

- `backend/.env.example` → `backend/.env`
- `cms/.env.dev.example` → `cms/.env.dev`
- `frontend/.env.example` → `frontend/.env`

Variables to set generally include database access, API keys, email settings, etc.  
Never version the `.env` file containing secrets.

There is also a `.env` file for docker compose, defined at the root of the project:

- `./.env-compose.example` → `./.env-compose`

## Usage

- Access the frontend via `http://localhost:3000`
- Manage content via the CMS at `http://localhost:1337` (or the configured port)
- The backend API is available at `http://localhost:8000`

## Deployment

A `compose.yaml` file is provided at the root to launch all services with Docker:

```bash
docker compose up
```

## Features

- Dynamic portfolio with project, skills, and experience management
- AI chatbot for visitor interaction
- Email and document management
- Full administration via the CMS

## License

© 2025 Paul Deveaux | All rights reserved.  
This project is provided for consultation only.  
Any use, modification, reproduction, or distribution is prohibited without the express permission of the author.

---

Paul Deveaux