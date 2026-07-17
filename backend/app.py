from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.health import router as health_router
from routes.upload import router as upload_router
from routes.chat import router as chat_router

app = FastAPI(
    title="AI-PEX API",
    description="AI Performance Engineering eXpert",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "Welcome to AI-PEX 🚀"
    }


app.include_router(health_router)
app.include_router(upload_router)
app.include_router(chat_router)