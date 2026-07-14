import shutil
import tempfile
from pathlib import Path

from fastapi import APIRouter, File, HTTPException, UploadFile

from services.zip_service import ZipService
from services.parser_service import ParserService

router = APIRouter(tags=["Upload"])


@router.post("/upload")
async def upload(file: UploadFile = File(...)):

    # Accept only ZIP files
    if not file.filename.endswith(".zip"):
        raise HTTPException(
            status_code=400,
            detail="Please upload a ZIP file."
        )

    # Create temporary file
    temp_zip = tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".zip"
    )

    try:

        shutil.copyfileobj(file.file, temp_zip)

        temp_zip.close()

        # Extract ZIP
        zip_service = ZipService()

        report = zip_service.extract_report(temp_zip.name)

        # Parse Report
        parser_service = ParserService()

        result = parser_service.parse_report(
            report["summary"]
        )

        return result

    finally:

        Path(temp_zip.name).unlink(missing_ok=True)