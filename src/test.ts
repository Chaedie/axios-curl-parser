import axios, { AxiosResponse } from 'axios'
import { axiosResponseToCurlCommand } from './index'

axios.interceptors.response.use(async (response: AxiosResponse<any>) => {
  const curlCommand = axiosResponseToCurlCommand(response)
  console.debug('curlCommand = ', curlCommand)

  return response
})

axios
  .get('https://jsonplaceholder.typicode.com/posts/1', {
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'Accept-Encoding': '' },
  })
  .then((response: any) => {})
