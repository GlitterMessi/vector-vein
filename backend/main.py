# -*- coding: utf-8 -*-
# @Author: Bi Ying
# @Date:   2023-05-14 23:56:32
# @Last Modified by:   Bi Ying
# @Last Modified time: 2023-08-26 00:16:38
import os
import queue
import threading
from pathlib import Path

import webview
import mimetypes

from api import API
from api.workflow_api import (
    WorkflowAPI,
    WorkflowTagAPI,
    WorkflowTemplateAPI,
    WorkflowRunRecordAPI,
    WorkflowRunScheduleAPI,
)
from api.database_api import DatabaseAPI, DatabaseObjectAPI
from api.user_api import SettingAPI
from api.remote_api import OfficialSiteAPI
from utilities.print_utils import mprint
from utilities.web_crawler import proxies_for_requests
from utilities.static_file_server import StaticFileServer
from models import create_tables
from worker import main_worker, main_vector_database

#
# # Some mimetypes are not correctly registered in Windows. Register them manually.
# mimetypes.add_type("application/javascript", ".js")
#
if not Path("./data").exists():
    Path("./data").mkdir()
    Path("./data/static").mkdir()
    Path("./data/static/images").mkdir()

# # Create SQLite tables. Will ignore if tables already exist.
# create_tables()
#
#
# def open_file_dialog(self, multiple=False):
#     result = window.create_file_dialog(webview.OPEN_DIALOG, allow_multiple=multiple)
#     return result
#
#
# def open_folder_dialog(self, initial_directory=""):
#     result = window.create_file_dialog(webview.FOLDER_DIALOG, directory=initial_directory)
#     return result
#
#
# if Path("./version.txt").exists():
#     with open("./version.txt", "r") as f:
#         VERSION = f.read()
# else:
#     VERSION = os.environ.get("VECTORVEIN_VERSION", "0.0.1")
#
# DEBUG = os.environ.get("VECTORVEIN_DEBUG", "0") == "1"
# mprint(f"Debug: {DEBUG}")
# mprint(f"Version: {VERSION}")
#
# task_queue = queue.Queue()
# vdb_queues = {
#     "request": queue.Queue(),
#     "response": queue.Queue(),
# }
# api = API(DEBUG, VERSION, task_queue, vdb_queues)
# api_class_list = [
#     WorkflowAPI,
#     WorkflowTagAPI,
#     WorkflowTemplateAPI,
#     WorkflowRunRecordAPI,
#     WorkflowRunScheduleAPI,
#     DatabaseAPI,
#     DatabaseObjectAPI,
#     SettingAPI,
#     OfficialSiteAPI,
# ]
# for api_class in api_class_list:
#     api.add_apis(api_class)
# setattr(API, "open_file_dialog", open_file_dialog)
# setattr(API, "open_folder_dialog", open_folder_dialog)
#
# _proxies_for_requests = proxies_for_requests()
#
# if "http" in _proxies_for_requests:
#     os.environ["http_proxy"] = _proxies_for_requests["http"]
# if "https" in _proxies_for_requests:
#     os.environ["https_proxy"] = _proxies_for_requests["https"]
#
# worker_thread = threading.Thread(target=main_worker, args=(task_queue, vdb_queues), daemon=True)
# worker_thread.start()
#
# vdb_thread = threading.Thread(target=main_vector_database, args=(vdb_queues,), daemon=True)
# vdb_thread.start()
#
# static_file_server = StaticFileServer("./data/static")
# static_file_server_thread = threading.Thread(target=static_file_server.start, daemon=True)
# static_file_server_thread.start()
#
# if DEBUG:
#     url = os.environ.get("VITE_LOCAL", "web/index.html")
# else:
#     url = "web/index.html"
# window = webview.create_window(
#     f"VectorVein v{VERSION}",
#     url=url,
#     js_api=api,
#     width=1600,
#     height=1000,
#     confirm_close=True,
# )
# webview.start(debug=DEBUG, http_server=True)
from fastapi import FastAPI, APIRouter, staticfiles
import uvicorn
import os
from worker import main_worker, main_vector_database
# (引入其他必要的模块)
database_api_instance = DatabaseAPI()
DatabaseObjectAPI_instance = DatabaseObjectAPI()
SettingAPI_instance = SettingAPI()
WorkflowAPI_instance = WorkflowAPI()
WorkflowTemplateAPI_instance = WorkflowTemplateAPI()
WorkflowRunRecordAPI_instance = WorkflowRunRecordAPI()
WorkflowTagAPI_instance = WorkflowTagAPI()
WorkflowRunScheduleAPI_instance = WorkflowRunScheduleAPI()
from fastapi.middleware.cors import CORSMiddleware

create_tables()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)
app.include_router(
    database_api_instance.router,
    prefix="/api"
)
app.include_router(
    DatabaseObjectAPI_instance.router,
    prefix="/api"
)
app.include_router(
    SettingAPI_instance.router,
    prefix="/api/setting"
)
app.include_router(
    WorkflowAPI_instance.router,
    prefix="/api/workflow"
)
app.include_router(
    WorkflowTemplateAPI_instance.router,
    prefix="/api/workflow_template"
)
app.include_router(
    WorkflowRunRecordAPI_instance.router,
    prefix="/api/workflow_run_record"
)
app.include_router(
    WorkflowTagAPI_instance.router,
    prefix="/api/workflow_tag"
)
app.include_router(
    WorkflowRunScheduleAPI_instance.router,
    prefix="/api/workflow_schedule_trigger"
)


# 配置静态文件路径
app.mount("/static", staticfiles.StaticFiles(directory="./data/static"), name="static")

# Worker Queue Setup
task_queue = queue.Queue()
vdb_queues = {
    "request": queue.Queue(),
    "response": queue.Queue(),
}


# Background worker threads
worker_thread = threading.Thread(target=main_worker, args=(task_queue, vdb_queues), daemon=True)
worker_thread.start()

vdb_thread = threading.Thread(target=main_vector_database, args=(vdb_queues,), daemon=True)
vdb_thread.start()

# Remove the webview specific code and replace it with launching the FastAPI server
if __name__ == "__main__":
    VERSION = os.getenv("VECTORVEIN_VERSION", "0.0.1")
    DEBUG = os.getenv("VECTORVEIN_DEBUG", "0") == "1"
    # Run the FastAPI server with uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)