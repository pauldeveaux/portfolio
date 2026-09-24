"use client";
import {useEffect, useRef, useState} from "react";
import {Document, Page, pdfjs} from "react-pdf";
import {Loader2} from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
).toString();

/**
 * Props for the PdfViewer component.
 */
interface PdfViewerProps {
    /** URL of the PDF to render */
    url: string;
    /** Rendered when the PDF cannot be loaded */
    error: React.ReactNode;
}

/**
 * PdfViewer component.
 *
 * Renders every page of a PDF with pdf.js, scaled to the container width.
 * Used instead of an <iframe> because mobile browsers don't display embedded PDFs
 * (blank frame on Android, first page only on iOS).
 */
export default function PdfViewer({url, error}: PdfViewerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState<number>();
    const [numPages, setNumPages] = useState(0);

    // Track container width so pages always fit horizontally
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const loader = (
        <div className="flex justify-center py-16 text-gray-400">
            <Loader2 className="animate-spin" size={32}/>
        </div>
    );

    return (
        <div ref={containerRef} className="w-full">
            {width && (
                <Document
                    file={url}
                    onLoadSuccess={({numPages}) => setNumPages(numPages)}
                    loading={loader}
                    error={error}
                    className="flex flex-col gap-4"
                >
                    {Array.from({length: numPages}, (_, i) => (
                        <Page
                            key={i}
                            pageNumber={i + 1}
                            width={width}
                            loading={loader}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            className="shadow-md"
                        />
                    ))}
                </Document>
            )}
        </div>
    );
}
