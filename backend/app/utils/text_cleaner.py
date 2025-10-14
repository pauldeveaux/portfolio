import re
from html import unescape

def clean_text(text: str) -> str:
    if not text:
        return ""

    # Unescape HTML entities (&nbsp;, &amp;, etc.)
    text = unescape(text)

    # Remove HTML tags
    text = re.sub(r"<[^>]+>", "", text)

    # Remove Markdown syntax (basic)
    text = re.sub(r"[*_`#>\-\[\]()~]", " ", text)

    # Replace multiple newlines with one
    text = re.sub(r"\n\s*\n+", "\n\n", text)

    # Replace multiple spaces/tabs with one space
    text = re.sub(r"[ \t]+", " ", text)

    # Trim leading/trailing whitespace
    text = text.strip()

    return text