class RecommendationService:

    def generate(self, report: dict, insights: dict):

        recommendations = []

        health = report.get("statistics", {})
        transactions = report.get("transactions", [])
        http_codes = report.get("http_codes", [])

        # -------------------------------------------------
        # Check slowest transaction
        # -------------------------------------------------

        slowest = insights.get("slowest_transaction", {})

        if slowest:

            avg = float(slowest.get("average_response_time", 0))

            if avg > 2:

                recommendations.append(
                    f"Investigate '{slowest['name']}' because its average response time is {avg:.3f}s."
                )

        # -------------------------------------------------
        # Failed Transactions
        # -------------------------------------------------

        failed = insights.get("transactions_with_failures", [])

        if failed:

            recommendations.append(
                f"Fix failed transactions: {', '.join(failed)}."
            )

        else:

            recommendations.append(
                "No transaction failures detected."
            )

        # -------------------------------------------------
        # HTTP Errors
        # -------------------------------------------------

        http_errors = []

        for code in http_codes:

            if code["code"] != "HTTP_200":

                http_errors.append(code)

        if http_errors:

            recommendations.append(
                f"Review HTTP response codes. {len(http_errors)} non-200 status codes were detected."
            )

        # -------------------------------------------------
        # Pass Ratio
        # -------------------------------------------------

        pass_ratio = float(
            health.get("passed_transactions_ratio", "100")
        )

        if pass_ratio < 95:

            recommendations.append(
                "Transaction pass ratio is below 95%."
            )

        else:

            recommendations.append(
                "Excellent transaction success ratio."
            )

        # -------------------------------------------------
        # Overall Status
        # -------------------------------------------------

        overall_status = "Healthy"

        if failed or http_errors:

            overall_status = "Needs Attention"

        return {
            "overall_status": overall_status,
            "recommendations": recommendations
        }