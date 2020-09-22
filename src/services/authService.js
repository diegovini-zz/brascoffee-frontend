const propertyName = "access_token"
import router from '@/router'

export const auth = {
  login: (token) => {
    localStorage.setItem(propertyName, token);
  },
  logout: () => {
    localStorage.removeItem(propertyName);
    router.push({name:'login'})
  },
  isAuthenticated: () => {
    return !!localStorage.getItem(propertyName);
  },
  getToken: () => {
    return localStorage.getItem(propertyName);
  }
}