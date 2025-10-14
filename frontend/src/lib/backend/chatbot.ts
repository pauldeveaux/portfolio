import {fetchBackend} from "@/lib/backend/fetchBackend";
import {ChatMessage} from "@/types/ChatMessage";


export async function sendChatbotMessage(message: ChatMessage) {
    return fetchBackend<{ question: string, answer: string}>(
        "/chatbot/send-message",
        {
            method: "POST",
            body: message,
        }
    )
}