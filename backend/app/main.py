from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from api import main_router
import uvicorn
import logging

app = FastAPI(title="Portfolio API")
app.include_router(main_router, prefix="/api")



# Middlewares

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logging.error(f"Unexpected error: {exc}", exc_info=True)

    return JSONResponse(
        status_code=500,
        content={"message": "An internal error occurred."}
    )


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, access_log=False)
