import axios from "axios";
import store from '../store';
import { logOut } from "../store/auth/actionCreators";

const authInstance = axios.create({
  baseURL: 'https://trello.backend.tests.nekidaem.ru/api/v1/',
})
const instance = axios.create({
  baseURL: 'https://trello.backend.tests.nekidaem.ru/api/v1/',
})

instance.interceptors.request.use((request) => {
  const token = localStorage.getItem('token')
  if (!token) {
    store.dispatch(logOut());
    throw new Error('Not Authorized!!!');
  }

  request.headers.Authorization = `JWT ${token}`

  return request
})

instance.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err?.response?.status === 401) localStorage.removeItem('token')
    throw new Error(err)
  }
)


export {
  instance,
  authInstance
}