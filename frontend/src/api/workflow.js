/**
 * @Author: Bi Ying
 * @Date:   2023-02-22 12:26:46
 * @Last Modified by:   Bi Ying
 * @Last Modified time: 2023-07-06 17:30:37
 */
import baseAPI from './base'

export async function workflowAPI(action, parameter) {
  return await baseAPI(`workflow/${action}`, parameter)
}

export async function workflowScheduleTriggerAPI(action, parameter) {
  return await baseAPI(`workflow_schedule_trigger/${action}`, parameter)
}

export async function workflowTemplateAPI(action, parameter) {
  return await baseAPI(`workflow_template/${action}`, parameter)
}

export async function workflowTagAPI(action, parameter) {
  return await baseAPI(`workflow_tag/${action}`, parameter)
}

export async function workflowRunRecordAPI(action, parameter) {
  return await baseAPI(`workflow_run_record/${action}`, parameter)
}