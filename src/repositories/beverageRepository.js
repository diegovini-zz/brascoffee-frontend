import repository from "./repository"
const resource = "beverages"

export default{
  beverage(payload){
    return repository.post(`${resource}`,payload)
  },
  getBeverages(){
    return repository.get(`${resource}`)
  }
}