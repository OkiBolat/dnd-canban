import {authInstance} from './instance'

const logIn = (data) => {
  return authInstance.post("users/login/" , data)
}

export const authService = {
  logIn
}