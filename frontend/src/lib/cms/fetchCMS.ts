/**
 * Fetches data from a CMS endpoint and ensures the result is always an array.
 * If the response contains a single object, it wraps it in an array.
 * Returns an empty array if no data is present.
 *
 * @template T - Type of the data returned from the CMS
 * @param endpoint - CMS API endpoint (e.g., "/projects")
 * @param token - Optional Bearer token for authentication
 * @returns Promise resolving to an array of T
 */
export async function fetchCMS<T>(endpoint: string, token?: string): Promise<T[]> {
    const res = await fetch(`${process.env.CMS_API_URL}/api${endpoint}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        cache: "no-store", // always fetch fresh data
    });

    if (!res.ok) throw new Error(`Failed to fetch ${endpoint}: ${res.statusText}`);

    const json = await res.json();

    // Ensure the result is always an array
    if (Array.isArray(json.data)) {
        return json.data as T[];
    } else if (json.data) {
        return [json.data as T];
    } else {
        return [];
    }
}

/**
 * Converts a relative CMS file URL into a full absolute URL.
 *
 * @param fileURL - Relative file path returned by the CMS (e.g., "/uploads/image.png")
 * @returns Full URL including CMS base URL
 */
export function getFileFullUrl(fileURL: string) {
    return `${process.env.CMS_API_URL}${fileURL}`;
}
