import axios from 'axios'
import { auth } from '@/services/authService'
import Vue from 'vue'

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
  
  if(error.config.hasOwnProperty('errorHandle') && error.config.errorHandle === false){
    return Promise.reject(error)
  }
  
  let failedResponse = error.response
  if (failedResponse.status === 403) {
    auth.logout();
    return Promise.resolve(error);
  }
  else {
    return Promise.resolve(error);
  }
})

export default instance

