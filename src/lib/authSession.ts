import axios from "axios";
import { Messages, serverApi } from "./config";

const TOKEN_KEY = "accessToken";
const MEMBER_KEY = "memberData";

const safeGet = (key: string): string | null => {
	try {
		return localStorage.getItem(key);
	} catch (e) {
		return null;
	}
};

export const getAccessToken = (): string | null => {
	const token = safeGet(TOKEN_KEY);
	if (!token || token === "null" || token === "undefined") return null;
	return token;
};

export const clearSession = () => {
	try {
		localStorage.removeItem(TOKEN_KEY);
		localStorage.removeItem(MEMBER_KEY);
	} catch (e) {}
};

/** Reads the JWT "exp" claim (no signature check — the server does that). */
export const isTokenExpired = (token: string | null): boolean => {
	if (!token) return true;
	try {
		const payload = token.split(".")[1];
		const json = JSON.parse(
			decodeURIComponent(
				atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
					.split("")
					.map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
					.join(""),
			),
		);
		if (!json.exp) return false;
		return Date.now() >= json.exp * 1000;
	} catch (e) {
		return true;
	}
};

/** Logged-in member from storage, only if the token is still valid. */
export const getStoredMember = () => {
	const token = getAccessToken();
	const data = safeGet(MEMBER_KEY);
	if (!token || !data || isTokenExpired(token)) {
		clearSession();
		return null;
	}
	try {
		return JSON.parse(data);
	} catch (e) {
		clearSession();
		return null;
	}
};

const isOwnApi = (url?: string) => !!url && url.startsWith(serverApi);
const isAuthEndpoint = (url?: string) =>
	!!url && /\/member\/(login|signup|telegram-login|logout)/.test(url);

let onUnauthorized: () => void = () => {};
let installed = false;

/** Called by the app to react to an expired/invalid session (e.g. reset auth state). */
export const setUnauthorizedHandler = (handler: () => void) => {
	onUnauthorized = handler;
};

/**
 * Global axios setup (installed once):
 *  - sends the token as "Authorization: Bearer" (works when browsers block cookies)
 *  - on 401 from our API, clears the stale session and calls the unauthorized handler
 */
export const setupAuthInterceptors = () => {
	if (installed) return;
	installed = true;

	axios.interceptors.request.use((config) => {
		const token = getAccessToken();
		if (token && isOwnApi(config.url)) {
			config.headers = config.headers ?? {};
			(config.headers as any).Authorization = `Bearer ${token}`;
		}
		return config;
	});

	axios.interceptors.response.use(
		(res) => res,
		(err) => {
			const status = err?.response?.status;
			const url = err?.config?.url;
			if (status === 401 && isOwnApi(url) && !isAuthEndpoint(url)) {
				clearSession();
				onUnauthorized();
				// Show a clear, translated message instead of the raw server text
				if (err.response?.data && typeof err.response.data === "object") {
					err.response.data.message = Messages.error2;
				}
			}
			return Promise.reject(err);
		},
	);
};
