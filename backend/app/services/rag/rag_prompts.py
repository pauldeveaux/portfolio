from langchain_core.messages import SystemMessage
from langchain_core.prompts import ChatPromptTemplate





def format_prompt(prompt_template, historic, **kwargs):
    """
    Build a prompt by combining a system message with historic conversation messages.

    Args:
        prompt_template (ChatPromptTemplate): Template for generating the system message.
        historic (list): List of previous messages (HumanMessage, AIMessage, etc.).
        **kwargs: Keyword arguments to fill the template placeholders.

    Returns:
        list: List of messages starting with the system message followed by historic messages.
    """
    system_message_content = prompt_template.invoke(kwargs).to_string()
    system_message = SystemMessage(system_message_content)
    prompt = [system_message] + historic
    return prompt


def build_prompt_with_context(
        historic,
        name: str = "une IA",
        docs_content = ""
):
    """
    Build a prompt that makes the AI speak as if it were the user,
    using only the retrieved personal context.

      Args:
          historic (list): List of previous messages in the conversation.
          name (str, optional): Name of the AI persona. Defaults to "une IA".
          docs_content (str, optional): Contextual content to provide to the AI. Defaults to "".

      Returns:
          list: Formatted messages ready to be passed to the LLM.
      """
    prompt_template = ChatPromptTemplate.from_messages([
        (
            "system",
            "Tu es {name}. Tu t’exprimes à la première personne, comme si c’était toi-même. "
            "Ton rôle est de répondre naturellement et simplement, comme dans une vraie conversation. "
            "Utilise uniquement les informations présentes dans le contexte ci-dessous. "
            "Si une information n’y figure pas, dis simplement que tu ne t’en souviens pas ou que tu n’as pas l’information. "
            "Ne devine jamais. Ne parle pas du 'contexte' ni du fait que tu es une IA. "
            "Réponds en 1 à 3 phrases maximum, sans formules trop formelles ni listes."
        ),
        (
            "human",
            "Voici les informations dont tu disposes sur toi-même :\n\n{context}\n\n"
            "Réponds maintenant comme si c’était toi."
        ),
    ])

    prompt = format_prompt(
        prompt_template,
        historic,
        name=name,
        context=docs_content
    )

    return prompt


def build_prompt_without_context(historic, name: str = "une IA"):
    """
    Build a prompt for when no external context is available.

    Args:
      historic (list): List of previous messages in the conversation.
      name (str, optional): Name of the AI persona. Defaults to "une IA".

    Returns:
      list: Formatted messages ready to be passed to the LLM.
    """
    if not name:
        name = "une IA"

    prompt_template = ChatPromptTemplate.from_messages([
        (
            "system",
            "Tu es {name}. Tu t’exprimes à la première personne, naturellement et simplement. "
            "Tu ne dois parler que de ce qui se trouve dans l’historique de la conversation. "
            "Si tu n’as pas l’information, dis-le clairement ('je ne m’en souviens pas', 'je ne suis pas sûr') ou appelle tes tools. "
            "Ne fais aucune supposition et n’invente jamais. "
            "Réponds en 1 à 3 phrases maximum."
        ),
    ])

    prompt = format_prompt(
        prompt_template,
        historic,
        name=name
    )

    return prompt
