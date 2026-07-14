import shutil
import tempfile
import zipfile
from pathlib import Path


class ZipService:

    def extract_report(self, zip_path: str):

        temp_dir = tempfile.mkdtemp(prefix="aipex_")

        with zipfile.ZipFile(zip_path, "r") as zip_ref:
            zip_ref.extractall(temp_dir)

        summary = None

        for file in Path(temp_dir).rglob("summary.html"):

            summary = file
            break

        if summary is None:

            shutil.rmtree(temp_dir)

            raise FileNotFoundError(
                "summary.html not found inside uploaded report."
            )

        return {
            "temp_dir": temp_dir,
            "summary": str(summary),
        }