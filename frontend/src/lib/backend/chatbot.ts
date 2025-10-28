import {fetchBackend, TimeoutError} from "@/lib/backend/fetchBackend";
import {ChatMessage} from "@/types/ChatMessage";
import getSessionId from "@/components/session/session";

export class ChatbotError extends Error {
    constructor(message?: string) {
        super(message || "Désolé, je ne peux pas répondre pour le moment.");
        this.name = "ChatbotError";
    }
}

export async function sendChatbotMessage(message: ChatMessage) {
    const sessionId = getSessionId();

    try {
        return await fetchBackend<{ question: string, answer: string }>(
            "/chatbot/send-message",
            {
                method: "POST",
                body: {
                    message: message.message,
                    sessionId
                },
            },
            15000
        );
    } catch (err: unknown) {
        if (err instanceof TimeoutError) {
            throw new ChatbotError(
                "Le serveur a mis trop de temps à répondre. Veuillez réessayer plus tard."
            );
        }
        throw err;
    }
}