import Message, { ChatMessageProps, PENDING_MESSAGE } from "@/components/ui/chat/Message";
import React, { useEffect, useRef, useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import { Send } from "lucide-react";
import { useIsMobile } from "@/utils/useIsMobile";

/**
 * Default AI greeting message.
 */
const AIMessage: ChatMessageProps = {
    type: "ai",
    text: "Bonjour ! Je suis l’assistant virtuel de mon portfolio. Posez-moi des questions sur mes projets, compétences ou expériences.",
};

/**
 * Chat component.
 *
 * Provides an interactive chat interface with simulated AI responses.
 *
 * Features:
 * - Auto-scroll to bottom on new messages.
 * - Pending message placeholder to simulate typing.
 * - Handles sending messages via Enter or button click.
 * - Responsive UI with textarea resizing.
 */
export default function Chat(){
    const messagesEndRef = useRef<HTMLDivElement>(null); // Ref to scroll to bottom
    const textareaRef = useRef<HTMLTextAreaElement>(null); // Ref to read input value
    const chatContainerRef = useRef<HTMLDivElement>(null); // Ref to scrollable container

    const [messages, setMessages] = useState<ChatMessageProps[]>([AIMessage]); // Chat messages
    const [waiting, setWaiting] = useState(false); // Prevent multiple sends during pending state
    const isMobile = useIsMobile(); // Custom hook to detect mobile screen

    const timeoutsRef = useRef<number[]>([]); // Track pending timeouts for cleanup if needed

    /**
     * Scrolls chat container to the bottom.
     */
    const scrollToBottom = () => {
        if (!chatContainerRef.current) return;
        chatContainerRef.current.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: "smooth" });
    };

    // Auto-scroll whenever messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    /**
     * Adds a pending message after a short delay to simulate typing.
     */
    const waitingResponse = () => {
        const typingDelayBeforeShowing = 500; // Delay in ms before showing the "typing" placeholder
        const timeoutId = window.setTimeout(() => {
            setMessages((prev) => [...prev, PENDING_MESSAGE]);
        }, typingDelayBeforeShowing);

        timeoutsRef.current.push(timeoutId);
    };

    /**
     * Simulates an AI response by replacing the last pending message.
     *
     * @param pendingIndex - Index of the pending message to replace
     */
    const simulateResponse = (pendingIndex: number) => {
        setTimeout(() => {
            setMessages((prev) => {
                const newMessages = [...prev];

                // Only replace if the last message is still pending
                if (newMessages[pendingIndex]?.type === "pending") {
                    newMessages[pendingIndex] = {
                        type: "ai",
                        text: "Réponse automatique de l'IA",
                    };
                }

                return newMessages;
            });

            setWaiting(false); // Allow new messages to be sent
        }, 2000); // Simulated response delay
    };

    /**
     * Handles sending a message.
     * Adds user's message and a pending message, then triggers simulated response.
     */
    const handleSend = () => {
        if (waiting) return; // Prevent sending multiple messages simultaneously
        if (!textareaRef.current) return;

        const text = textareaRef.current.value.trim();
        if (!text) return;

        const userMessage: ChatMessageProps = { type: "user", text };
        textareaRef.current.value = ""; // Clear input

        setMessages((prev) => {
            const next = [...prev, userMessage, PENDING_MESSAGE];
            const pendingIndex = next.length - 1;

            setWaiting(true);

            // Simulate AI response
            simulateResponse(pendingIndex);

            return next;
        });
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
                {messages.map((msg, idx) => (
                    <Message key={idx} text={msg.text} type={msg.type} />
                ))}
                <div ref={messagesEndRef} />
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
                    className={`flex-shrink-0 px-5 py-3 rounded-2xl font-semibold transition-colors
                        ${waiting
                            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                            : "bg-[#107E7D] text-white hover:bg-[#0E6B6B] cursor-pointer"
                        }`}
                    onClick={handleSend}
                    disabled={waiting}
                >
                    {isMobile ? <Send /> : <>Envoyer</>}
                </button>
            </div>
        </div>
    );
}
