import axios, { Method, AxiosRequestConfig, AxiosResponse } from 'axios'

const checkStatus = async (res: AxiosResponse) => {
  const { status } = res
  if ((status >= 200 && status < 300) || status === 401) {
    return res.data
  }
  return Promise.reject(res)
}

const checkRes = (res: any) => {
  if (res && res.success) {
    return res.result
  }
  return Promise.reject(res)
}

const fetch = (url: string, method: Method, config: AxiosRequestConfig) => {
  const { params } = config
  if (method.toUpperCase() !== 'GET') {
    config.data = params
    delete config.params
  }
  return axios({ ...config, method, url })
    .then(checkStatus)
    .then(checkRes)
    .catch((e) => {
      return Promise.reject(e)
    })
}

export default fetch
