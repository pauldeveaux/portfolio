import { ReactNode, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

/**
 * Converts a Markdown string into a React component using `ReactMarkdown`.
 *
 * Supports GitHub-flavored Markdown (tables, checklists, etc.) via `remarkGfm`
 * and allows inline HTML rendering via `rehypeRaw`.
 *
 * @param markdownContent - The raw Markdown string to render.
 * @returns A `ReactNode` containing the rendered Markdown.
 *
 * @example
 * ```tsx
 * const rendered = stringToReactMarkdown("# Hello World\nSome **Markdown** here");
 * ```
 */
export function stringToReactMarkdown(markdownContent: string): ReactNode {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]} // enable GFM features
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
    /** Optional raw Markdown text */
    markdown?: string;
    /** Optional URL to fetch fallback Markdown if fetching the main URL fails */
    fallbackUrl?: string;
}

/**
 * React hook to lazily load Markdown content.
 *
 * Supports providing raw Markdown directly or fetching it from a URL.
 * If fetching fails, an optional fallback URL is used.
 *
 * @param fallbackUrl - URL to fallback Markdown if main content cannot be loaded.
 * @returns An object containing:
 * - `content`: Rendered Markdown as `ReactNode` (null if not loaded yet)
 * - `loading`: `boolean` indicating if the content is being fetched
 * - `error`: `boolean` indicating if an error occurred during fetch
 * - `loadMarkdown`: Function to manually trigger Markdown loading
 *
 * @example
 * ```tsx
 * const { content, loading, error, loadMarkdown } = useMarkdownLoader({
 *   fallbackUrl: "/markdown/fallback.md"
 * });
 *
 * useEffect(() => {
 *   loadMarkdown({ markdownUrl: "/markdown/main.md" });
 * }, []);
 * ```
 */
export default function useMarkdownLoader({
    fallbackUrl = "/markdown/fallback.md",
}: MarkdownLoaderProps) {
    const [content, setContent] = useState<ReactNode | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    /**
     * Loads Markdown content either from a URL or directly from raw Markdown text.
     *
     * - Uses `markdown` if provided, otherwise fetches from `markdownUrl`.
     * - Falls back to `fallbackUrl` if the main fetch fails.
     *
     * @param params - Object containing optional `markdownUrl` and/or `markdown`
     */
    const loadMarkdown = async ({
        markdownUrl,
        markdown,
    }: {
        markdownUrl?: string;
        markdown?: string;
    }) => {
        // Use raw Markdown if provided
        if (markdown) {
            setContent(stringToReactMarkdown(markdown));
            setLoading(false);
            setError(false);
            return;
        }

        // Otherwise, fetch from URL
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

            // If this wasn't the fallback URL, attempt to fetch fallback
            if (urlToFetch !== fallbackUrl) {
                try {
                    const resFallback = await fetch(fallbackUrl);
                    if (!resFallback.ok)
                        throw new Error(`Failed to fetch fallback: ${resFallback.status}`);
                    const textFallback = await resFallback.text();
                    setContent(stringToReactMarkdown(textFallback));
                } catch (errFallback) {
                    console.error(errFallback);
                    setContent(<p>Error while loading …</p>);
                }
            } else {
                setContent(<p>Error while loading …</p>);
            }
        } finally {
            setLoading(false);
        }
    };

    return { content, loading, error, loadMarkdown };
}
