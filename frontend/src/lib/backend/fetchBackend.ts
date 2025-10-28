export interface FetchBackendOptions {
    method?: 'GET' | 'POST';
    body?: unknown;
    headers?: Record<string, string>
}


export class TimeoutError extends Error {
    constructor(message?: string) {
        super(message || "The request timed out.");
        this.name = "TimeoutError";
    }
}


export async function fetchBackend<T>(
    endpoint: string,
    options: FetchBackendOptions = {},
    timeout = 10000
): Promise<T> {
    const backend_url = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    const {method = 'GET', body, headers = {}} = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const res = await fetch(`${backend_url}${endpoint}`,
            {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers
                },
                body: body ? JSON.stringify(body) : undefined,
                signal: controller.signal
            })

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.detail || `Request failed with status ${res.status}`);
        }

        return res.json() as Promise<T>
    }
    catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") {
            throw new TimeoutError("The server took too long to respond. Please try again later.");
        } else if (err instanceof Error) {
            throw err;
        } else {
            throw new Error("An unknown backend error occurred.");
        }
    }
    finally {
        clearTimeout(id);
    }
}