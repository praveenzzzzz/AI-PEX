import json

from parser import LoadRunnerParser


def main():

    parser = LoadRunnerParser("../sample_reports/summary.html")

    report = parser.parse()

    print("=" * 50)
    print("LoadRunner Report")
    print("=" * 50)

    print(json.dumps(report.model_dump(), indent=4))


if __name__ == "__main__":
    main()