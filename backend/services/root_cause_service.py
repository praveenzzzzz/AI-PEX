class RootCauseService:

    def analyze(self, report: dict, insights: dict):

        causes = []

        # -----------------------------
        # Slowest Transaction
        # -----------------------------

        slowest = insights.get("slowest_transaction", {})

        if slowest:

            avg = float(slowest.get("average_response_time", 0))

            if avg > 2:

                causes.append({
                    "issue": "Slow Transaction",
                    "transaction": slowest["name"],
                    "reason": (
                        f"Average response time is {avg:.3f}s, "
                        "which is above the recommended threshold."
                    )
                })

        # -----------------------------
        # Highest P90
        # -----------------------------

        highest = insights.get("highest_p90_transaction", {})

        if highest:

            p90 = float(highest.get("p90", 0))

            if p90 > 2:

                causes.append({
                    "issue": "High P90 Latency",
                    "transaction": highest["name"],
                    "reason": (
                        f"90% of requests completed within "
                        f"{p90:.3f}s, indicating elevated latency."
                    )
                })

        # -----------------------------
        # Failed Transactions
        # -----------------------------

        failed = insights.get("transactions_with_failures", [])

        if failed:

            causes.append({
                "issue": "Failed Transactions",
                "transaction": ", ".join(failed),
                "reason": "One or more transactions failed."
            })

        # -----------------------------
        # HTTP Errors
        # -----------------------------

        for code in report.get("http_codes", []):

            if code["code"] != "HTTP_200":

                causes.append({
                    "issue": "HTTP Errors",
                    "transaction": "-",
                    "reason": (
                        f"{code['total']} responses returned "
                        f"{code['code']}."
                    )
                })

        return causes