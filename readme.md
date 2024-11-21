# Axios-curl-parser

This module is for parsing axios response to curl command format.

If your team want to make debug log with `curl` command, This module will be help you.

# Example

```ts
import axios, { AxiosResponse } from 'axios'
import { axiosResponseToCurlCommand } from 'axios-curl-parser'


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

```
