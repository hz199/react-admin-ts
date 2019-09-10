import axios from 'axios'
// let apiBaseURL = 'https://www.easy-mock.com/mock/5d088415bdc26d23199ba01a'
const apiBaseURL = 'https://www.fastmock.site/mock/6f76b7d369d0c948b43d58ad8a586bd0'

const instance = axios.create({
  baseURL: apiBaseURL,
  timeout: 5000
})

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default instance
