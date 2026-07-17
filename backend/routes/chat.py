from fastapi import APIRouter
from pydantic import BaseModel

from services.ai_service import AIService

router = APIRouter(
    prefix="/chat",
    tags=["AI Chat"],
)


class ChatRequest(BaseModel):
    question: str
    report: dict


class ChatResponse(BaseModel):
    answer: str


@router.post(
    "",
    response_model=ChatResponse,
)
async def chat(request: ChatRequest):

    ai_service = AIService()

    answer = ai_service.chat(
        question=request.question,
        report=request.report,
    )

    return ChatResponse(
        answer=answer
    )