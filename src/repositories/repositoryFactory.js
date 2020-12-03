import authRepository from './authRepository'
import beverageRepository from './beverageRepository'
import condimentRepository from './condimentRepository'
import orderRepository from './orderRepository'

const repositories = {
  authRepository: authRepository,
  beverageRepository: beverageRepository,
  condimentRepository: condimentRepository,
  orderRepository: orderRepository
}

export const repositoryFactory = {
  get: name => repositories[name]
}