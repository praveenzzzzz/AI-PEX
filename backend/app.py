from fastapi import FastAPI

from routes.health import router as health_router
from routes.upload import router as upload_router


app = FastAPI(
    title="AI-PEX API",
    description="AI Performance Engineering eXpert",
    version="1.0.0",
)


@app.get("/")
def root():

    return {
        "message": "Welcome to AI-PEX 🚀"
    }


app.include_router(health_router)
app.include_router(upload_router)