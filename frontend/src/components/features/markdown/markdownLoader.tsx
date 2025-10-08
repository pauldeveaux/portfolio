import {ReactNode, useCallback, useState} from "react";
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
 */
export function stringToReactMarkdown(markdownContent: string): ReactNode {
    return (
        <div className="prose prose-inherit !max-w-full text-current markdown-content">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]} // enable GFM features
                rehypePlugins={[rehypeRaw]} // allow embedded HTML
                components={{
                    p: ({node, ...props}) => <p className="text-inherit" {...props} />,
                    li: ({node, ...props}) => <li className="text-inherit" {...props} />,
                    h1: ({node, ...props}) => <h1 className="text-inherit" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-inherit" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-inherit" {...props} />,
                    h4: ({node, ...props}) => <h4 className="text-inherit" {...props} />,
                    h5: ({node, ...props}) => <h5 className="text-inherit" {...props} />,
                    h6: ({node, ...props}) => <h6 className="text-inherit" {...props} />,
                    a: ({node, ...props}) => <a className="text-inherit underline" {...props} />,
                    strong: ({node, ...props}) => <strong className="text-inherit font-bold" {...props} />,
                    b: ({node, ...props}) => <b className="text-inherit font-bold" {...props} />,
                    em: ({node, ...props}) => <em className="text-inherit italic" {...props} />,
                }}
            >
                {markdownContent}
            </ReactMarkdown>
        </div>
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
 * @param props - Optional configuration including `markdownUrl`, `markdown`, or `fallbackUrl`.
 * @returns An object containing:
 * - `content`: Rendered Markdown as `ReactNode` (null if not loaded yet)
 * - `loading`: `boolean` indicating if the content is being fetched
 * - `error`: `boolean` indicating if an error occurred during fetch
 * - `loadMarkdown`: Function to manually trigger Markdown loading
 */
export default function useMarkdownLoader({
                                              fallbackUrl = "/markdown/fallback.md",
                                          }: MarkdownLoaderProps) {
    const [content, setContent] = useState<ReactNode | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    /**
     * Loads Markdown content from a URL or raw Markdown.
     *
     * - Uses `markdown` if provided, otherwise fetches from `markdownUrl`.
     * - Falls back to `fallbackUrl` if the main fetch fails.
     *
     * @param params - Object containing optional `markdownUrl` and/or `markdown`.
     */
    const loadMarkdown = useCallback(
        async ({
                   markdownUrl,
                   markdown,
               }: {
            markdownUrl?: string;
            markdown?: string;
        }) => {
            if (markdown) {
                setContent(stringToReactMarkdown(markdown));
                setLoading(false);
                setError(false);
                return;
            }

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
        },
        [fallbackUrl]
    );

    return {content, loading, error, loadMarkdown};
}
