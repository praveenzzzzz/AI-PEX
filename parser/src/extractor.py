from pathlib import Path
from bs4 import BeautifulSoup


class HTMLExtractor:

    def __init__(self, html_path):
        self.html_path = Path(html_path)
        self.report_folder = self.html_path.parent

        with open(self.html_path, "r", encoding="utf-8") as f:
            self.soup = BeautifulSoup(f, "lxml")

    def find(self, selector):
        return self.soup.select_one(selector)

    def find_all(self, selector):
        return self.soup.select(selector)

    def text(self, selector):

        element = self.find(selector)

        if element:
            return element.get_text(strip=True)

        return ""

    def get_report_files(self):
        """
        Returns every Report*.html file.
        """

        reports = sorted(
            self.report_folder.glob("Report*.html")
        )

        return reports