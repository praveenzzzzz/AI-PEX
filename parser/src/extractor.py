from bs4 import BeautifulSoup


class HTMLExtractor:

    def __init__(self, html_path):
        with open(html_path, "r", encoding="utf-8") as f:
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