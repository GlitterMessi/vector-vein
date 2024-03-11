import type { AxiosProgressEvent, AxiosResponse, GenericAbortSignal } from 'axios'
import request from './axios'
// import { useAuthStore } from '@/store'

export interface HttpOption {
  url: string
  data?: any
  method?: string
  headers?: any
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void
  signal?: GenericAbortSignal
  beforeRequest?: () => void
  afterRequest?: () => void
}

export interface Response<T = any> {
  data: T
  message: string | null
  status: string
}

function http<T = any>(
  { url, data, method, headers, onDownloadProgress, signal, beforeRequest, afterRequest }: HttpOption,
) {
  const successHandler = (res: AxiosResponse<Response<T>>) => {
    // const authStore = useAuthStore()

    if (res.data.status === 'Success' || typeof res.data === 'string')
      return res.data

    // if (res.data.status === 'Unauthorized') {
    //   authStore.removeToken()
    //   // window.location.reload()
    //  // 获取URL查询字符串
    //   const queryString = window.location.search;
    //   // 创建URLSearchParams对象
    //   const urlParams = new URLSearchParams(queryString);
    //   // 读取client参数的值
    //   const client = urlParams.get('client');
    //   // 使用参数值进行后续操作
    //   console.log('client:'+ client);
    //   var url = ''
    //   var redirectUrl = encodeURIComponent(window.location.protocol + "//" + window.location.host + import.meta.env.VITE_GLOB_API_URL + '/user/larkAccess');
    //   //判断当前客户端是lark还是飞书
    //   if (client === 'lark') {
    //       url = "https://open.larksuite.com/open-apis/authen/v1/index?redirect_uri=" + redirectUrl + "&app_id=cli_a5a923c3c0b8902f&state=lark" + window.location.host + '/static/index.html'
    //   }else {
    //       url = "https://open.feishu.cn/open-apis/authen/v1/index?redirect_uri=" + redirectUrl + "&app_id=cli_a4f3e49e87b9500e&state=feishu" + window.location.host + '/static/index.html'
    //   }
    //     window.location.href = url
    // }

    // return Promise.reject(res.data)
    return res.data
  }

  const failHandler = (error: Response<Error>) => {
    afterRequest?.()
    console.log(error)
    if(error.status == '429'){
      throw new Error('Too Many Requests,Please retry')
    }
    if(error.status == '403000'){
      throw new Error('没有权限使用该模型！')
    }
    throw new Error(error?.message || 'Error')
  }

  beforeRequest?.()

  method = method || 'GET'

  const params = Object.assign(typeof data === 'function' ? data() : data ?? {}, {})

  return method === 'GET'
    ? request.get(url, { params, signal, onDownloadProgress }).then(successHandler, failHandler)
    : request.post(url, params, { headers, signal, onDownloadProgress }).then(successHandler, failHandler)
}

export function get<T = any>(
  { url, data, method = 'GET', onDownloadProgress, signal, beforeRequest, afterRequest }: HttpOption,
): Promise<Response<T>> {
  return http<T>({
    url,
    method,
    data,
    onDownloadProgress,
    signal,
    beforeRequest,
    afterRequest,
  })
}

export function post<T = any>(
  { url, data, method = 'POST', headers, onDownloadProgress, signal, beforeRequest, afterRequest }: HttpOption,
): Promise<Response<T>> {
  return http<T>({
    url,
    method,
    data,
    headers,
    onDownloadProgress,
    signal,
    beforeRequest,
    afterRequest,
  })
}

export default post
