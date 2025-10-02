import {ReactNode, useState} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";






/**
 * Converts a Markdown string into a React component using `ReactMarkdown`.
 *
 * @param markdownContent - The raw Markdown string to render
 * @returns A `ReactNode` containing the rendered Markdown
 */
export function stringToReactMarkdown(markdownContent: string): ReactNode {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]} // support GitHub-flavored Markdown (tables, lists, etc.)
            rehypePlugins={[rehypeRaw]} // allow HTML inside Markdown
        >
            {markdownContent}
        </ReactMarkdown>
    );
}


/**
 * Props for the `useMarkdownLoader` hook.
 */
export interface MarkdownLoaderProps {
    /** Optional URL to fetch the main Markdown content */
    markdownUrl?: string;
    /** Optional URL to fetch fallback Markdown if the main URL fails */
    fallbackUrl?: string;
}


/**
 * Custom React hook to lazily load Markdown content.
 *
 * Provides a fallback mechanism if the main Markdown URL fails or is undefined.
 *
 * @param fallbackUrl - Optional URL of the fallback Markdown file (default: "/markdown/fallback.md")
 * @returns An object containing:
 *   - `content`: the loaded Markdown as a ReactNode (or null if not loaded yet)
 *   - `loading`: boolean indicating if the content is currently being fetched
 *   - `error`: boolean indicating if an error occurred during fetching
 *   - `loadMarkdown`: function to manually trigger loading Markdown from a given URL
 */
export default function useMarkdownLoader({fallbackUrl = "/markdown/fallback.md"}: MarkdownLoaderProps) {
    const [content, setContent] = useState<ReactNode | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    /**
     * Loads Markdown content from a given URL or fallback URL.
     *
     * @param markdownUrl - Optional URL of the Markdown file to fetch
     */
    const loadMarkdown = async (markdownUrl?: string) => {
        // If no content, the fallback markdown will be loaded
        const urlToFetch = markdownUrl || fallbackUrl;
        setLoading(true);

        // First loading
        try {
            const res = await fetch(urlToFetch);
            if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
            const text = await res.text();
            setContent(stringToReactMarkdown(text));
            setError(false);
        } catch (err) {
            console.error(err);
            setError(true);

            // Second try with fallback
            try {
                const res = await fetch(fallbackUrl);
                if (!res.ok) throw new Error(`Failed to fetch fallback: ${res.status}`);
                const text = await res.text();
                setContent(stringToReactMarkdown(text));
            } catch (errFallback) {
                console.error(errFallback);
                setContent(<p>Error while loading …</p>)
            }
        } finally {
            setLoading(false);
        }
    };

    return {content, loading, error, loadMarkdown};
}
