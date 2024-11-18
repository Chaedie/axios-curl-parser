# Axios-curl-parser

This module is for parsing axios response to curl command format.

If your team want to make debug log with `curl` command, This module will be help you.

# Example

```ts

axios.interceptors.response.use(async (response: AxiosResponse<any>) => {
    const curlCommand = axiosResponseToCurlCommand(response)
    console.debug('curlCommand = ', curlCommand)
})

```
