import repository from "./repository"
const resource = "condiments"

export default{
  getCondiments(){
    return repository.get(`${resource}`)
  },
  getCondimentById(id) {
    return repository.get(`${resource}/${id}`)
  },
  addCondiment(payload){
    return repository.post(`${resource}`,payload)
  },
  editCondiment(id, payload) {
    return repository.put(`${resource}/${id}`, payload)
  },
  deleteCondiment(id) {
    return repository.delete(`${resource}/${id}`)
  }
  
}