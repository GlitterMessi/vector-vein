# -*- coding: utf-8 -*-
# @Author: Bi Ying
# @Date:   2023-05-15 02:02:39
# @Last Modified by:   Bi Ying
# @Last Modified time: 2023-07-21 18:25:12
import httpx

from utilities.web_crawler import proxies
from utilities.print_utils import mprint_error


headers = {"user-agent": "vector-vein client"}
base_url = "https://vectorvein.com"


def request(method: str, path: str, payload=None):
    url = base_url + path
    try_times = 0
    while try_times < 3:
        try:
            response = httpx.request(
                method,
                url,
                headers=headers,
                proxies=proxies(),
                json=payload,
                timeout=15,
            )
            return response.json()
        except Exception as e:
            mprint_error(e)
            try_times += 1
    return {"status": 500, "message": "request failed"}


class OfficialSiteAPI:
    name = "official_site"

    def get_update_info(self, payload):
        path = "/api/v1/client-software/update-info"
        response_data = request("GET", path, payload)["data"]
        official_version = response_data["version"]
        # compare official_version with self.version
        # Version format: major.minor.patch
        official_version = tuple(map(int, official_version.split(".")))
        current_version = tuple(map(int, self.version.split(".")))
        response_data["updatable"] = official_version > current_version
        response = {"status": 200, "message": "success", "data": response_data}
        return response

    def list_templates(self, payload):
        path = "/api/v1/client-software/template/list"
        return request("GET", path, payload)

    def get_template(self, payload):
        path = "/api/v1/client-software/template/get"
        return request("GET", path, payload)

    def list_tags(self, payload):
        path = "/api/v1/client-software/tag/list"
        return request("GET", path, payload)
