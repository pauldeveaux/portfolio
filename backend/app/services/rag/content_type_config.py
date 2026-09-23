from dataclasses import dataclass, field
from typing import List, Optional, Callable


@dataclass
class ContentTypeConfig:
    route: str
    title_keys: List[str]
    content_keys: List[str]
    link_keys: List[str] = field(default_factory=list)
    category_name: str = ""
    aggregate: bool = False
    populate: List[str] = field(default_factory=list)
    metadata_extractor: Optional[Callable] = None


def _experience_metadata(item: dict) -> dict:
    metadata = {}
    if item.get("date"):
        metadata["date"] = item["date"]
    if item.get("type"):
        metadata["type"] = item["type"]
    tags = []
    if item.get("tag"):
        tags.append(item["tag"])
    subtags = item.get("subtags", [])
    if subtags and isinstance(subtags, list):
        tags.extend(t.get("name", "") for t in subtags if isinstance(t, dict) and t.get("name"))
    if tags:
        metadata["tags"] = ", ".join(tags)
    return metadata


def _project_metadata(item: dict) -> dict:
    tags = item.get("tags", [])
    if tags and isinstance(tags, list):
        tag_names = [t.get("name", "") for t in tags if isinstance(t, dict) and t.get("name")]
        if tag_names:
            return {"tags": ", ".join(tag_names)}
    return {}


def _skill_metadata(item: dict) -> dict:
    category = item.get("category")
    if category and isinstance(category, dict) and category.get("title"):
        return {"type": category["title"]}
    return {}


CONTENT_TYPE_CONFIGS = {
    "api::experience.experience": ContentTypeConfig(
        route="experiences",
        title_keys=["title", "subtitle"],
        content_keys=["text"],
        category_name="Expériences",
        populate=["subtags"],
        metadata_extractor=_experience_metadata,
    ),
    "api::project.project": ContentTypeConfig(
        route="projects",
        title_keys=["title"],
        content_keys=["description", "markdown"],
        category_name="Projets",
        populate=["tags"],
        metadata_extractor=_project_metadata,
    ),
    "api::skill.skill": ContentTypeConfig(
        route="skills",
        title_keys=["name"],
        content_keys=["description"],
        category_name="Compétences",
        populate=["category"],
        metadata_extractor=_skill_metadata,
    ),
    "api::contact-link.contact-link": ContentTypeConfig(
        route="contact-links",
        title_keys=["socialMedia"],
        content_keys=["text"],
        link_keys=["link"],
        category_name="Contacts",
        aggregate=True,
    ),
    "api::homepage.homepage": ContentTypeConfig(
        route="homepage",
        title_keys=["textSectionTitle"],
        content_keys=["textSectionText"],
        category_name="Plus sur toi",
    ),
    "api::ai-document.ai-document": ContentTypeConfig(
        route="ai-documents",
        title_keys=["title"],
        content_keys=["text"],
        category_name="Informations",
    ),
}


def get_config_by_uid(uid: str) -> Optional[ContentTypeConfig]:
    return CONTENT_TYPE_CONFIGS.get(uid)


def get_config_by_route(route: str) -> Optional[ContentTypeConfig]:
    for config in CONTENT_TYPE_CONFIGS.values():
        if config.route == route:
            return config
    return None
