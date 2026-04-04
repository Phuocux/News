import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use((config) => {
  // 1. Lấy dữ liệu từ storage
  const savedData = localStorage.getItem("token"); 

  if (savedData) {
    try {
      // 2. Kiểm tra xem nó là chuỗi thuần hay là Object JSON
      const parsedData = JSON.parse(savedData);
      
      // Nếu là Object thì lấy thuộc tính .token, nếu là chuỗi thì dùng luôn
      const token = typeof parsedData === 'object' ? parsedData.token : parsedData;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      // Nếu không phải JSON (chuỗi thuần), dùng trực tiếp
      config.headers.Authorization = `Bearer ${savedData}`;
    }
  }

  return config;
});


// interceptor (optional - xử lý chung)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default api;