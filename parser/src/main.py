import json

from parser import LoadRunnerParser


def main():

    parser = LoadRunnerParser("../sample_reports/summary.html")

    report = parser.parse()

    print("=" * 70)
    print("AI-PEX LoadRunner Report Parser")
    print("=" * 70)

    print(json.dumps(report.model_dump(), indent=4))

    print("\n" + "=" * 70)
    print("SUMMARY")
    print("=" * 70)

    print(f"Graphs Parsed      : {len(report.graphs)}")
    print(f"Transactions       : {len(report.transactions)}")
    print(f"HTTP Codes         : {len(report.http_codes)}")

    print("\nGraph Names")

    for i, graph in enumerate(report.graphs, start=1):

        total_points = sum(len(series.points) for series in graph.series)

        print(
            f"{i:02d}. "
            f"{graph.graph_name} "
            f"({graph.graph_type}) "
            f"- {total_points} points"
        )


if __name__ == "__main__":
    main()