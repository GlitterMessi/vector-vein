/**
 * @Author: Bi Ying
 * @Date:   2023-02-22 12:26:46
 * @Last Modified by:   Bi Ying
 * @Last Modified time: 2023-07-06 17:23:32
 */
import { post} from '@/utils/request'

export async function databaseAPI<T = any>(action:string, parameter: any) {
 // return await baseAPI(`database/${action}`, parameter)
  return post<T>({
      url: `database/${action}`,
      data: parameter
  })
}

export async function databaseObjectAPI<T = any>(action:string, parameter: any) {
  //return await baseAPI(`database_object/${action}`, parameter)
    return post<T>({
        url: `database_object/${action}`,
        data: parameter
    })
}
