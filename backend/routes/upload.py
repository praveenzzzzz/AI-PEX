import shutil
import tempfile
from pathlib import Path

from fastapi import APIRouter, File, HTTPException, UploadFile

from services.report_service import ReportService

router = APIRouter(tags=["Upload"])


@router.post("/upload")
async def upload(file: UploadFile = File(...)):

    if not file.filename.endswith(".zip"):
        raise HTTPException(
            status_code=400,
            detail="Please upload a ZIP file."
        )

    temp_zip = tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".zip"
    )

    try:

        shutil.copyfileobj(file.file, temp_zip)

        temp_zip.close()

        report_service = ReportService()

        return report_service.process_report(
            temp_zip.name,
            file.filename,
        )

    finally:

        Path(temp_zip.name).unlink(missing_ok=True)