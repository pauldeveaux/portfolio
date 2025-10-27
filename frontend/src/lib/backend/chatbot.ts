import {fetchBackend} from "@/lib/backend/fetchBackend";
import {ChatMessage} from "@/types/ChatMessage";
import getSessionId from "@/components/session/session";


export async function sendChatbotMessage(message: ChatMessage) {
    const sessionId = getSessionId();

    return fetchBackend<{ question: string, answer: string}>(
        "/chatbot/send-message",
        {
            method: "POST",
            body: {
                message: message.message,
                sessionId
            },
        }
    )
}