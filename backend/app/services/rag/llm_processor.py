from langchain.chat_models import init_chat_model
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
        self.model = "mistral-large-latest"
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
                "Tu es X, et tu réponds comme si tu étais toi-même dans une conversation. "
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

    def execute(self, question, docs_content):
        """
        Generates an answer to a question based on the provided document context.

        Args:
            question (str): The user's question.
            docs_content (str): Concatenated content of retrieved documents.

        Returns:
            dict: The LLM-generated answer under the 'answer' key.
        """
        messages = self.prompt_template.invoke({"question": question, "context": docs_content})
        response = self.llm.invoke(messages)
        return {"answer": response.content}
