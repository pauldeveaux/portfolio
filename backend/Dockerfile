# Base image: use Python 3.11 slim for a lightweight container
FROM python:3.11-slim

# Environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install UV
RUN pip install --upgrade pip uv

# Copy pyproject.toml + uv.lock first to leverage Docker cache
COPY ./pyproject.toml ./uv.lock ./

# Install dependencies defined in pyproject.toml / uv.lock
RUN uv sync

# Copy the rest of the backend application code into the container
COPY . /app
WORKDIR /app

# Expose port 8000 for the FastAPI application
EXPOSE 8000

# Run the FastAPI app using UV
CMD ["uv", "run", "main:app", "--host", "0.0.0.0", "--port", "8000"]
