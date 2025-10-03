import Message, {ChatMessageProps, PENDING_MESSAGE} from "@/components/ui/chat/Message";
import React, {useEffect, useRef, useState} from "react";
import TextareaAutosize from 'react-textarea-autosize';
import {Send} from "lucide-react"
import {useIsMobile} from "@/utils/useIsMobile";


const AIMessage: ChatMessageProps = {
    type: "ai",
    text: "Bonjour ! Je suis l’assistant virtuel de mon portfolio. Posez-moi des questions sur mes projets, compétences ou expériences.",
}

export default function Chat() {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<ChatMessageProps[]>([AIMessage]);
    const [waiting, setWaiting] = useState(false); // bloque l’envoi pendant pending
    const isMobile = useIsMobile();

    const timeoutsRef = useRef<number[]>([]);


    // Auto scroll
    const scrollToBottom = () => {
        if (!chatContainerRef.current) return;
        const container = chatContainerRef.current;
        container.scrollTo({top: container.scrollHeight, behavior: "smooth"});
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    const waitingResponse = () => {
        const typingDelayBeforeShowing = 500;
        const timeoutId = window.setTimeout(() => {
            setMessages((prev) => {
                return [...prev, PENDING_MESSAGE];
            });
        }, typingDelayBeforeShowing);

        timeoutsRef.current.push(timeoutId);
    };

    // Simule une réponse et remplace le dernier pending
    const simulateResponse = (pendingIndex: number) => {
        setTimeout(() => {
            setMessages((prev) => {
                const newMessages = [...prev];
                if (newMessages[pendingIndex]?.type === "pending") {
                    newMessages[pendingIndex] = {
                        type: "ai",
                        text: "Réponse automatique de l'IA",
                    };
                }
                return newMessages;
            });
            setWaiting(false);
        }, 2000);
    };


    // Send Message
    const handleSend = () => {
        if (waiting) return;
        if (!textareaRef.current) return;
        const text = textareaRef.current.value.trim();
        if (!text) return;

        const userMessage: ChatMessageProps = {type: "user", text};
        textareaRef.current.value = "";

        setMessages((prev) => {
            const next = [...prev, userMessage, PENDING_MESSAGE];
            const pendingIndex = next.length - 1;

            setWaiting(true);

            // TODO DELETE
            simulateResponse(pendingIndex);

            return next;
        });
    };

    // Send via enter
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
                {messages.map((msg, idx) => (
                    <Message key={idx} text={msg.text} type={msg.type}/>
                ))}
                <div ref={messagesEndRef}/>
            </div>

            <div className="flex flex-row sm:flex-row gap-2 mt-2 items-end">
                < TextareaAutosize
                    ref={textareaRef}
                    placeholder="Posez une question ici..."
                    className="flex-1 w-full p-3 rounded-2xl border border-separator-light-1 bg-main-5/50 backdrop-blur-sm resize-none focus:outline-none focus:ring-2 focus:ring-main-1"
                    maxRows={5}
                    minRows={1}
                    onKeyDown={handleKeyDown}
                />
                <button
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