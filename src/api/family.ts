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

export const getFamilyDiaryList = (params?: object) => {
  return http.request<PageResult>(
    "get",
    "http://localhost:8081/family/diary/list",
    { params }
  );
};

export const getFamilyDiaryDetail = (params?: object) => {
  return http.request<Result>(
    "get",
    "http://localhost:8081/family/diary/detail",
    { params }
  );
};

export const addFamilyDiary = (data?: object) => {
  return http.request<PageResult>(
    "post",
    "http://localhost:8081/family/diary/add",
    { data }
  );
};

export const deleteFamilyDiary = (params?: object) => {
  return http.request<Result>(
    "get",
    "http://localhost:8081/family/diary/delete",
    { params }
  );
};

export const updateFamilyDiary = (data?: object) => {
  return http.request<Result>(
    "post",
    "http://localhost:8081/family/diary/update",
    { data }
  );
};

export const getFamilySendWordList = (params?: object) => {
  return http.request<PageResult>(
    "get",
    "http://localhost:8081/family/send_word/list",
    { params }
  );
};

export const getFamilySendWordDetail = (params?: object) => {
  return http.request<Result>(
    "get",
    "http://localhost:8081/family/send_word/detail",
    { params }
  );
};

export const addFamilySendWord = (data?: object) => {
  return http.request<PageResult>(
    "post",
    "http://localhost:8081/family/send_word/add",
    { data }
  );
};

export const deleteFamilySendWord = (params?: object) => {
  return http.request<Result>(
    "get",
    "http://localhost:8081/family/send_word/delete",
    { params }
  );
};

export const updateFamilySendWord = (data?: object) => {
  return http.request<Result>(
    "post",
    "http://localhost:8081/family/send_word/update",
    { data }
  );
};

export const getFamilyActivityPlanList = (params?: object) => {
  return http.request<PageResult>(
    "get",
    "http://localhost:8081/family/activity_plan/list",
    { params }
  );
};

export const getFamilyActivityPlanDetail = (params?: object) => {
  return http.request<Result>(
    "get",
    "http://localhost:8081/family/activity_plan/detail",
    { params }
  );
};

export const addFamilyActivityPlan = (data?: object) => {
  return http.request<PageResult>(
    "post",
    "http://localhost:8081/family/activity_plan/add",
    { data }
  );
};

export const deleteFamilyActivityPlan = (params?: object) => {
  return http.request<Result>(
    "get",
    "http://localhost:8081/family/activity_plan/delete",
    { params }
  );
};

export const updateFamilyActivityPlan = (data?: object) => {
  return http.request<Result>(
    "post",
    "http://localhost:8081/family/activity_plan/update",
    { data }
  );
};

export const addFamilyActivityPlanNode = (data?: object) => {
  return http.request<PageResult>(
    "post",
    "http://localhost:8081/family/activity_plan/node/add",
    { data }
  );
};

export const addFamilyActivityPlanActivity = (data?: object) => {
  return http.request<PageResult>(
    "post",
    "http://localhost:8081/family/activity_plan/activity/add",
    { data }
  );
};

export const getFamilyActivityPlanNodeDetail = (params?: object) => {
  return http.request<Result>(
    "get",
    "http://localhost:8081/family/activity_plan/node/detail",
    { params }
  );
};

export const deleteFamilyActivityPlanActivity = (params?: object) => {
  return http.request<Result>(
    "get",
    "http://localhost:8081/family/activity_plan/activity/delete",
    { params }
  );
};

export const deleteFamilyActivityPlanNode = (params?: object) => {
  return http.request<Result>(
    "get",
    "http://localhost:8081/family/activity_plan/node/delete",
    { params }
  );
};
