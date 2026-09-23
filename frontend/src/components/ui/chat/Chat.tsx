'use client';
import Message, {ChatMessageProps, createPendingMessage} from "@/components/ui/chat/Message";
import React, {useEffect, useRef, useState} from "react";
import TextareaAutosize from 'react-textarea-autosize';
import {Send} from "lucide-react";
import {useIsMobile} from "@/components/features/hooks/useIsMobile";
import {ChatbotError, sendChatbotMessage} from "@/lib/backend/chatbot";


/**
 * Props for the Chat component.
 *
 * @property {string} defaultAIMessage - The default AI message
 */
export interface ChatProps {
    defaultAIMessage: string;
}

function createMessage(type: ChatMessageProps['type'], text: string): ChatMessageProps {
    return { id: crypto.randomUUID(), type, text };
}

export default function Chat({defaultAIMessage}: ChatProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const [messages, setMessages] = useState<ChatMessageProps[]>(() => [
        createMessage("ai", defaultAIMessage)
    ]);
    const [waiting, setWaiting] = useState(false); // Prevent multiple sends during pending state
    const isMobile = useIsMobile(); // Custom hook to detect mobile screen

    /**
     * Scrolls chat container to the bottom.
     */
    const scrollToBottom = () => {
        if (!chatContainerRef.current) return;
        chatContainerRef.current.scrollTo({top: chatContainerRef.current.scrollHeight, behavior: "smooth"});
    };

    // Auto-scroll whenever messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    const replacePendingMessageByAnswer = (
        answerMessage: string,
        pendingIndex: number,
        type?: ChatMessageProps['type']
    ) => {
        setMessages((prev) => {
            const newMessages = [...prev];
            if (newMessages[pendingIndex]?.type === "pending") {
                newMessages[pendingIndex] = createMessage(type ?? "ai", answerMessage);
            }
            return newMessages;
        });
    }

    const sendMessage = async (message: string, pendingIndex: number) => {
        setWaiting(true);
        try {
            const response = await sendChatbotMessage({message: message});
            replacePendingMessageByAnswer(response.answer, pendingIndex);
        } catch(err) {
            let errorMessage = "Désolé, je ne peux pas répondre pour le moment.";
            if (err instanceof ChatbotError) {
                errorMessage = err.message;
            }
            replacePendingMessageByAnswer(errorMessage, pendingIndex, "error");
        } finally {
            setWaiting(false);
        }
    }

    const handleSend = () => {
        if (waiting) return;
        if (!textareaRef.current) return;

        const text = textareaRef.current.value.trim();
        if (!text) return;

        const userMessage = createMessage("user", text);
        const pendingMessage = createPendingMessage();
        textareaRef.current.value = "";

        setMessages((prev) => [...prev, userMessage, pendingMessage]);
        sendMessage(text, messages.length + 1);
    };

    /**
     * Handle Enter key press for sending messages.
     *
     * - Shift + Enter inserts a newline.
     * - Enter alone sends the message.
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div
            className="flex flex-col max-h-[60vh] mx-auto p-6
            border border-black/20 rounded-2xl shadow-xl
            bg-gradient-to-b from-white/80 via-white/60 to-white/30 backdrop-blur-md
            w-full max-w-2xl
            md:w-2xl">
            <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto mb-4 flex flex-col gap-2"
            >
                {messages.map((msg) => (
                    <Message key={msg.id} id={msg.id} text={msg.text} type={msg.type}/>
                ))}
                <div ref={messagesEndRef}/>
            </div>

            <div className="flex flex-row sm:flex-row gap-2 mt-2 items-end">
                <TextareaAutosize
                    ref={textareaRef}
                    placeholder="Posez une question ici..."
                    className="flex-1 w-full p-3 rounded-2xl border border-separator-light-1 bg-main-5/50 backdrop-blur-sm resize-none focus:outline-none focus:ring-2 focus:ring-main-1"
                    maxRows={5}
                    minRows={1}
                    onKeyDown={handleKeyDown}
                />
                <button
                    id="chatbot-send-button"
                    className={`flex-shrink-0 px-5 py-3 rounded-2xl font-semibold transition-colors
                        ${waiting
                        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                        : "bg-[#107E7D] text-white hover:bg-[#0E6B6B] cursor-pointer"
                    }`}
                    onClick={handleSend}
                    disabled={waiting}
                >
                    {isMobile ? <Send/> : <>Envoyer</>}
                </button>
            </div>
        </div>
    );
}
