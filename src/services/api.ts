import env from "../env";
import httpClient from "../utils/http_client";

const client = httpClient({
    baseURL: `${env.REST_API_URL}/${env.REST_API_BASE_PATH}/${env.REST_API_VERSION}`,
    headers: {
        "Content-Type": "application/json"
    }
});

export async function login(username: string, password: string) {
    return client.post<{ token: string }>("/auth/login", { username, password });
}
