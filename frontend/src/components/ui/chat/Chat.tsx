import Message, {ChatMessageProps} from "@/components/ui/chat/Message";
import React, {useEffect, useRef, useState} from "react";
import TextareaAutosize from 'react-textarea-autosize';


const AIMessage : ChatMessageProps = {
    type: "ai",
    text: "Bonjour ! Je suis l’assistant virtuel de mon portfolio. Posez-moi des questions sur mes projets, compétences ou expériences.",
}

export default function Chat() {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<ChatMessageProps[]>([AIMessage]);

    // Auto scroll
    const scrollToBottom = () => {
        if (!chatContainerRef.current) return;
        const container = chatContainerRef.current;
        container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);



    // Send Message
    const handleSend = () => {
        if (!textareaRef.current) return;
        const text = textareaRef.current.value.trim();
        if (!text) return;

        const newMessage: ChatMessageProps = {
            type: "user",
            text,
        };

        setMessages([...messages, newMessage]);
        textareaRef.current.value = "";
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
                      className="flex-1 w-full p-3 rounded-2xl border border-gray-300 bg-white/50 backdrop-blur-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#14A3A2]"
                      maxRows={5}
                      minRows={1}
                      onKeyDown={handleKeyDown}
                  />
                <button
                    className="flex-shrink-0 px-5 py-3 rounded-2xl bg-[#107E7D] text-white font-semibold hover:bg-[#0E6B6B]"
                    onClick={handleSend}
                >
                    Envoyer
                </button>
            </div>
        </div>
    );
}