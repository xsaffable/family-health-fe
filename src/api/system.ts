import { http } from "@/utils/http";

type Result = {
  success: boolean;
  data?: {
    /** 列表数据 */
    list: Array<any>;
    /** 总数 */
    total?: number;
  };
};

type ResultDept = {
  success: boolean;
  data?: Array<any>;
};

type PageResult = {
  success: boolean;
  data?: {
    /** 列表数据 */
    list: Array<any>;
    /** 总数 */
    total?: number;
  };
};

/** 获取用户管理列表 */
export const getUserList = (data?: object) => {
  return http.request<Result>("post", "/user", { data });
};

/** 获取角色管理列表 */
export const getRoleList = (data?: object) => {
  return http.request<Result>("post", "/role", { data });
};

/** 获取部门管理列表 */
export const getDeptList = (data?: object) => {
  return http.request<ResultDept>("post", "/dept", { data });
};

export const getSysUserList = (params?: object) => {
  return http.request<PageResult>(
    "get",
    "http://localhost:8081/sys/user/list",
    { params }
  );
};

export const deleteSysUser = (params?: object) => {
  return http.request<Result>(
    "get",
    "http://localhost:8081/sys/user/delete",
    { params }
  );
};

export const updateSysUser = (data?: object) => {
  return http.request<Result>(
    "post",
    "http://localhost:8081/sys/user/update",
    { data }
  );
};

export const addSysUser = (data?: object) => {
  return http.request<PageResult>(
    "post",
    "http://localhost:8081/sys/user/add",
    { data }
  );
};
