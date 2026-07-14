from fastapi import APIRouter

router = APIRouter(tags=["Health"])


@router.get("/health")
def health():

    return {
        "status": "healthy",
        "application": "AI-PEX",
        "version": "1.0.0",
    }