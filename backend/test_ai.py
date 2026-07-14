from services.ai_service import AIService

sample_report = {
    "statistics": {
        "max_running_vusers": "3",
        "passed_transactions_ratio": "100",
        "average_throughput": "9657",
    },
    "transactions": [
        {
            "name": "Action_Transaction",
            "average": "2.864",
            "failed": "0",
        }
    ],
    "http_codes": [
        {
            "code": "HTTP_200",
            "total": "320",
        }
    ],
}

ai = AIService()

print("=" * 60)
print("AI ANALYSIS")
print("=" * 60)

result = ai.analyze(sample_report)

print(result)