from pydantic import BaseModel


class AIInsights(BaseModel):
    summary: str
    key_observations: list[str]
    bottlenecks: list[str]
    recommendations: list[str]


class ReportResponse(BaseModel):
    status: str
    file_name: str
    processing_time_ms: float
    health: dict
    report: dict
    analysis: AIInsights