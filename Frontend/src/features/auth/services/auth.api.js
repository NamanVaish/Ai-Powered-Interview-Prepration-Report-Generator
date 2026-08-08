import axios from "axios";

let accessToken = null;

export const setAccessToken = token => {
    accessToken = token;
};

export const getAccessToken = () => accessToken;

const api = axios.create({
    baseURL: "https://ai-powered-interview-prepration-report-oph4.onrender.com",
    withCredentials: true
});

api.interceptors.request.use(config => {
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    console.log(config.headers);
    return config;
});

api.interceptors.response.use(
    response => response,

    async error => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/refreshToken")
        ) {
            originalRequest._retry = true;

            try {
                const { data } = await api.get("/api/auth/refreshToken");

                accessToken = data.accessToken;

                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                return api(originalRequest);
            } catch (err) {
                setAccessToken(null);
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export const register = async ({ username, email, password }) => {
    try {
        const response = await api.post("/api/auth/register", {
            username,
            email,
            password
        });
        setAccessToken(response.data.accessToken);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const login = async ({ email, password }) => {
    try {
        const response = await api.post("/api/auth/login", { email, password });
        console.log(response.data);

        setAccessToken(response.data.accessToken);
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

export const refreshToken = async () => {
    const response = await api.get("/api/auth/refreshToken");
    return response.data;
};

export const logout = async () => {
    try {
        const response = await api.get("/api/auth/logout");
        setAccessToken(null);
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

export const logoutAll = async () => {
    try {
        const response = await api.get("/api/auth/logout-all");
        setAccessToken(null);
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

export const getMe = async () => {
    try {
        const response = await api.get("/api/auth/get-me");
        return response.data;
    } catch (err) {
        console.log(err);
    }
};
export default api;
