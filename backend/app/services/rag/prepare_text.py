


def prepare_text(titles: list, contents: list, links: list):
    """
    Prépare un texte complet pour le RAG, en formatant titres, contenus et liens.

    Args:
        titles (list): Liste de titres.
        contents (list): Liste de contenus/textes.
        links (list): Liste de liens (URLs ou emails).

    Returns:
        tuple: (title_text, full_text) où full_text est le texte complet.
    """

    # Formatage des titres
    title_text = ""
    if titles:
        title_text = "[Titre] : " + " - ".join(titles) + "\n\n"

    # Formatage des contenus
    content_text = ""
    if contents:
        content_text = "\n\n".join(contents) + "\n\n"  # Ajouter un saut entre sections

    # Formatage des liens
    link_text = ""
    if links:
        # Chaque lien sur sa ligne avec un "- " et un label optionnel si nécessaire
        link_text = "[Liens] :\n" + "\n".join(f"- {link}" for link in links)

    # Texte complet
    full_text = f"{title_text}{content_text}{link_text}".strip()

    return title_text.strip(), full_text


def concatenate_texts(texts):
    full_text = "\n\n---\n\n".join(texts)
    return full_text