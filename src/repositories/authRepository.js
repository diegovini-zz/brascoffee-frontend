import repository from "./repository"
const resource = "auth"

export default{
  login(payload){
    return repository.post(`${resource}`,payload)

  }
}