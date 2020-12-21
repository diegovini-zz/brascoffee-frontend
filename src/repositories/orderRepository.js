import repository from "./repository"
const resource = "orders"

export default{
  getOrders(){
    return repository.get(`${resource}`)
  },
  getOrderById(id) {
    return repository.get(`${resource}/${id}`)
  },
  addOrder(payload){
    return repository.post(`${resource}`,payload)
  },
  editrder(id, payload) {
    return repository.put(`${resource}/${id}`, payload)
  },
  deleteOrder(id) {
    return repository.delete(`${resource}/${id}`)
  }
}