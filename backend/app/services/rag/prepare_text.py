def prepare_text(titles: list, contents: list, links: list):
    """
    Prepare a complete text for RAG by formatting titles, contents, and links.

    Args:
        titles (list): List of titles.
        contents (list): List of content strings.
        links (list): List of links (URLs or emails).

    Returns:
        tuple: (title_text, full_text) where full_text is the combined formatted text.
    """

    # Format titles
    title_text = ""
    if titles:
        title_text = "[Title]: " + " - ".join(titles) + "\n\n"

    # Format contents
    content_text = ""
    if contents:
        content_text = "\n\n".join(contents) + "\n\n"  # Add spacing between sections

    # Format links
    link_text = ""
    if links:
        # Each link on its own line with a "- " prefix
        link_text = "[Links]:\n" + "\n".join(f"- {link}" for link in links)

    # Combine all parts
    full_text = f"{title_text}{content_text}{link_text}".strip()

    return title_text.strip(), full_text


def concatenate_texts(texts: list):
    """
    Concatenate multiple text sections into a single text with separators.

    Args:
        texts (list): List of text strings to concatenate.

    Returns:
        str: Combined text with sections separated by "\n\n---\n\n".
    """
    full_text = "\n\n---\n\n".join(texts)
    return full_text
