class InsightsService:

    def generate(self, report: dict):

        transactions = report.get("transactions", [])

        insights = {}

        if not transactions:
            return insights

        # -----------------------------
        # Slowest Transaction
        # -----------------------------

        slowest = max(
            transactions,
            key=lambda t: float(t.get("average", "0"))
        )

        insights["slowest_transaction"] = {
            "name": slowest["name"],
            "average_response_time": slowest["average"]
        }

        # -----------------------------
        # Fastest Transaction
        # -----------------------------

        fastest = min(
            transactions,
            key=lambda t: float(t.get("average", "999999"))
        )

        insights["fastest_transaction"] = {
            "name": fastest["name"],
            "average_response_time": fastest["average"]
        }

        # -----------------------------
        # Highest P90 Transaction
        # -----------------------------

        highest_p90 = max(
            transactions,
            key=lambda t: float(t.get("percentile_90", "0"))
        )

        insights["highest_p90_transaction"] = {
            "name": highest_p90["name"],
            "p90": highest_p90["percentile_90"]
        }

        # -----------------------------
        # Failed Transactions
        # -----------------------------

        failed = [
            t["name"]
            for t in transactions
            if int(t.get("failed", "0")) > 0
        ]

        insights["transactions_with_failures"] = failed

        return insights