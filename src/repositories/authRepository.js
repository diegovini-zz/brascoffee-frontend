import repository from "./repository"

const resource = "auth"
const subResource = "user"

export default {
  login(payload) {
    return repository.post(`${resource}`, payload)
  },
  getUser(){
    return repository.get(`${subResource}`)
  }
}