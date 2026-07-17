import time

from services.zip_service import ZipService
from services.parser_service import ParserService
from services.health_service import HealthService
from services.insights_service import InsightsService
from services.recommendation_service import RecommendationService
from services.root_cause_service import RootCauseService
from services.ai_service import AIService


class ReportService:

    def __init__(self):

        self.zip_service = ZipService()
        self.parser_service = ParserService()
        self.health_service = HealthService()
        self.insights_service = InsightsService()
        self.recommendation_service = RecommendationService()
        self.root_cause_service = RootCauseService()
        self.ai_service = AIService()

    def process_report(self, zip_path: str, filename: str):

        start = time.perf_counter()

        # Step 1
        extracted = self.zip_service.extract_report(zip_path)

        # Step 2
        report = self.parser_service.parse_report(
            extracted["summary"]
        )

        # Step 3
        health = self.health_service.calculate(report)

        # Step 4
        insights = self.insights_service.generate(report)

        # Step 5
        recommendations = self.recommendation_service.generate(
            report,
            insights
        )

        # Step 6
        root_causes = self.root_cause_service.analyze(
            report,
            insights
        )

        # Step 7
        analysis = self.ai_service.analyze(report)

        elapsed = round(
            (time.perf_counter() - start) * 1000,
            2
        )

        return {
            "status": "success",
            "file_name": filename,
            "processing_time_ms": elapsed,

            "health": health,
            "insights": insights,
            "recommendations": recommendations,
            "root_causes": root_causes,

            "report": report,
            "analysis": analysis,
        }