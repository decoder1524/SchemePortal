import axios from 'axios';

const API = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

const PROFILE_API = axios.create({
    baseURL: "http://localhost:3001",
    withCredentials: true
})
const SCHEME_API = axios.create({
    baseURL: "http://localhost:3002",
    withCredentials: true
})
const ELIGIBLE_API = axios.create({
    baseURL: "http://localhost:3003",
    withCredentials: true
})
const NOTIFY_API = axios.create({
    baseURL: "http://localhost:3004",
    withCredentials: true
})

// Add Authorization header to both instances
const addAuthHeader = (req) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
        req.headers.Authorization = `Bearer ${accessToken}`;
    }
    return req;
}

// Handle 401 errors and refresh token
const handle401Error = async (error, apiInstance) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry && !error.config.url.includes("/login")) {
        originalRequest._retry = true;
        
        try {
            // Call refresh endpoint
            const response = await axios.get("http://localhost:3000/refresh", {
                withCredentials: true
            });
            
            const newToken = response.data?.token;
            if (newToken) {
                localStorage.setItem("token", newToken);
                
                // Update headers in both instances
                API.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
                PROFILE_API.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
                
                // Retry original request with new token
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return apiInstance(originalRequest);
            }
        } catch (refreshError) {
            console.log("Token refresh failed:", refreshError);
            localStorage.removeItem("token");
            window.location.href = "/login";
            return Promise.reject(refreshError);
        }
    }
    
    return Promise.reject(error);
}

API.interceptors.request.use(addAuthHeader);
PROFILE_API.interceptors.request.use(addAuthHeader);
SCHEME_API.interceptors.request.use(addAuthHeader);
ELIGIBLE_API.interceptors.request.use(addAuthHeader);
NOTIFY_API.interceptors.request.use(addAuthHeader);

// Response interceptors for 401 handling
API.interceptors.response.use(
    (response) => response,
    (error) => handle401Error(error, API)
);

PROFILE_API.interceptors.response.use(
    (response) => response,
    (error) => handle401Error(error, PROFILE_API)
);
SCHEME_API.interceptors.response.use(
    (response) => response,
    (error) => handle401Error(error, SCHEME_API)
);
ELIGIBLE_API.interceptors.response.use(
    (response) => response,
    (error) => handle401Error(error, ELIGIBLE_API)
);
NOTIFY_API.interceptors.response.use(
    (response) => response,
    (error) => handle401Error(error, NOTIFY_API)
);

export default API;
export { PROFILE_API,SCHEME_API,ELIGIBLE_API,NOTIFY_API};
