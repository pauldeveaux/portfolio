import time

import uvicorn
import logging

from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from app.core.limiter import limiter
from app.api import main_router
from app.core.config import settings

app = FastAPI(
    title="Portfolio API",
    docs_url="/docs" if settings.DEBUG else None,
    redoc_url="/redoc" if settings.DEBUG else None,
)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.include_router(main_router)


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)

logger = logging.getLogger(__name__)


# ------------------- Middlewares -------------------
# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_ORIGIN],
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
    allow_credentials=True,
)


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error("Unhandled exception: %s", exc, exc_info=True)

    if isinstance(exc, HTTPException):
        return JSONResponse(
            status_code=exc.status_code,
            content={"detail": exc.detail}
        )

    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"}
    )


# HTTP Logging middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()

    logger.info("Incoming request: %s %s", request.method, request.url)

    try:
        response = await call_next(request)
    except Exception as exc:
        logger.error("Error processing request: %s", exc, exc_info=True)
        raise

    process_time = (time.time() - start_time) * 1000
    logger.info("Completed %s %s in %.2fms with status %s", request.method, request.url, process_time, response.status_code)

    return response


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info", access_log=False)
