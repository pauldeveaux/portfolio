import { motion } from "motion/react";



export interface ChatMessageProps {
    text: string;
    type: "user" | "ai";
}

export default function Message({ text, type}: ChatMessageProps) {
    return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`mb-3 p-4 max-w-[75%] rounded-xl shadow-md break-words
        ${type === "user"
          ? "self-end bg-gradient-to-r from-[#14A3A2] to-[#14A3A2] text-white drop-shadow-md"
          : "self-start bg-gradient-to-r from-[#d9d9d9] to-[#f0f0f0] text-gray-900 drop-shadow-md"
        }`}
      style= {{ whiteSpace: "pre-wrap"}} // line breaks
    >
      {text}
    </motion.div>
    )
}