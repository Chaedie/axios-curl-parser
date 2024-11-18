import {AxiosResponse} from "axios";

export function axiosResponseToCurlCommand(response: AxiosResponse) {
    const { config } = response
    const { method = 'GET', baseURL = '', url, headers = {}, data } = config

    // 전체 URL 구성 (baseURL + url)
    const fullUrl = new URL(url ?? '', baseURL).toString()

    // 기본 curl 명령어 시작
    let curlCommand = `curl -X ${method.toUpperCase()}`

    // 헤더 추가
    Object.entries(headers).forEach(([key, value]) => {
        curlCommand += ` -H "${key}: ${value}"`
    })

    // 데이터 추가 (GET 요청은 제외)
    if (data && method.toUpperCase() !== 'GET') {
        const dataString = typeof data === 'object' ? JSON.stringify(data) : data
        curlCommand += ` -d '${dataString}'`
    }

    // URL 추가
    curlCommand += ` "${fullUrl}"`

    return curlCommand
}
