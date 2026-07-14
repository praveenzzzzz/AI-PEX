class HealthService:

    def calculate(self, report: dict):

        score = 100
        reasons = []

        statistics = report.get("statistics", {})
        transactions = report.get("transactions", [])
        http_codes = report.get("http_codes", [])

        # -----------------------------
        # Passed Transaction Ratio
        # -----------------------------

        passed_ratio = float(
            statistics.get(
                "passed_transactions_ratio",
                "100"
            ).replace(",", "")
        )

        if passed_ratio < 100:

            deduction = (100 - passed_ratio) * 0.5

            score -= deduction

            reasons.append(
                f"Only {passed_ratio}% transactions passed."
            )

        # -----------------------------
        # Failed Transactions
        # -----------------------------

        total_failed = sum(
            int(t.get("failed", "0"))
            for t in transactions
        )

        if total_failed > 0:

            deduction = min(
                total_failed * 2,
                30
            )

            score -= deduction

            reasons.append(
                f"{total_failed} failed transactions detected."
            )

        # -----------------------------
        # Average Response Time
        # -----------------------------

        averages = []

        for transaction in transactions:

            try:

                averages.append(
                    float(
                        transaction["average"]
                    )
                )

            except:

                pass

        if averages:

            avg_response = sum(averages) / len(averages)

            if avg_response > 3:

                score -= 20

                reasons.append(
                    "Average response time exceeds 3 seconds."
                )

            elif avg_response > 2:

                score -= 10

                reasons.append(
                    "Average response time exceeds 2 seconds."
                )

            elif avg_response > 1:

                score -= 5

                reasons.append(
                    "Average response time exceeds 1 second."
                )

        # -----------------------------
        # HTTP Errors
        # -----------------------------

        http_errors = 0

        for code in http_codes:

            if "200" not in code["code"]:

                http_errors += int(code["total"])

        if http_errors:

            deduction = min(http_errors, 15)

            score -= deduction

            reasons.append(
                f"{http_errors} HTTP errors detected."
            )

        # -----------------------------
        # Final Score
        # -----------------------------

        score = max(0, round(score))

        if score >= 90:

            grade = "A"

            risk = "Low"

        elif score >= 75:

            grade = "B"

            risk = "Medium"

        elif score >= 60:

            grade = "C"

            risk = "Medium"

        else:

            grade = "D"

            risk = "High"

        return {
            "health_score": score,
            "grade": grade,
            "risk_level": risk,
            "reasons": reasons
        }