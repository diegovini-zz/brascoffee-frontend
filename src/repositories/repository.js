import axios from 'axios'
import { auth } from '@/services/authService'

const errorKey = 'description'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API + '/'
})

instance.interceptors.request.use(
  (config) => {
    let token = auth.getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

instance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  let failedResponse = error.response

  if (failedResponse.status === 403) {
    console.log(failedResponse)
    auth.logout();
    return Promise.resolve(error);
  }
  else {
    //console.log(failedResponse.data[errorKey])
    return Promise.resolve(error);
  }
})

export default instance

