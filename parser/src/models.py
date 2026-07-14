from pydantic import BaseModel


class SummaryStatistics(BaseModel):
    max_running_vusers: str
    total_throughput: str
    average_throughput: str
    total_hits: str
    average_hits_per_second: str
    passed_transactions_ratio: str


class ReportInfo(BaseModel):
    title: str
    run_time: str
    duration: str
    scenario_name: str
    result_name: str
    sla: str


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


class HttpCode(BaseModel):
    code: str
    total: str
    per_second: str


class LoadRunnerReport(BaseModel):
    report: ReportInfo
    statistics: SummaryStatistics
    transactions: list[Transaction]
    http_codes: list[HttpCode]