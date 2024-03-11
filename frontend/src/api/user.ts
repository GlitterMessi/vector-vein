/**
 * @Author: Bi Ying
 * @Date:   2022-05-25 01:29:38
 * @Last Modified by:   Bi Ying
 * @Last Modified time: 2023-07-06 17:23:56
 */
import {post} from '@/utils/request'

export  function userInfoAPI<T=any>(action:string, parameter: any) {

    //return await baseAPI(`user_info/${action}`, parameter)
    return post<T>({
        url: `user_info/${action}`,
        data: parameter
    })
}

export  function settingAPI<T=any>(action:string, parameter: any) {
   // return await baseAPI(`setting/${action}`, parameter)
    return post<T>({
        url: `setting/${action}`,
        data: parameter
    })
}
