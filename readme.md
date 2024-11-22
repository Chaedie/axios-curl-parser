# Axios-curl-parser

This module is for parsing axios response to curl command format.

If your team want to make debug log with `curl` command, This module will be help you.

# Example

```ts
import axios, { AxiosResponse } from 'axios'
import { axiosResponseToCurlCommand } from 'axios-curl-parser'


axios.interceptors.response.use(async (response: AxiosResponse<any>) => {
    const curlCommand = axiosResponseToCurlCommand(response)
    console.debug(curlCommand)
    return response
})

axios
    .get('https://jsonplaceholder.typicode.com/posts/1', {
        headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'Accept-Encoding': '' },
    })
    .then((response: any) => {})
```

## Sample Result

```shell
curl -X GET \ 
  -H "Accept: application/json" \ 
  -H "Content-Type: application/json" \ 
  -H "Accept-Encoding: " \ 
  -H "User-Agent: axios/1.7.7" \ 
  "https://jsonplaceholder.typicode.com/posts/1"
```

You can copy & paste for terminal and reqest curl command with this result. So you will not have to go to "network tab" on the inspector of the browser.

## Sample Usage - with Slack notification

Our team setting up the frontend error logger with `axios-curl-parser` so we just forward our error log to another developer for debugging.
curl command has all of the important information for error debugging so `axios-curl-parser` increase our team's productivity.

> Try it for your team!
