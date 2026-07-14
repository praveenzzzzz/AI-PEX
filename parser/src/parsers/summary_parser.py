from models import ReportInfo, Statistics


class SummaryParser:

    def __init__(self, extractor):
        self.extractor = extractor

    def parse(self):

        report = ReportInfo(
            title="LoadRunner Analysis Report",
            run_time=self.extract_run_time(),
            duration=self.extract_duration(),
            scenario_name=self.extract_scenario_name(),
            result_name=self.extract_result_name(),
            sla=self.extract_sla()
        )

        statistics = Statistics(
            max_running_vusers=self.extract_statistic("Maximum Running Vusers"),
            total_throughput=self.extract_statistic("Total Throughput"),
            average_throughput=self.extract_statistic("Average Throughput"),
            total_hits=self.extract_statistic("Total Hits"),
            average_hits_per_second=self.extract_statistic("Average Hits per Second"),
            passed_transactions_ratio=self.extract_statistic("Passed Transactions Ratio")
        )

        return report, statistics

    # ----------------------------------------------------

    def extract_run_time(self):

        text = self.extractor.soup.get_text(" ", strip=True)

        if "Run Time" in text:

            idx = text.find("Run Time")

            return text[idx + 8: idx + 35].strip()

        return ""

    # ----------------------------------------------------

    def extract_duration(self):

        text = self.extractor.soup.get_text(" ", strip=True)

        if "Duration" in text:

            idx = text.find("Duration")

            return text[idx + 8: idx + 20].strip()

        return ""

    # ----------------------------------------------------

    def extract_result_name(self):

        text = self.extractor.soup.get_text(" ", strip=True)

        if "Result Name" in text:

            idx = text.find("Result Name")

            return text[idx + 11: idx + 25].strip()

        return ""

    # ----------------------------------------------------

    def extract_scenario_name(self):

        return ""

    # ----------------------------------------------------

    def extract_sla(self):

        text = self.extractor.soup.get_text(" ", strip=True)

        if "SLA" in text:

            idx = text.find("SLA")

            return text[idx + 3: idx + 20].strip()

        return ""

    # ----------------------------------------------------

    def extract_statistic(self, label):

        tables = self.extractor.find_all("table")

        for table in tables:

            rows = table.find_all("tr")

            for row in rows:

                cols = row.find_all(["td", "th"])

                if len(cols) >= 2:

                    key = cols[0].get_text(strip=True)

                    value = cols[1].get_text(strip=True)

                    if label.lower() in key.lower():

                        return value

        return ""