const propertyName = "access_token"
import router from '@/router'


export const auth = {
  user: {},
  login: function (response) {
    localStorage.setItem(propertyName, response.jwt);
    this.user = response.user;
  },
  logout: function () {
    localStorage.removeItem(propertyName);
    this.user = {}
    router.push({ name: 'login' })
  },
  isAuthenticated: () => {
    
    return !!localStorage.getItem(propertyName);
  },
  getToken: () => {
    return localStorage.getItem(propertyName);
  },
  getUserRoles: function () {
    if (this.user.roles) {
      return this.user.roles.map(userRoles => userRoles.name.toLowerCase())
    } else {
      return []
    }
  },
  getUser: function () {
    return this.user
  },
  getUsername: function () {
    return this.user.username
  },
  isAdmin: function () {
    return this.getUserRoles.find(role => role.name === 'admin')
  },
  setUser: function (user) {
    this.user = user;
  }
}