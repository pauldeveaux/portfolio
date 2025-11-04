import {motion} from "motion/react";
import ReactMarkdown from "react-markdown";
import Linkify from "linkify-react";

/**
 * Props for a chat message.
 */
export interface ChatMessageProps {
    /** Text content of the message */
    text: string;
    /** Type of message:
     * - `user` for user messages
     * - `ai` for AI messages
     * - `pending` for typing indicator
     */
    type: "user" | "ai" | "pending" | "error";
}

/**
 * A placeholder message used to simulate AI typing.
 */
export const PENDING_MESSAGE: ChatMessageProps = {
    type: "pending",
    text: ""
};


/**
 * TailwindCSS classes applied to each message type.
 * - `user`: aligned to right, green gradient
 * - `ai`: aligned to left, gray gradient
 * - `pending`: aligned to left, gray italic with animated dots
 */
const messageStyles: Record<ChatMessageProps["type"], string> = {
    user: "self-end bg-gradient-to-r from-[#14A3A2] to-[#14A3A2] text-white drop-shadow-md text-left",
    ai: "self-start bg-gradient-to-r from-[#d9d9d9] to-[#f0f0f0] text-gray-900 drop-shadow-md text-left",
    pending: "self-start bg-gradient-to-r from-[#e0e0e0] to-[#f5f5f5] text-gray-500 italic drop-shadow-md",
    error: "self-start bg-[#fef2f2] text-[#b91c1c] border border-[#fecaca] shadow-sm text-left",
};

/**
 * Chat message component.
 *
 * Renders a single message bubble with animation.
 * - Uses framer-motion for fade-in and slide-up effect.
 * - Pending messages display three animated dots.
 */
export default function Message({text, type}: ChatMessageProps) {
    const linkifyOptions = {
        target: "_blank",
        rel: "noopener noreferrer",
        className: "text-blue-600 underline",
    };

    return (
        <motion.div
            initial={{opacity: 0, y: 10}} // slide up + fade in
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.3}}
            className={`mb-3 p-4 max-w-[75%] rounded-xl shadow-md break-words ${messageStyles[type]}`}
            style={{whiteSpace: "pre-wrap"}} // preserve line breaks
        >
            {type === "pending" ? (
                <div className="flex gap-1 w-6 h-4 align-center font-sans">
                    {/* Animated typing dots */}
                    <motion.span
                        animate={{opacity: [0.2, 1, 0.2]}}
                        transition={{duration: 1, repeat: Infinity}}
                    >
                        •
                    </motion.span>
                    <motion.span
                        animate={{opacity: [0.2, 1, 0.2]}}
                        transition={{duration: 1, repeat: Infinity, delay: 0.2}}
                    >
                        •
                    </motion.span>
                    <motion.span
                        animate={{opacity: [0.2, 1, 0.2]}}
                        transition={{duration: 1, repeat: Infinity, delay: 0.4}}
                    >
                        •
                    </motion.span>
                </div>
            ) : (
                <Linkify options={linkifyOptions}>
                    <ReactMarkdown
                        children={text}
                        components={{
                            a: ({node, ...props}) => (
                                <a {...props} target="_blank" rel="noopener noreferrer"
                                   className="text-blue-600 underline"/>
                            ),
                        }}
                    />
                </Linkify>
            )}
        </motion.div>
    );
}
