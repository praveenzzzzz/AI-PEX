from pydantic import BaseModel


# ==========================================================
# Summary Statistics
# ==========================================================

class SummaryStatistics(BaseModel):
    max_running_vusers: str
    total_throughput: str
    average_throughput: str
    total_hits: str
    average_hits_per_second: str
    passed_transactions_ratio: str


# ==========================================================
# Report Information
# ==========================================================

class ReportInfo(BaseModel):
    title: str
    run_time: str
    duration: str
    scenario_name: str
    result_name: str
    sla: str


# ==========================================================
# Transactions
# ==========================================================

class Transaction(BaseModel):
    name: str
    minimum: str
    average: str
    maximum: str
    std_deviation: str
    percentile_90: str
    passed: str
    failed: str
    stopped: str


# ==========================================================
# HTTP Codes
# ==========================================================

class HttpCode(BaseModel):
    code: str
    total: str
    per_second: str


# ==========================================================
# Graph Models
# ==========================================================

class GraphPoint(BaseModel):
    time: float
    value: float


class GraphSeries(BaseModel):
    name: str
    points: list[GraphPoint]


class GraphReport(BaseModel):
    graph_name: str
    graph_type: str
    x_axis: str
    y_axis: str
    series: list[GraphSeries]


# ==========================================================
# Complete Report
# ==========================================================

class LoadRunnerReport(BaseModel):
    report: ReportInfo
    statistics: SummaryStatistics
    transactions: list[Transaction]
    http_codes: list[HttpCode]
    graphs: list[GraphReport] = []