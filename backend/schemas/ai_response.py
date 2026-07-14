from pydantic import BaseModel


class AIAnalysis(BaseModel):
    overall_health: str
    health_score: int
    risk_level: str
    key_observations: list[str]
    bottlenecks: list[str]
    recommendations: list[str]