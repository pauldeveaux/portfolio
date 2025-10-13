from fastapi import FastAPI
from api import main_router




app = FastAPI(title="Portfolio API")
app.include_router(main_router, prefix="/api")