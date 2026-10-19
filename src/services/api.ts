const BASE_API_URL = "https://restapi.fr/api";

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers);
  // Only send Content-Type when there is a body: on a GET it triggers a CORS preflight
  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${BASE_API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let error = `Erreur HTTP : ${response.status}`;

    try {
      const errorData: { message?: string } = await response.json();

      if (errorData?.message) {
        error = errorData.message;
      }
    } catch {
      // empty block
    }

    throw new Error(error);
  }

  if (response.status === 204) {
    return null as T;
  }

  return response.json();
}
