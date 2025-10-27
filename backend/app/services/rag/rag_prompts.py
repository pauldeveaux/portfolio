from langchain_core.messages import SystemMessage
from langchain_core.prompts import ChatPromptTemplate





def format_prompt(prompt_template, historic, **kwargs):
    system_message_content = prompt_template.invoke(kwargs).to_string()
    system_message = SystemMessage(system_message_content)

    print(system_message)
    print(historic)

    prompt = [system_message] + historic
    return prompt


def build_prompt_with_context(
        historic,
        name: str = "une IA",
        docs_content = ""
):
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
    if not name:
        name = "une IA"

    prompt_template = ChatPromptTemplate.from_messages([
        (
            "system",
            "Tu es {name}, et tu réponds comme si tu étais toi-même dans une conversation. "
            "Les questions traiteront principalement de toi et de ton expérience. "
            "Tu ne dois te baser que sur le contexte, n'invente rien. "
            "Tes réponses doivent être naturelles, simples et à la première personne. "
        ),
    ])

    prompt = format_prompt(
        prompt_template,
        historic,
        name=name
    )

    return prompt
