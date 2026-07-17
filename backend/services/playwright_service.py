import json
from pathlib import Path


class PlaywrightService:

    def process_report(self, report_json_path: str):

        report_path = Path(report_json_path)

        if not report_path.exists():
            raise FileNotFoundError(
                f"Playwright report not found: {report_json_path}"
            )

        with open(report_path, "r", encoding="utf-8") as file:
            report = json.load(file)

        total = 0
        passed = 0
        failed = 0
        skipped = 0

        browser_stats = {}

        failed_tests = []
        slowest_tests = []

        suites = report.get("suites", [])

        for suite in suites:

            specs = suite.get("specs", [])

            for spec in specs:

                title = spec.get("title", "Unknown")

                tests = spec.get("tests", [])

                for test in tests:

                    browser = test.get("projectName", "Unknown")

                    browser_stats.setdefault(
                        browser,
                        {
                            "passed": 0,
                            "failed": 0,
                            "total": 0,
                        },
                    )

                    results = test.get("results", [])

                    for result in results:

                        total += 1

                        browser_stats[browser]["total"] += 1

                        status = result.get("status")

                        duration = result.get(
                            "duration",
                            0,
                        )

                        if status == "passed":
                            passed += 1
                            browser_stats[browser]["passed"] += 1

                        elif status == "failed":
                            failed += 1
                            browser_stats[browser]["failed"] += 1

                            failed_tests.append(
                                {
                                    "test": title,
                                    "browser": browser,
                                    "duration_ms": duration,
                                }
                            )

                        elif status == "skipped":
                            skipped += 1

                        slowest_tests.append(
                            {
                                "test": title,
                                "browser": browser,
                                "duration_ms": duration,
                            }
                        )

        slowest_tests.sort(
            key=lambda x: x["duration_ms"],
            reverse=True,
        )

        success_rate = (
            round((passed / total) * 100, 2)
            if total > 0
            else 0
        )

        return {
            "report_type": "playwright",
            "summary": {
                "total_tests": total,
                "passed": passed,
                "failed": failed,
                "skipped": skipped,
                "success_rate": success_rate,
            },
            "browser_statistics": browser_stats,
            "slowest_tests": slowest_tests[:10],
            "failed_tests": failed_tests,
        }