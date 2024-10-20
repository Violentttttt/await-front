import axios from 'axios';


const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true, 
});

// Интерсептор для перехвата ответов
api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshResponse = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/token/refresh/`, {}, {
                    withCredentials: true
                });

                // Вы можете установить новый токен здесь, если это необходимо
                return api(originalRequest);
            } catch (refreshError) {
                console.error('Failed to refresh token:', refreshError);
                window.location.href = '/login'; // Перенаправление на страницу входа
            }
        }
        
        return Promise.reject(error);
    }
);


export default api;
