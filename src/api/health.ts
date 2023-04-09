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
  return http.request<PageResult>("get", "/health/knowledge_list", { params });
};

export const getHealthKnowledgeDetail = (params?: object) => {
  return http.request<Result>("get", "/health/knowledge_detail", { params });
};
