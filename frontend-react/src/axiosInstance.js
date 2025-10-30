 import axios from "axios";

 const baseURL= import.meta.env.VITE_BACKEND_BASE_API 
 const axiosInstance = axios.create({
   baseURL: baseURL,
 });

 // Request interceptor to add auth token to headers
axiosInstance.interceptors.request.use(
  function(config){
    
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      config.headers["Authorization"] = `Bearer ${access_token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
)
// Response interceptor to handle responses globally
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  // Handle errors
  async function (error) {
    const originalRequest = error.config;
    if (error.response) {
      // Access Token was expired
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refresh_token = localStorage.getItem("refresh_token");
        try{
          const response=await axiosInstance.post('/token/refresh/', {refresh:refresh_token})
          
          localStorage.setItem('access_token', response.data.access);
          originalRequest.headers['Authorization'] = `Bearer  ${response.data.access}`
          return axiosInstance(originalRequest);
          

        }catch(error){
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          // window.location.href='/login';
          
        }
      }return Promise.reject(error);
    }
  }
)

 export default axiosInstance;