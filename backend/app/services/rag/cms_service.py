from datetime import datetime
from typing import List, Union, Optional
import requests

from app.core.config import settings
from app.models.document_model import DocumentModel
from app.services.rag.prepare_text import prepare_text, concatenate_texts


class CMSService:
    """
    Handles communication with a CMS and transforms raw CMS data
    into cleaned, RAG-ready DocumentModel objects.
    """

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
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "User-Agent": "Mozilla/5.0 (compatible; MyBackend/1.0)",
                "Accept": "application/json",
            }

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

    def _clean_document(
        self,
        cms_document: dict,
        title_keys: List[str],
        content_keys: List[str],
        link_keys: Optional[List[str]],
        category: Optional[str] = None
    ) -> DocumentModel:
        """
        Clean a raw CMS document into a normalized DocumentModel.

        Args:
            cms_document (dict): Raw CMS document data.
            title_keys (List[str]): Keys to extract title fields.
            content_keys (List[str]): Keys to extract content fields.
            link_keys (List[str], optional): Keys to extract links (URLs or emails).
            category (str, optional): Optional category or table name.

        Returns:
            DocumentModel: Normalized, cleaned document ready for RAG.
        """
        doc_id = cms_document.get("documentId")
        updated_at = self._parse_date(cms_document.get("updatedAt"))

        if not link_keys:
            link_keys = []

        titles = [cms_document.get(k) for k in title_keys if cms_document.get(k)]
        contents = [cms_document.get(k) for k in content_keys if cms_document.get(k)]
        links = [cms_document.get(k) for k in link_keys if cms_document.get(k)]

        title, text = prepare_text(titles, contents, links)

        return DocumentModel(
            id=doc_id,
            title=title,
            text=text,
            updated_at=updated_at,
            category=category
        )


    def _clean_aggregated_documents(
            self,
            cms_documents: List[dict],
            title_keys: List[str],
            content_keys: List[str],
            link_keys: Optional[List[str]],
            category: Optional[str] = None
    ) -> DocumentModel:
        """
        Aggregate and clean multiple CMS documents into a single DocumentModel.

        Args:
            cms_documents (List[dict]): List of raw CMS documents.
            title_keys (List[str]): Keys to extract title fields.
            content_keys (List[str]): Keys to extract content fields.
            link_keys (List[str], optional): Keys to extract links (optional).
            category (str, optional): Category or table name.

        Returns:
            DocumentModel: Aggregated and cleaned document.
        """
        if not cms_documents:
            raise ValueError("cms_documents cannot be empty")

        # Aggregate ID
        doc_ids = [str(doc.get("documentId", "")) for doc in cms_documents if doc.get("documentId")]
        aggr_id = f"agg_{'_'.join(sorted(doc_ids))}" if doc_ids else f"agg_{hash(str(cms_documents))}"

        # Last UpdatedAt (detect change on every document)
        updated_dates = [self._parse_date(doc.get("updatedAt")) for doc in cms_documents if doc.get("updatedAt")]
        aggr_updated_at = max(updated_dates) if updated_dates else None

        if not link_keys:
            link_keys = []
        texts = []
        for cms_document in cms_documents:
            titles = [cms_document.get(k) for k in title_keys if cms_document.get(k)]
            contents = [cms_document.get(k) for k in content_keys if cms_document.get(k)]
            links = [cms_document.get(k) for k in link_keys if cms_document.get(k)]

            _, text = prepare_text(titles, contents, links)
            texts.append(text)

        full_text = concatenate_texts(texts)

        return DocumentModel(
            id=aggr_id,
            title=category,
            text=full_text,
            updated_at=aggr_updated_at,
            category=category
        )



    def _fetch_table(
        self,
        route: str,
        title_keys: List[str],
        content_keys: List[str],
        link_keys: Optional[List[str]] = None,
        category_name: str = None,
        aggregate_documents: bool = False,
        params: dict = None,
    ) -> List[DocumentModel]:
        """
        Fetch and clean documents from a specific CMS table.

        Args:
            route (str): CMS API route for the table.
            title_keys (List[str]): Keys to extract title fields.
            content_keys (List[str]): Keys to extract content fields.
            link_keys (List[str], optional): Keys to extract links.
            category_name (str, optional): Category name for the documents.
            aggregate_documents (bool, optional): If True, aggregate multiple documents into one.
            params (dict, optional): Query parameters for the API request.

        Returns:
            List[DocumentModel]: List of cleaned documents.
        """
        if not link_keys:
            link_keys = []

        response = self._fetch_cms(route, params=params)
        data = response.get("data", [])
        if not isinstance(data, list):
            data = [data]

        documents = []
        if aggregate_documents:
            aggregated_doc = self._clean_aggregated_documents(data, title_keys, content_keys, link_keys, category_name)
            documents.append(aggregated_doc)
        else:
            for item in data:
                cleaned_doc = self._clean_document(item, title_keys, content_keys, link_keys, category_name)
                documents.append(cleaned_doc)

        return documents


    def fetch_document(
        self,
        table: str,
        document_id: str,
        title_keys: List[str],
        content_keys: List[str],
        link_keys: List[str],
        params: dict = None,
    ) -> Optional[DocumentModel]:
        """
        Fetch and clean a single document by ID from a CMS table.

        Args:
           table (str): Table name in the CMS.
           document_id (str): ID of the document to fetch.
           title_keys (List[str]): Keys to extract title fields.
           content_keys (List[str]): Keys to extract content fields.
           link_keys (List[str]): Keys to extract links.
           params (dict, optional): Query parameters for the API request.

        Returns:
           DocumentModel | None: Cleaned document or None if not found.
        """
        route = f"{table}/{document_id}"
        response = self._fetch_cms(route, params=params)
        item = response.get("data")

        if not item:
            return None

        return self._clean_document(item, title_keys, content_keys, link_keys)


    def fetch_all(self) -> List[DocumentModel]:
        """
        Fetch and clean all relevant CMS tables for RAG indexing.

        Returns:
            list[DocumentModel]: All cleaned documents across tables.
        """
        all_docs = []
        all_docs += self._fetch_table(
            "experiences",
            title_keys=["title", "subtitle"],
            content_keys=["text"],
            link_keys=[],
            category_name="Expériences"
        )
        all_docs += self._fetch_table(
            "projects", title_keys=["title"], content_keys=["description", "markdown"], category_name="Projets"
        )
        all_docs += self._fetch_table(
            "skills", title_keys=["name"], content_keys=["description"], category_name="Compétences"
        )
        all_docs += self._fetch_table(
            "contact-links", title_keys=["socialMedia"], content_keys=["text"], link_keys=["link"], category_name="Contacts", aggregate_documents=True
        )

        all_docs += self._fetch_table(
            "homepage", title_keys=["textSectionTitle"], content_keys=["textSectionText"], link_keys=[], category_name="Plus sur toi"
        )

        return all_docs


    def fetch_ai_information(self):
        """
        Fetch global AI-related information from the CMS.

        Returns:
            dict | None: CMS data for AI configuration or metadata.
        """
        ai_info = self._fetch_cms("ai-global")
        return ai_info.get("data")


cms = CMSService(cms_api_url=settings.CMS_API_URL, api_key=settings.CMS_API_KEY)