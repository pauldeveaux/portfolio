import { ReactNode, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

/**
 * Converts a Markdown string into a React component using `ReactMarkdown`.
 *
 * Supports GitHub-flavored Markdown (tables, checklists, etc.) via `remarkGfm`
 * and allows inline HTML using `rehypeRaw`.
 *
 * @param markdownContent - The raw Markdown string to render.
 * @returns A `ReactNode` containing the rendered Markdown content.
 *
 * @example
 * ```tsx
 * const rendered = stringToReactMarkdown("# Hello World\nSome **Markdown** here");
 * ```
 */
export function stringToReactMarkdown(markdownContent: string): ReactNode {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]} // support GFM features
            rehypePlugins={[rehypeRaw]} // allow embedded HTML
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
 * Custom React hook to lazily load Markdown content with optional fallback.
 *
 * Automatically converts the fetched Markdown string to a ReactNode using
 * `stringToReactMarkdown`.
 *
 * @param fallbackUrl - Optional URL for a fallback Markdown file (default: "/markdown/fallback.md")
 * @returns An object containing:
 * - `content`: ReactNode representing the rendered Markdown (null if not loaded yet)
 * - `loading`: boolean indicating if the fetch is in progress
 * - `error`: boolean indicating if an error occurred while fetching the main URL
 * - `loadMarkdown`: function to manually trigger Markdown loading
 *
 * @example
 * ```tsx
 * const { content, loading, error, loadMarkdown } = useMarkdownLoader({
 *   fallbackUrl: "/markdown/fallback.md"
 * });
 *
 * useEffect(() => {
 *   loadMarkdown("/markdown/main.md");
 * }, []);
 * ```
 */
export default function useMarkdownLoader({ fallbackUrl = "/markdown/fallback.md" }: MarkdownLoaderProps) {
    const [content, setContent] = useState<ReactNode | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    /**
     * Loads Markdown content from a given URL or fallback URL.
     *
     * Handles errors gracefully:
     * - If the main URL fails, tries the fallback URL.
     * - If fallback fails, displays a simple error message.
     *
     * @param markdownUrl - Optional URL of the Markdown file to fetch.
     */
    const loadMarkdown = async (markdownUrl?: string) => {
        const urlToFetch = markdownUrl || fallbackUrl;
        setLoading(true);

        try {
            const res = await fetch(urlToFetch);
            if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
            const text = await res.text();
            setContent(stringToReactMarkdown(text));
            setError(false);
        } catch (err) {
            console.error(err);
            setError(true);

            // Try fallback if available
            try {
                const res = await fetch(fallbackUrl);
                if (!res.ok) throw new Error(`Failed to fetch fallback: ${res.status}`);
                const text = await res.text();
                setContent(stringToReactMarkdown(text));
            } catch (errFallback) {
                console.error(errFallback);
                setContent(<p>Error while loading …</p>);
            }
        } finally {
            setLoading(false);
        }
    };

    return { content, loading, error, loadMarkdown };
}
