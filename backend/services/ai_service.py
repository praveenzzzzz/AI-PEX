import json
from ollama import chat


class AIService:

    def analyze(self, report_data: dict):

        print("=" * 60)
        print("AI SERVICE STARTED")
        print("=" * 60)

        prompt = f"""
You are a Senior Performance Engineer with over 15 years of experience in:

- LoadRunner
- JMeter
- Performance Engineering
- Performance Tuning
- API Performance
- Web Application Performance
- Grafana
- Prometheus
- Root Cause Analysis

Analyze the following LoadRunner Performance Report.

Return ONLY valid JSON.

Do NOT write markdown.

Do NOT explain anything.

Do NOT wrap the response inside triple backticks.

Return ONLY this JSON format:

{{
    "overall_health": "",
    "health_score": 0,
    "risk_level": "",
    "key_observations": [],
    "bottlenecks": [],
    "recommendations": []
}}

Rules:

- health_score must be between 0 and 100.
- risk_level must be either:
  - Low
  - Medium
  - High
- Use ONLY information present in the report.
- Never invent metrics.
- If there are no bottlenecks, return an empty array [].

Performance Report:

{json.dumps(report_data, indent=2)}
"""

        print("Sending prompt to Ollama...")

        response = chat(
            model="qwen2.5:3b",
            format="json",
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
        )

        print("Ollama Response Received")

        return response.message.content