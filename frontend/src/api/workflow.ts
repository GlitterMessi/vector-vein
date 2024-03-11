/**
 * @Author: Bi Ying
 * @Date:   2023-02-22 12:26:46
 * @Last Modified by:   Bi Ying
 * @Last Modified time: 2023-07-06 17:30:37
 */
import {post} from '@/utils/request'

export  function workflowAPI<T=any>(action:string, parameter: any) {
  // return await baseAPI(`workflow/${action}`, parameter)
    return post<T>({
        url: `workflow/${action}`,
        data: parameter
    })
}

export  function workflowScheduleTriggerAPI<T=any>(action:string, parameter: any) {
  //return await baseAPI(`workflow_schedule_trigger/${action}`, parameter)
    return post<T>({
        url: `workflow_schedule_trigger/${action}`,
        data: parameter
    })
}

export  function workflowTemplateAPI<T=any>(action:string, parameter: any) {
 // return await baseAPI(`workflow_template/${action}`, parameter)
    return post<T>({
        url: `workflow_template/${action}`,
        data: parameter
    })
}

export  function workflowTagAPI<T=any>(action:string, parameter: any) {
 // return await baseAPI(`workflow_tag/${action}`, parameter)
    return post<T>({
        url: `workflow_tag/${action}`,
        data: parameter
    })
}

export  function workflowRunRecordAPI<T=any>(action:string, parameter: any) {
 // return await baseAPI(`workflow_run_record/${action}`, parameter)
    return post<T>({
        url: `workflow_run_record/${action}`,
        data: parameter
    })
}