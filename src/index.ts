import { AxiosResponse } from 'axios'

export function axiosResponseToCurlCommand(response: AxiosResponse) {
  const { config } = response
  const { method = 'GET', baseURL, url, headers = {}, data, params } = config

  // 쿼리 파라미터를 URL에 추가
  const fullUrl = new URL(url ?? '', baseURL)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        fullUrl.searchParams.append(key, String(value))
      }
    })
  }

  // 기본 curl 명령어 시작
  let curlCommand = `curl -X ${method.toUpperCase()} \\\n`

  // 헤더 추가
  Object.entries(headers).forEach(([key, value]) => {
    curlCommand += ` -H '${key}: ${value}' \\\n`
  })

  // 데이터 추가 (GET 요청은 제외)
  if (data && method.toUpperCase() !== 'GET') {
    const dataString = typeof data === 'object' ? JSON.stringify(data) : data
    curlCommand += ` -d '${dataString}' \\\n`
  }

  // URL 추가
  curlCommand += ` '${fullUrl.toString()}'`

  return curlCommand
}
