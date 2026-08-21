const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1"

type HttpMethod = 'GET'| 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export async function apiFetch <T>(
    endpoint: string,
    method: HttpMethod = 'GET',
    body?: unknown,
): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: body? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message ?? "Something went wrong")
    }
    const data = await response.json();
    return data;
}