from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class DocumentModel(BaseModel):
    """Represents a single document fetched and cleaned from the CMS."""
    id: str
    title: str
    text: str
    updated_at: Optional[datetime]