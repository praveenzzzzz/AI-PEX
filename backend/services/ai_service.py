import json

from ollama import chat


class AIService:

    def __init__(self):
        self.model = "qwen2.5:3b"

    def analyze(self, report_data: dict):

        print("=" * 60)
        print("AI SERVICE STARTED")
        print("=" * 60)

        statistics = report_data.get("statistics", {})

        transactions = report_data.get("transactions", [])

        top_transactions = sorted(
            transactions,
            key=lambda t: t.get("average_response_time", 0),
            reverse=True
        )[:10]

        compact_report = {
            "statistics": statistics,
            "transactions": top_transactions,
            "http_codes": report_data.get("http_codes", [])
        }

        prompt = f"""
You are a Senior Performance Engineer.

Analyze the following LoadRunner report.

Return ONLY valid JSON.

Output format:

{{
    "overall_health":"",
    "health_score":0,
    "risk_level":"",
    "key_observations":[],
    "bottlenecks":[],
    "recommendations":[]
}}

Report:

{json.dumps(compact_report)}
"""

        print("Sending prompt to Ollama...")

        response = chat(
            model=self.model,
            format="json",
            options={
                "temperature": 0,
                "num_predict": 350
            },
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        print("AI Response Received")

        return json.loads(response.message.content)

    def chat(
        self,
        question: str,
        report: dict,
    ):

        prompt = f"""
You are a Senior Performance Engineer.

You are helping a user understand a performance testing report.

Use ONLY the information present in the report.

If the answer is unavailable, say so.

Performance Report:

{json.dumps(report, indent=2)}

User Question:

{question}

Provide:
- A clear answer
- Short explanation
- Recommendation (if applicable)

Do not use markdown.
"""

        print("=" * 60)
        print("AI CHAT STARTED")
        print("=" * 60)

        response = chat(
            model=self.model,
            options={
                "temperature": 0.2,
                "num_predict": 300
            },
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        print("AI CHAT COMPLETED")

        return response.message.content