from extractor import HTMLExtractor
from parsers.graph_parser import GraphParser

from models import (
    LoadRunnerReport,
    ReportInfo,
    SummaryStatistics,
    Transaction,
    HttpCode,
)


class LoadRunnerParser:

    def __init__(self, html_file):
        self.extractor = HTMLExtractor(html_file)

    # ---------------------------------------------------------
    # Report Information
    # ---------------------------------------------------------

    def parse_report_info(self):

        return ReportInfo(
            title="LoadRunner Analysis Report",
            run_time=self.extractor.text(".run-time .scenario-settings-data"),
            duration=self.extractor.text(".duration .scenario-settings-data"),
            scenario_name=self.extractor.text(".scenario-name .scenario-settings-data"),
            result_name=self.extractor.text(".result-name .scenario-settings-data"),
            sla=self.extractor.text(".sla-section .scenario-settings-data"),
        )

    # ---------------------------------------------------------
    # Statistics
    # ---------------------------------------------------------

    def parse_statistics(self):

        values = self.extractor.find_all(".statistic-values")

        if len(values) < 6:
            return SummaryStatistics(
                max_running_vusers="",
                total_throughput="",
                average_throughput="",
                total_hits="",
                average_hits_per_second="",
                passed_transactions_ratio="",
            )

        return SummaryStatistics(
            max_running_vusers=values[0].get_text(strip=True),
            total_throughput=values[1].get_text(strip=True),
            average_throughput=values[2].get_text(strip=True),
            total_hits=values[3].get_text(strip=True),
            average_hits_per_second=values[4].get_text(strip=True),
            passed_transactions_ratio=values[5].get_text(strip=True),
        )

    # ---------------------------------------------------------
    # Transactions
    # ---------------------------------------------------------

    def parse_transactions(self):

        transactions = []

        table = self.extractor.find("#TransactionsTable")

        if table is None:
            return transactions

        rows = table.select("tbody tr")

        for row in rows:

            columns = [
                col.get_text(strip=True)
                for col in row.find_all("td")
            ]

            if len(columns) != 9:
                continue

            transaction = Transaction(
                name=columns[0],
                minimum=columns[1],
                average=columns[2],
                maximum=columns[3],
                std_deviation=columns[4],
                percentile_90=columns[5],
                passed=columns[6],
                failed=columns[7],
                stopped=columns[8],
            )

            transactions.append(transaction)

        return transactions

    # ---------------------------------------------------------
    # HTTP Response Codes
    # ---------------------------------------------------------

    def parse_http_codes(self):

        http_codes = []

        table = self.extractor.find("#HTTPCodesTable")

        if table is None:
            return http_codes

        rows = table.select("tbody tr")

        for row in rows:

            columns = [
                col.get_text(strip=True)
                for col in row.find_all("td")
            ]

            if len(columns) != 3:
                continue

            http_codes.append(
                HttpCode(
                    code=columns[0],
                    total=columns[1],
                    per_second=columns[2],
                )
            )

        return http_codes

    # ---------------------------------------------------------
    # Graph Parser
    # ---------------------------------------------------------

    def parse_graphs(self):

        graphs = []

        report_files = self.extractor.get_report_files()

        for report_file in report_files:

            try:
                graph = GraphParser(report_file).parse()
                graphs.append(graph)

            except Exception as e:
                print(f"Failed to parse {report_file.name}: {e}")

        return graphs

    # ---------------------------------------------------------
    # Main Parser
    # ---------------------------------------------------------

    def parse(self):

        return LoadRunnerReport(
            report=self.parse_report_info(),
            statistics=self.parse_statistics(),
            transactions=self.parse_transactions(),
            http_codes=self.parse_http_codes(),
            graphs=self.parse_graphs(),
        )