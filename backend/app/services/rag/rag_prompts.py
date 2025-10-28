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
      Build a chat prompt that includes external context (e.g., portfolio or document content).

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
            "Tu es {name}, et tu réponds comme si tu étais toi-même dans une conversation. "
            "Tes réponses doivent être naturelles, simples et à la première personne. "
            "Appuie-toi uniquement sur les infos du contexte. "
            "Tu ne dois te baser que sur le contexte, n'invente rien. "
            "Évite les phrases longues, les formules trop formelles ou les introductions. "
            "Réponds comme dans un chat, en 1 à 3 phrases maximum, sans formatage spécial."
        ),
        (
            "human",
            "Contexte extrait de ton portfolio :\n{context}\n\n"
            "Réponds comme si c’était toi, à la première personne."
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
    Build a chat prompt without any external context, relying solely on conversation history.

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
            "Tu es {name}, et tu réponds comme si tu étais toi-même dans une conversation. "
            "Les questions traiteront principalement de toi et de ton expérience. "
            "Utilise seulement le contexte et ton historique. Si ce n'est pas dedans, dis que tu n'as pas les informations. "
            "Tes réponses doivent être naturelles, simples et à la première personne. "
        ),
    ])

    prompt = format_prompt(
        prompt_template,
        historic,
        name=name
    )

    return prompt
