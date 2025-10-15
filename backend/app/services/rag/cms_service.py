from datetime import datetime
from typing import List, Union, Optional
import requests

from app.models.document_model import DocumentModel


class CMSService:
    """Handles communication with the CMS and transforms data into RAG-ready documents."""

    def __init__(self, cms_api_url: str, api_key: Optional[str] = None):
        """
        Initialize the CMS service.

        Args:
            cms_api_url (str): Base URL of the CMS API.
            api_key (Optional[str]): Optional API key for authenticated requests.
        """
        self.base_url = cms_api_url.rstrip("/")
        self.api_key = api_key

    def _fetch_cms(self, route: str, headers: dict = None, params: dict = None) -> dict:
        """
        Perform a GET request to the CMS.

        Args:
            route (str): The API route (relative to the base URL).
            headers (dict, optional): Additional request headers.
            params (dict, optional): Query parameters.

        Returns:
            dict: Parsed JSON response from the CMS.
        """
        url = f"{self.base_url}/{route}"
        params = params or {}
        headers = headers or {}

        if self.api_key:
            headers.update({"Authorization": f"Bearer {self.api_key}"})

        response = requests.get(url, params=params, headers=headers)
        response.raise_for_status()
        return response.json()

    @staticmethod
    def _parse_date(date_str: Optional[str]) -> Optional[datetime]:
        """
        Convert an ISO 8601 date string into a Python datetime object.

        Args:
            date_str (str | None): The date string in ISO 8601 format.

        Returns:
            datetime | None: Parsed datetime object, or None if parsing fails.
        """
        if not date_str:
            return None
        return datetime.fromisoformat(date_str.replace("Z", "+00:00"))

    def _clean_document(self, cms_document: dict, title_key: Union[str, List[str]], content_key: Union[str | List[str]], category: str = None) -> DocumentModel:
        """
        Clean and normalize a raw CMS document into a standard DocumentModel.

        Args:
            cms_document (dict): Raw CMS document data.
            title_key (str | list[str]): Key(s) used to extract the title.
            content_key (str): Key used to extract the content.

        Returns:
            DocumentModel: Normalized and cleaned document.
        """
        doc_id = cms_document.get("documentId")
        updated_at = self._parse_date(cms_document.get("updatedAt"))

        # Concatenate multiple title parts if provided
        if isinstance(title_key, list):
            titles = [str(cms_document.get(k, "")).strip() for k in title_key if cms_document.get(k)]
            title = " — ".join(titles)
        else:
            title = str(cms_document.get(title_key, "")).strip()

        if isinstance(content_key, list):
            contents = [str(cms_document.get(k, "")).strip() for k in content_key if cms_document.get(k)]
            content = "\n\n".join(contents).strip()
        else:
            content = str(cms_document.get(content_key, "")).strip()

        text = f"Titre : {title}.\nCatégorie : {category}.\n{content}"

        return DocumentModel(id=doc_id, title=title, text=text, updated_at=updated_at, category=category)

    def _fetch_table(
        self,
        route: str,
        title_key: Union[str, List[str]],
        content_key: Union[str, List[str]],
        params: dict = None,
    ) -> List[DocumentModel]:
        """
        Fetch and clean all documents from a given CMS route.

        Args:
            route (str): API route to fetch data from.
            title_key (str | list[str]): Field(s) to use for the title.
            content_key (str): Field to use for the main content.
            params (dict, optional): Query parameters.

        Returns:
            list[DocumentModel]: List of cleaned document objects.
        """
        response = self._fetch_cms(route, params=params)
        data = response.get("data", [])

        documents = []
        for item in data:
            document = self._clean_document(item, title_key, content_key, route)
            documents.append(document)

        return documents

    def fetch_document(
        self,
        table: str,
        document_id: str,
        title_key: Union[str, List[str]],
        content_key: str,
        params: dict = None,
    ) -> Optional[DocumentModel]:
        """
        Fetch and clean a single document by its ID.

        Args:
            table (str): CMS table/collection name.
            document_id (str): ID of the document to retrieve.
            title_key (str | list[str]): Field(s) to use for the title.
            content_key (str): Field to use for the main content.
            params (dict, optional): Query parameters.

        Returns:
            DocumentModel | None: Cleaned document or None if not found.
        """
        route = f"{table}/{document_id}"
        response = self._fetch_cms(route, params=params)
        item = response.get("data")

        if not item:
            return None

        return self._clean_document(item, title_key, content_key, table)

    def fetch_all(self) -> List[DocumentModel]:
        """
        Fetch and clean all relevant CMS tables for RAG indexing.

        Returns:
            list[DocumentModel]: All cleaned documents across tables.
        """
        all_docs = []
        all_docs += self._fetch_table("experiences", title_key=["title", "subtitle"], content_key="text")
        all_docs += self._fetch_table("projects", title_key="title", content_key=["description", "markdown"])
        all_docs += self._fetch_table("skills", title_key="name", content_key="description")
        all_docs += self._fetch_table("contact-links", title_key="social-media", content_key=["text", "link"])

        return all_docs
