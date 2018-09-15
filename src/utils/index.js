import axios from 'axios'

const baseURL = '/api/admin'

const instance = axios.create({
  baseURL,
  timeout: 10000,
//   headers: {
//     'X-Custom-Header': 'foobar'
//   }
});

const xhr = {
  get(url, data, config) {
    return new Promise((resolve, reject) => {
      instance.get(url, {
        params: data
      }, config).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  post(url, data, config) {
    return new Promise((resolve, reject) => {
      instance.post(url, data, config).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export const $axios = xhr