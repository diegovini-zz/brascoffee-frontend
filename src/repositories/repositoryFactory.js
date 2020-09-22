import authRepository from './authRepository'
import beverageRepository from './beverageRepository'

const repositories = {
  authRepository: authRepository,
  beverageRepository:beverageRepository,
}

export const repositoryFactory = {
  get: name => repositories[name]
}