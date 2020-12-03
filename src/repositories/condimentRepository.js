import repository from "./repository"
const resource = "condiments"

export default{
  condiment(payload){
    return repository.post(`${resource}`,payload)
  },
  getCondiments(){
    return repository.get(`${resource}`)
  }
}