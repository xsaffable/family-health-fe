import { http } from "@/utils/http";

type PageResult = {
  success: boolean;
  data?: {
    /** 列表数据 */
    list: Array<any>;
    /** 总数 */
    total?: number;
  };
};

type Result = {
  success: boolean;
  data?: Array<any>;
};

export const getFamilyVideoList = (params?: object) => {
  return http.request<PageResult>(
    "get",
    "http://localhost:8081/family/video/list",
    { params }
  );
};

export const addFamilyVideoList = (data?: object) => {
  return http.request<PageResult>(
    "post",
    "http://localhost:8081/family/video/add",
    { data }
  );
};

export const deleteFamilyVideoList = (params?: object) => {
  return http.request<PageResult>(
    "get",
    "http://localhost:8081/family/video/delete",
    { params }
  );
};
