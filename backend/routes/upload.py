import shutil
import tempfile
from pathlib import Path

from fastapi import APIRouter, File, Form, HTTPException, UploadFile

from services.report_service import ReportService
from services.playwright_service import PlaywrightService

router = APIRouter(tags=["Upload"])


@router.post("/upload")
async def upload(
    file: UploadFile = File(...),
    report_type: str = Form(...)
):

    # -----------------------------
    # DEBUG
    # -----------------------------
    report_type = report_type.strip().lower()

    print("=" * 60)
    print(f"Received report_type : '{report_type}'")
    print(f"Received filename    : '{file.filename}'")
    print("=" * 60)

    # -----------------------------
    # LoadRunner
    # -----------------------------
    if report_type == "loadrunner":

        if not file.filename.lower().endswith(".zip"):
            raise HTTPException(
                status_code=400,
                detail="Please upload a LoadRunner ZIP report."
            )

        temp_file = tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".zip"
        )

    # -----------------------------
    # Playwright
    # -----------------------------
    elif report_type == "playwright":

        if not file.filename.lower().endswith(".json"):
            raise HTTPException(
                status_code=400,
                detail="Please upload Playwright report.json."
            )

        temp_file = tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".json"
        )

    # -----------------------------
    # Invalid
    # -----------------------------
    else:

        print("❌ Invalid report type received!")

        raise HTTPException(
            status_code=400,
            detail=f"Invalid report type received: '{report_type}'"
        )

    try:

        shutil.copyfileobj(file.file, temp_file)

        temp_file.close()

        # -----------------------------
        # Process LoadRunner
        # -----------------------------
        if report_type == "loadrunner":

            print("🚀 Processing LoadRunner Report...")

            return ReportService().process_report(
                temp_file.name,
                file.filename,
            )

        # -----------------------------
        # Process Playwright
        # -----------------------------
        print("🎭 Processing Playwright Report...")

        return PlaywrightService().process_report(
            temp_file.name
        )

    finally:

        Path(temp_file.name).unlink(missing_ok=True)