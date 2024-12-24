import { AxiosResponse } from 'axios'

export function axiosResponseToCurlCommand(response: AxiosResponse, targetURL: string) {
  const { config } = response
  const { method = 'GET', baseURL, url, headers = {}, data, params } = config

  const fullUrl = new URL(targetURL)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        fullUrl.searchParams.append(key, String(value))
      }
    })
  }

  let curlCommand = `curl -X ${method.toUpperCase()} \\\n`

  Object.entries(headers).forEach(([key, value]) => {
    curlCommand += ` -H '${key}: ${value}' \\\n`
  })

  if (data && method.toUpperCase() !== 'GET') {
    const dataString = typeof data === 'object' ? JSON.stringify(data) : data
    curlCommand += ` -d '${dataString}' \\\n`
  }

  curlCommand += ` '${fullUrl.toString()}'`

  return curlCommand
}
