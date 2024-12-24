import axios, { AxiosResponse } from 'axios'
import { axiosResponseToCurlCommand } from './index'

axios.interceptors.response.use(async (response: AxiosResponse<any>) => {
  const curlCommand = axiosResponseToCurlCommand(response, response.config.url as string)
  console.debug('curlCommand = ', curlCommand)

  return response
})

async function test() {
  try {
    const resAbs = await axios.get('https://jsonplaceholder.typicode.com/posts/1', {
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'Accept-Encoding': '' },
    })
    // console.log('🔥🔥test/test :20 - res = ', resAbs)

    const resRel = await axios.get('/posts/1', {
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'Accept-Encoding': '' },
    })
    // console.log('🔥🔥test/test :20 - res = ', resRel)
  } catch (err) {
    console.error(err)
  }
}

test()
