import type { Graph } from "./Graph";

export interface Transaction {
  name: string;
  minimum: string;
  average: string;
  maximum: string;
  percentile_90: string;
  passed: string;
  failed: string;
}

export interface HttpCode {
  code: string;
  count: number;
}

export interface RootCause {
  issue: string;
  transaction: string;
  reason: string;
}

export interface Insights {
  slowest_transaction: {
    name: string;
    average_response_time: string;
  };

  fastest_transaction: {
    name: string;
    average_response_time: string;
  };

  highest_p90_transaction: {
    name: string;
    p90: string;
  };
}

export interface ApiResponse {
  report_type?: string;

  health: {
    health_score: number;
    grade: string;
    risk_level: string;
  };

  processing_time_ms: number;

  recommendations: {
    overall_status: string;
    recommendations: string[];
  };

  root_causes: RootCause[];

  insights: Insights;

  report: {
    statistics: {
      max_running_users: string;
      total_throughput: string;
      average_throughput: string;
      total_hits: string;
      average_hits_per_second: string;
      passed_transactions_ratio: string;
    };

    transactions: Transaction[];

    http_codes: HttpCode[];

    graphs: Graph[];
  };
}