export async function fetchCMS<T>(endpoint: string, token?: string): Promise<T[]> {
    const res = await fetch(`${process.env.CMS_API_URL}${endpoint}`, {
        headers: token ? {Authorization: `Bearer ${token}`} : undefined,
        cache: "no-store",
    });

    if (!res.ok) throw new Error(`Failed to fetch ${endpoint}: ${res.statusText}`);

    const json = await res.json();

    if (Array.isArray(json.data)) {
        return json.data as T[];
    } else if (json.data) {
        return [json.data as T];
    } else {
        return [];
    }
}



export function getImgFullUrl(imgUrl: string) {
    return `${process.env.CMS_API_URL}${imgUrl}`
}