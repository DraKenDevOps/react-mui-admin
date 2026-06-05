// apios.ts
interface RequestConfig {
    baseURL?: string;
    url?: string;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "CONNECT";
    headers?: Record<string, string>;
    params?: Record<string, string | number | boolean>;
    data?: unknown;
    timeout?: number;
}

interface HttpResponse<T = unknown> {
    data: T;
    status: number;
    statusText: string;
    headers: Headers;
}

class HttpClient {
    private defaultConfig: RequestConfig;

    constructor(config: RequestConfig = {}) {
        this.defaultConfig = config;
    }

    private buildURL(config: RequestConfig): string {
        const base = config.baseURL ?? this.defaultConfig.baseURL ?? "";
        const path = config.url ?? "";
        let url = new URL(joinURL(base, path)).toString();
        if (config.params) {
            url = appendParams(url, config.params);
            // Object.entries().forEach(([key, value]) => url.searchParams.append(key, String(value)));
        }
        console.log(url);
        return url;
    }

    private mergeHeaders(config: RequestConfig) {
        return {
            "Content-Type": "application/json",
            ...this.defaultConfig.headers,
            ...config.headers
        };
    }

    async request<T = unknown>(config: RequestConfig): Promise<HttpResponse<T>> {
        const url = this.buildURL(config);
        const method = config.method ?? this.defaultConfig.method ?? "GET";
        const headers = this.mergeHeaders(config);

        const controller = new AbortController();
        const timeout = config.timeout ?? this.defaultConfig.timeout;
        const timer = timeout ? setTimeout(() => controller.abort(), timeout) : null;
        try {
            const response = await fetch(url, {
                method,
                headers,
                body: config.data != null ? JSON.stringify(config.data) : undefined,
                signal: controller.signal
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);

            const resType = response.headers.get("content-type") || response.headers.get("Content-Type") || "";
            console.log("Response_headers:", `"content-type":"${resType}"`);

            let data: T;
            if (resType.includes("json")) {
                // @ts-ignore
                data = await response.json();
            } else {
                // @ts-ignore
                data = await response.text();
            }

            // const data: T = await response.text();
            return { data, status: response.status, statusText: response.statusText, headers: response.headers };
        } finally {
            if (timer) clearTimeout(timer);
        }
    }

    async download(config: RequestConfig) {
        const url = this.buildURL(config);
        const method = config.method ?? this.defaultConfig.method ?? "GET";
        const headers = this.mergeHeaders(config);

        const controller = new AbortController();
        const timeout = config.timeout ?? this.defaultConfig.timeout;
        const timer = timeout ? setTimeout(() => controller.abort(), timeout) : null;
        try {
            const response = await fetch(url, {
                method,
                headers,
                body: config.data != null ? JSON.stringify(config.data) : undefined,
                signal: controller.signal
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);

            return response.body;
        } finally {
            if (timer) clearTimeout(timer);
        }
    }

    get<T = unknown>(url: string, config?: RequestConfig) {
        return this.request<T>({ ...config, url, method: "GET" });
    }

    post<T = unknown>(url: string, data?: unknown, config?: RequestConfig) {
        return this.request<T>({ ...config, url, data, method: "POST" });
    }

    put<T = unknown>(url: string, data?: unknown, config?: RequestConfig) {
        return this.request<T>({ ...config, url, data, method: "PUT" });
    }

    patch<T = unknown>(url: string, data?: unknown, config?: RequestConfig) {
        return this.request<T>({ ...config, url, data, method: "PATCH" });
    }

    delete<T = unknown>(url: string, config?: RequestConfig) {
        return this.request<T>({ ...config, url, method: "DELETE" });
    }

    head<T = unknown>(url: string, config?: RequestConfig) {
        return this.request<T>({ ...config, url, method: "HEAD" });
    }

    connect<T = unknown>(url: string, config?: RequestConfig) {
        return this.request<T>({ ...config, url, method: "CONNECT" });
    }
}

function joinURL(base: string, path = ""): string {
    if (path) {
        const prefixSlash = path.startsWith("/");
        const normalized = base.endsWith("/") ? base.slice(0, -1) : base;
        if (prefixSlash) {
            base = `${normalized}${path}`;
        } else {
            base = `${normalized}/${path}`;
        }
    }
    return base;
}

function appendParams(url: string, params?: Record<string, string | number | boolean>): string {
    if (!params || Object.keys(params).length === 0) return url;
    const qs = new URLSearchParams(
        // @ts-ignore
        Object.entries(params).map(([k, v]) => [k, String(v)])
    ).toString();
    return url.includes("?") ? `${url}&${qs}` : `${url}?${qs}`;
}

function httpClient(config: RequestConfig = {}): HttpClient {
    return new HttpClient(config);
}

export default httpClient;