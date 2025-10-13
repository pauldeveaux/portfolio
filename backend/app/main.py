import time
import uvicorn
import logging

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from api import main_router
from app.core.config import settings

app = FastAPI(title="Portfolio API")
app.include_router(main_router)


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)


# ------------------- Middlewares -------------------
# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_ORIGIN],  # frontend URL
    allow_methods=["*"],                      # allow GET, POST, OPTIONS, etc.
    allow_headers=["*"],                      # allow custom headers like Content-Type
    allow_credentials=True,                   # allow cookies / auth
)

# HTTP Logging middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()

    # Log request info
    logging.info(f"Incoming request: {request.method} {request.url}")

    try:
        response = await call_next(request)
    except Exception as exc:
        logging.error(f"Error processing request: {exc}", exc_info=True)
        raise

    process_time = (time.time() - start_time) * 1000
    logging.info(f"Completed {request.method} {request.url} in {process_time:.2f}ms with status {response.status_code}")

    return response


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logging.error(f"Unexpected error: {exc}", exc_info=True)

    return JSONResponse(
        status_code=500,
        content={"message": "An internal error occurred."}
    )


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info", access_log=False)
