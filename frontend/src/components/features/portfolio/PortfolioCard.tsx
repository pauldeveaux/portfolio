import { motion } from "motion/react";
import {useEffect, useState} from "react";
import PortfolioModal from "@/components/features/portfolio/PortfolioModal";


export interface PortfolioCardProps {
    title: string;
    imageUrl: string;
    shortDescription: string;
    fullDescription: string;
    tags?: string[];
    size?: "small" | "medium" | "large";
    links?: { label: string; url: string }[];
    className?: string;
}




export default function PortfolioCard({ title, imageUrl, shortDescription, fullDescription, tags, links, className }: PortfolioCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [markdownContent, setMarkdownContent] = useState(`
    This is a [Next.js](https://nextjs.org) project bootstrapped with [\`create-next-app\`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying \`app/page.tsx\`. The page auto-updates as you edit the file.

This project uses [\`next/font\`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

    `);

    useEffect(() => {
        async function fetchMarkdown() {
            try {
                const res = await fetch(`/api/project-markdown?title=${encodeURIComponent(title)}`);
                if (res.ok) {
                    const data = await res.text();
                    setMarkdownContent(data);
                }
            } catch (err) {
                console.error(err);
            }
        }

        fetchMarkdown();
    }, [title]);

    return (
        <>
            <motion.div
                className={`relative group flex flex-col rounded-xl 
                overflow-hidden shadow-xl bg-white hover:shadow-lg p-1 hover:cursor-pointer
                transition-shadow duration-300 w-full ${className}`}
                onClick={() => setIsModalOpen(true)}
            >
                {/* Image */}
                <motion.img src={imageUrl} alt={title} className="w-full h-56 object-cover"/>

                {/* Contenu permanent (titre + tags) */}
                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold mb-2">{title}</h3>
                    <div className="flex items-center justify-between">
                        <p className="text-gray-600 italic">{shortDescription}</p>
                        <div className="flex flex-wrap gap-2">
                            {tags && tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="text-sm px-2 py-1 rounded-full bg-gray-100 text-gray-800 shadow-xl"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            <PortfolioModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={title}
                imageUrl={imageUrl}
                markdownContent={markdownContent}
                links={links}
            />
        </>
    );
}