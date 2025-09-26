const API_BASE = (typeof window !== "undefined" && window.__API_BASE__) || "http://localhost:5000/api";

function joinPath(base, path) {
	if (!path) return base;
	if (base.endsWith("/") && path.startsWith("/")) return base + path.slice(1);
	if (!base.endsWith("/") && !path.startsWith("/")) return base + "/" + path;
	return base + path;
}

async function safeParseResponse(res) {
	// Handle no content
	if (res.status === 204) return null;
	const text = await res.text();
	if (!text) return null;
	const contentType = (res.headers.get("content-type") || "").toLowerCase();
	if (contentType.includes("application/json")) {
		try {
			return JSON.parse(text);
		} catch (e) {
			// fall back to raw text if JSON parse fails
			return text;
		}
	}
	return text;
}

async function request(path, { method = "GET", body, headers = {}, signal, ...rest } = {}) {
	// Use proxy in development, direct API in production
	const isDevelopment = typeof window !== "undefined" && window.location.hostname === "localhost";
	const baseUrl = isDevelopment ? "/api" : "http://localhost:5000/api";
	const url = joinPath(baseUrl, path || "");
	const token = (typeof localStorage !== "undefined" && localStorage.getItem("authToken")) || null;

	const finalHeaders = { ...headers };
	if (token && !finalHeaders["Authorization"]) finalHeaders["Authorization"] = `Bearer ${token}`;

	let bodyToSend = body;
	// Do not send body for GET/HEAD
	if ((method || "GET").toUpperCase() === "GET" || (method || "GET").toUpperCase() === "HEAD") {
		bodyToSend = undefined;
	} else if (body && !(body instanceof FormData)) {
		finalHeaders["Content-Type"] = "application/json";
		bodyToSend = JSON.stringify(body);
	}

	let res;
	try {
		res = await fetch(url, {
			method,
			headers: finalHeaders,
			body: bodyToSend,
			signal,
			...rest,
		});
	} catch (fetchErr) {
		const err = new Error(fetchErr.message || "Network request failed");
		err.cause = fetchErr;
		throw err;
	}

	const data = await safeParseResponse(res);

	if (!res.ok) {
		const message =
			(data && typeof data === "object" && (data.message || data.error)) ||
			(typeof data === "string" && data) ||
			`Request failed with status ${res.status}`;
		const err = new Error(message);
		err.status = res.status;
		err.data = data;
		throw err;
	}

	return data;
}

export const apiGet = (path, opts) => request(path, { method: "GET", ...opts });
export const apiPost = (path, body, opts) => request(path, { method: "POST", body, ...opts });
export const apiPut = (path, body, opts) => request(path, { method: "PUT", body, ...opts });
export const apiDelete = (path, opts) => request(path, { method: "DELETE", ...opts });

export default {
	get: apiGet,
	post: apiPost,
	put: apiPut,
	delete: apiDelete,
};
