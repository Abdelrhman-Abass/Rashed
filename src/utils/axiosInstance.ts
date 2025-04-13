
import axios, { AxiosRequestConfig } from "axios";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

export const AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

// 🔹 Attach access token to requests
AxiosInstance.interceptors.request.use(
    async (config) => {
        const token = getCookie("userData"); // Access token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 🔄 Refresh token logic in response interceptor
AxiosInstance.interceptors.response.use(
    (response) => response, // ✅ Return response if no error
    async (error) => {
        const originalRequest = error.config;

        // ⛔ If not an auth error (401), reject immediately
        if (error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }

        // 🛑 Prevent infinite loops
        originalRequest._retry = true;

        try {
            const refreshToken = getCookie("userDataRefresh"); // Get refresh token
            const email = getCookie("userDataEmail");

            if (!refreshToken) {
                console.log("⚠️ No refresh token found, redirecting to login...");
                return handleLogout();
            }

            // 🔄 Step 1: Attempt to get a new access token
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/Token/generate-access-token`, {
                refreshToken,
                email,
            });

            if (!data || !data.data) {
                console.warn("⚠️ Refresh token invalid, trying to regenerate...");
                return regenerateRefreshToken(originalRequest);
            }

            // ✅ Store new access token in cookies
            setCookie("userData", data.data, { maxAge: 3600 }); // Store for 1 hour

            // 🔁 Retry the failed request with the new token
            originalRequest.headers.Authorization = `Bearer ${data.data}`;
            return AxiosInstance(originalRequest);
        } catch (refreshError) {
            console.error("❌ Error refreshing token:", refreshError);
            return regenerateRefreshToken(originalRequest);
        }
    }
);

// 🔄 Function to regenerate refresh token
async function regenerateRefreshToken(originalRequest: AxiosRequestConfig): Promise<any> {
    try {
        const refreshToken = getCookie("userDataRefresh");
        const email = getCookie("userDataEmail");

        if (!refreshToken || !email) {
            console.warn("🚨 No valid refresh token available, redirecting to login...");
            return handleLogout();
        }

        const { data } = await axios.post<{ data: string }>(
            `${process.env.NEXT_PUBLIC_BASE_URL}/Token/regenerate-refresh-token`,
            { refreshToken, email }
        );

        if (!data || !data.data) {
            console.warn("⚠️ Refresh token regeneration failed, redirecting to login...");
            return handleLogout();
        }

        // ✅ Store new refresh token
        setCookie("userDataRefresh", data.data, { maxAge: 7 * 24 * 60 * 60 }); // Store for 7 days

        // 🔄 Retry access token request with new refresh token
        return AxiosInstance(originalRequest);
    } catch (regenError) {
        console.error("❌ Error regenerating refresh token:", regenError);
        return handleLogout();
    }
}

// 🚀 Function to log out and redirect
function handleLogout(): Promise<never> {
    deleteCookie("userData");
    deleteCookie("userDataRefresh");
    deleteCookie("userDataEmail");

    if (typeof window !== "undefined") {
        window.location.href = "/auth";
    }

    return Promise.reject(new Error("🔒 User must log in again."));
}