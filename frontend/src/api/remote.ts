/**
 * @Author: Bi Ying
 * @Date:   2022-05-25 01:29:38
 * @Last Modified by:   Bi Ying
 * @Last Modified time: 2023-07-06 17:30:55
 */
import {post} from '@/utils/request'

export async function officialSiteAPI<T=any>(action:string, parameter: any) {
    //return await baseAPI(`official_site/${action}`, parameter)
    return post<T>({
        url: `official_site/${action}`,
        data: parameter
    })
}
