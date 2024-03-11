# -*- coding: utf-8 -*-
# @Author: Bi Ying
# @Date:   2023-05-15 02:02:39
# @Last Modified by:   Bi Ying
# @Last Modified time: 2023-05-17 11:54:04
from models import (
    Setting,
    model_serializer,
)

from fastapi import FastAPI, APIRouter
class SettingAPI(APIRouter):
    name = "setting"

    def __init__(self):
        self.router = APIRouter()

        @self.router.post("/get")
        def get():
            if Setting.select().count() == 0:
                setting = Setting.create()
            else:
                setting = Setting.select().order_by(Setting.create_time.desc()).first()
            setting = model_serializer(setting)
            response = {"status": 200, "message": "success", "data": setting}
            return response

        @self.router.post("/update")
        def update( payload: dict):
            setting_id = payload.get("id")
            setting = Setting.get_by_id(setting_id)
            setting.data = payload.get("data", {})
            setting.save()
            setting = model_serializer(setting)
            response = {"status": 200, "message": "success", "data": setting}
            return response

        @self.router.post("/list")
        def list():
            settings = Setting.select().order_by("create_time")
            settings_list = model_serializer(settings, many=True)
            response = {"status": 200, "message": "success", "data": settings_list}
            return response
