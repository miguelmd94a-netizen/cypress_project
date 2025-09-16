import axios from 'axios';

function resetToken() {
  return axios.create({
    baseURL: `https://securetoken.googleapis.com/v1/token?key=${process.env.REACT_APP_API_KEY}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

const config = {
  baseURL: process.env.REACT_APP_UNARMED_ENDPOINT,
  headers: {
    'content-type': 'application/json',
  },
  responseType: 'json',
};

const axiosApiInstance = axios.create(config);

axiosApiInstance.interceptors.request.use(
  async (cfg) => {
    const token = await sessionStorage.getItem('authToken');
    if (token) {
      cfg.headers.Authorization = `Bearer ${token}`;
    }
    return cfg;
  },
  (error: any) => {
    Promise.reject(error);
  }
);

axiosApiInstance.interceptors.response.use(
  (response) => response,
  async function (error) {
    const originalRequest = error.config;
    if (!error.response) {
      return Promise.reject('Network Error');
    }
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = sessionStorage.getItem('refreshToken');
      const { data } = await resetToken().post(
        '',
        `grant_type=refresh_token&refresh_token=${refreshToken}`
      );
      originalRequest.headers['Authorization'] = `Bearer ${data.id_token}`;

      sessionStorage.setItem('authToken', data.id_token);
      sessionStorage.setItem('refreshToken', data.refresh_token);

      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const unarmedWithToken = () => axiosApiInstance;

export const unarmed = () =>
  axios.create({
    baseURL: process.env.REACT_APP_UNARMED_ENDPOINT,
  });

export const unarmedFile = () =>
  axios.create({
    baseURL: process.env.REACT_APP_UNARMED_ENDPOINT,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
