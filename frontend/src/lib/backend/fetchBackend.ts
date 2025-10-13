
export interface FetchBackendOptions {
    method?: 'GET' | 'POST';
    body?: unknown;
    headers?: Record<string, string>
}

export async function fetchBackend<T>(
    endpoint: string,
    options: FetchBackendOptions = {}
): Promise<T> {
    const backend_url = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    const { method = 'GET', body, headers = {}} = options;

    const res = await fetch(`${backend_url}${endpoint}`,
        {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: body? JSON.stringify(body): undefined,
        })

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || `Request failed with status ${res.status}`);
    }

    return res.json() as Promise<T>
}