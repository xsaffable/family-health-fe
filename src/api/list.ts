import { http } from "@/utils/http";

type Result = {
  success: boolean;
  data?: {
    /** 列表数据 */
    list: Array<any>;
  };
};

/** 卡片列表 */
export const getCardList = (params?: object) => {
  return http.request<Result>(
    "get",
    "http://localhost:8081/family/picture/list",
    { params }
  );
};

export const addFamilyPicture = (data?: object) => {
  return http.request<Result>(
    "post",
    "http://localhost:8081/family/picture/add",
    { data }
  );
};

export const updateFamilyPicture = (data?: object) => {
  return http.request<Result>(
    "post",
    "http://localhost:8081/family/picture/update",
    { data }
  );
};

export const deleteFamilyPicture = (params?: object) => {
  return http.request<Result>(
    "get",
    "http://localhost:8081/family/picture/delete",
    { params }
  );
};
