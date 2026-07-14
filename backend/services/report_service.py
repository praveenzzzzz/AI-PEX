import time

from services.zip_service import ZipService
from services.parser_service import ParserService
from services.ai_service import AIService
from services.health_service import HealthService


class ReportService:

    def __init__(self):

        self.zip_service = ZipService()
        self.parser_service = ParserService()
        self.ai_service = AIService()
        self.health_service = HealthService()

    def process_report(self, zip_path: str, filename: str):

        start = time.perf_counter()

        extracted = self.zip_service.extract_report(zip_path)

        report = self.parser_service.parse_report(
            extracted["summary"]
        )

        # Calculate deterministic health score
        health = self.health_service.calculate(report)

        # Generate AI explanation
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
            "report": report,
            "analysis": analysis,
        }