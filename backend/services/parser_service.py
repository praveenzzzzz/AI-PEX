import sys
from pathlib import Path

# Add parser/src to Python path
PROJECT_ROOT = Path(__file__).resolve().parents[2]
PARSER_SRC = PROJECT_ROOT / "parser" / "src"

sys.path.append(str(PARSER_SRC))

from parser import LoadRunnerParser


class ParserService:

    def parse_report(self, summary_path: str):

        parser = LoadRunnerParser(summary_path)

        report = parser.parse()

        return report.model_dump()