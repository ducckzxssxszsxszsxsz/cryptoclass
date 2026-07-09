import axios from 'axios';
import { toast } from 'react-toastify';
import { t } from './i18n';

const customAPI = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

customAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

customAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;
    if (response) {
      const { status, data } = response;

      if (status === 401) {
        const originalRequest = error.config;
        if (!originalRequest._retry) {
          originalRequest._retry = true;
          const refreshToken = localStorage.getItem('refreshToken');

          if (refreshToken) {
            try {
              const refreshResponse = await axios.post(
                'http://localhost:3000/api/v1/auth/refresh',
                { token: refreshToken },
                { withCredentials: true }
              );

              const { token: newToken } = refreshResponse.data;
              localStorage.setItem('token', newToken);
              customAPI.defaults.headers['Authorization'] = `Bearer ${newToken}`;

              return customAPI(originalRequest);
            } catch (refreshError) {
              console.error('Token refresh failed:', refreshError);
              logoutUser();
            }
          } else {
            logoutUser();
          }
        } else {
          logoutUser();
        }
      } else if (status === 500) {
        toast.error(t('toast.serverError'));
      }
    } else {
      console.error('No response from server:', error.message);
    }

    return Promise.reject(error);
  }
);

const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  window.location.href = '/login';
};

export const deleteCourse = async (courseId) => {
  try {
    await customAPI.delete(`/course/courses/${courseId}`);
  } catch (error) {
    console.error('Failed to delete course:', error.response ? error.response.data : error.message);
    throw new Error(t('toast.deleteFailed'));
  }
};

export const updateCourseStatus = async (courseId, newStatus) => {
  try {
    await customAPI.patch(`/course/courses/${courseId}/status`, { status: newStatus });
  } catch (error) {
    console.error('Failed to update course status:', error.response ? error.response.data : error.message);
    throw new Error(t('toast.updateStatusFailed'));
  }
};

export default customAPI;