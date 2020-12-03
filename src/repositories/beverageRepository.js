import repository from "./repository"
const resource = "beverages"

export default {
  getBeverages() {
    return repository.get(`${resource}`)
  },
  getBeverageById(id) {
    return repository.get(`${resource}/${id}`)
  },
  addBeverage(payload) {
    return repository.post(`${resource}`, payload)
  },
  editBeverage(id, payload) {
    return repository.put(`${resource}/${id}`, payload)
  },
  deleteBeverage(id) {
    return repository.delete(`${resource}/${id}`)
  }

}