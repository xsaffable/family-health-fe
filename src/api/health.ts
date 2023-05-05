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

/** 获取健康知识列表 */
export const getHealthKnowledgeList = (params?: object) => {
  return http.request<PageResult>(
    "get",
    "http://localhost:8081/health/knowledge/list",
    { params }
  );
};

export const addHealthKnowledge = (data?: object) => {
  return http.request<PageResult>(
    "post",
    "http://localhost:8081/health/knowledge/add",
    { data }
  );
};

/** 获取健康知识详情 */
export const getHealthKnowledgeDetail = (params?: object) => {
  return http.request<Result>(
    "get",
    "http://localhost:8081/health/knowledge/detail",
    { params }
  );
};

export const deleteHealthKnowledge = (params?: object) => {
  return http.request<Result>(
    "get",
    "http://localhost:8081/health/knowledge/delete",
    { params }
  );
};

export const approvalHealthKnowledge = (params?: object) => {
  return http.request<Result>(
    "get",
    "http://localhost:8081/health/knowledge/approval",
    { params }
  );
};

export const updateHealthKnowledge = (data?: object) => {
  return http.request<Result>(
    "post",
    "http://localhost:8081/health/knowledge/update",
    { data }
  );
};

/** 获取健康知识列表 */
export const getHealthNewsList = (params?: object) => {
  return http.request<PageResult>(
    "get",
    "http://localhost:8081/health/news/list",
    { params }
  );
};

export const addHealthNews = (data?: object) => {
  return http.request<PageResult>(
    "post",
    "http://localhost:8081/health/news/add",
    { data }
  );
};

/** 获取健康知识详情 */
export const getHealthNewsDetail = (params?: object) => {
  return http.request<Result>(
    "get",
    "http://localhost:8081/health/news/detail",
    { params }
  );
};

export const deleteHealthNews = (params?: object) => {
  return http.request<Result>(
    "get",
    "http://localhost:8081/health/news/delete",
    { params }
  );
};

export const updateHealthNews = (data?: object) => {
  return http.request<Result>(
    "post",
    "http://localhost:8081/health/news/update",
    { data }
  );
};
