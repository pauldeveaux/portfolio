import {motion} from "motion/react";


export interface ChatMessageProps {
    text: string;
    type: "user" | "ai" | "pending";
}

export const PENDING_MESSAGE : ChatMessageProps = {
    type: "pending",
    text: ""
}

const messageStyles: Record<ChatMessageProps["type"], string> = {
    user: "self-end bg-gradient-to-r from-[#14A3A2] to-[#14A3A2] text-white drop-shadow-md",
    ai: "self-start bg-gradient-to-r from-[#d9d9d9] to-[#f0f0f0] text-gray-900 drop-shadow-md",
    pending: "self-start bg-gradient-to-r from-[#e0e0e0] to-[#f5f5f5] text-gray-500 italic drop-shadow-md",
};

export default function Message({text, type}: ChatMessageProps) {

    return (
        <motion.div
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.3}}
            className={`mb-3 p-4 max-w-[75%] rounded-xl shadow-md break-words ${messageStyles[type]}`}
            style={{whiteSpace: "pre-wrap"}} // line breaks
        >
            {type === "pending" ? (
        <div className="flex gap-1 w-6 h-4 align-center">
          {/* Bulle fixe, 3 points animés */}
          <motion.span
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            •
          </motion.span>
          <motion.span
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          >
            •
          </motion.span>
          <motion.span
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
          >
            •
          </motion.span>
        </div>
      ) : (
        text
      )}
    </motion.div>
    )
}