import repository from "./repository"
const resource = "orders"

export default{
  order(payload){
    return repository.post(`${resource}`,payload)
  },
  getOrders(){
    return repository.get(`${resource}`)
  }
}