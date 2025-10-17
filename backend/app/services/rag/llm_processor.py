from typing import Dict

from langchain.chat_models import init_chat_model
from langchain_core.messages import SystemMessage, HumanMessage
from langchain_core.prompts import ChatPromptTemplate


from app.core.config import settings


class LLMProcessor:
    """
    Handles interaction with the LLM for text generation using a custom chat prompt.
    """

    def __init__(self):
        """
        Initializes the chat model and prepares the chat prompt template.
        """
        self.model = settings.MISTRAL_MODEL_NAME
        self.llm = init_chat_model(
            "mistral-large-latest",
            model_provider="mistralai",
            api_key=settings.MISTRAL_API_KEY
        )

        self.prompt_template = self._create_chat_prompt_template()

    def _create_chat_prompt_template(self) -> ChatPromptTemplate:
        """
        Creates a chat prompt template with system and human instructions.

        Returns:
            ChatPromptTemplate: The structured chat prompt template.
        """
        prompt_template = ChatPromptTemplate.from_messages([
            (
                "system",
                "Tu es {name}, et tu réponds comme si tu étais toi-même dans une conversation. "
                "Tes réponses doivent être naturelles, simples et à la première personne. "
                "Appuie-toi uniquement sur les infos du contexte extrait de ton portfolio. "
                "Si tu ne sais pas, dis-le simplement. "
                "Évite les phrases longues, les formules trop formelles ou les introductions. "
                "Réponds comme dans un chat, en 1 à 3 phrases maximum, sans formatage spécial."
            ),
            (
                "human",
                "Contexte extrait de mon portfolio :\n{context}\n\n"
                "Question : {question}\n\n"
                "Réponds comme si c’était toi, à la première personne."
            ),
        ])
        return prompt_template









    def execute(self, state, ai_information: Dict, docs_content):
        question = getattr(state, "question", None)

        if not question and isinstance(state, dict) and "messages" in state:
            human_messages = [m for m in state["messages"] if isinstance(m, HumanMessage)]
            if human_messages:
                question = human_messages[-1].content


        question = question or "Je n’ai pas trouvé la question."


        system_message_content = self.prompt_template.invoke(
            {
                "name": ai_information.get("name","une IA"),
                "question": question,
                "context": docs_content}
        ).to_string()

        conversation_messages = [
            message
            for message in state["messages"]
            if message.type in ("human", "system")
               or (message.type == "ai" and not message.tool_calls)
        ]

        prompt = [SystemMessage(system_message_content)] + conversation_messages

        print(prompt)

        response = self.llm.invoke(prompt)
        return {"answer": response.content}
