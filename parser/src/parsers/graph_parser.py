from bs4 import BeautifulSoup

from models import (
    GraphPoint,
    GraphSeries,
    GraphReport,
)


class GraphParser:

    def __init__(self, html_file):

        self.html_file = html_file

        with open(html_file, "r", encoding="utf-8") as f:
            self.soup = BeautifulSoup(f, "lxml")

    # --------------------------------------------------------

    def parse(self):

        graph_name = self.get_graph_name()

        graph_type = self.get_graph_type()

        x_axis = self.get_x_axis()

        y_axis = self.get_y_axis()

        series = self.get_series()

        return GraphReport(
            graph_name=graph_name,
            graph_type=graph_type,
            x_axis=x_axis,
            y_axis=y_axis,
            series=series,
        )

    # --------------------------------------------------------

    def get_graph_name(self):

        title = self.soup.select_one(".header_page")

        if title:
            return title.get_text(strip=True)

        return ""

    # --------------------------------------------------------

    def get_graph_type(self):

        graph_type = self.soup.select_one("#Type")

        if graph_type:
            return graph_type.get_text(strip=True)

        return ""

    # --------------------------------------------------------

    def get_x_axis(self):

        axis = self.soup.select_one("#xAxisTitle")

        if axis:
            return axis.get_text(strip=True)

        return ""

    # --------------------------------------------------------

    def get_y_axis(self):

        axis = self.soup.select_one("#yAxisTitle")

        if axis:
            return axis.get_text(strip=True)

        return ""

    # --------------------------------------------------------

    def get_series(self):

        all_series = []

        tables = self.soup.select("#GraphSeriesData table")

        for table in tables:

            series_name = table.get("title", "Series")

            points = []

            rows = table.select("tr")

            for row in rows:

                cols = row.find_all("td")

                if len(cols) != 2:
                    continue

                try:

                    point = GraphPoint(
                        time=float(cols[0].get_text(strip=True)),
                        value=float(cols[1].get_text(strip=True))
                    )

                    points.append(point)

                except ValueError:
                    continue

            all_series.append(
                GraphSeries(
                    name=series_name,
                    points=points
                )
            )

        return all_series