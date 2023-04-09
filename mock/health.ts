import { MockMethod } from "vite-plugin-mock";

const health_knowledge_data_mock = [
  {
    id: 1,
    title: "测试的养生知识",
    creator_name: "张三",
    reviewer_name: null,
    review_status: 1, // 1: 未提交, 2: 审核中, 3: 审核通过, 4: 审核拒绝
    review_status_name: "未提交",
    create_time: "2023-04-01 10:00:00",
    update_time: "2023-04-10 10:00:00",
    review_time: null
  },
  {
    id: 2,
    title: "测试的养生知识22",
    creator_name: "李四",
    reviewer_name: "老四",
    review_status: 2, // 1: 未提交, 2: 审核中, 3: 审核通过, 4: 审核拒绝
    review_status_name: "审核中",
    create_time: "2023-04-01",
    update_time: "2023-04-10 10:00:00",
    review_time: null
  },
  {
    id: 3,
    title: "测试的养生知识xx",
    creator_name: "王五",
    reviewer_name: "老四",
    review_status: 4, // 1: 未提交, 2: 审核中, 3: 审核通过, 4: 审核拒绝
    review_status_name: "审核拒绝",
    create_time: "2023-04-01",
    update_time: "2023-04-10 10:00:00",
    review_time: "2023-04-10"
  },
  {
    id: 4,
    title: "测试的养生知识",
    creator_name: "赵六",
    reviewer_name: null,
    review_status: 1, // 1: 未提交, 2: 审核中, 3: 审核通过, 4: 审核拒绝
    review_status_name: "未提交",
    create_time: "2023-04-01",
    update_time: "2023-04-10 10:00:00",
    review_time: null
  },
  {
    id: 5,
    title: "测试的养生知识哈哈哈",
    creator_name: "小明",
    reviewer_name: "老四",
    review_status: 3, // 1: 未提交, 2: 审核中, 3: 审核通过, 4: 审核拒绝
    review_status_name: "审核通过",
    create_time: "2023-04-01",
    update_time: "2023-04-10 10:00:00",
    review_time: "2023-04-11"
  }
];

export default [
  {
    url: "/health/knowledge_list",
    method: "get",
    response: () => {
      return {
        success: true,
        data: {
          list: health_knowledge_data_mock,
          total: health_knowledge_data_mock.length
        }
      };
    }
  },
  {
    url: "/health/knowledge_detail",
    method: "get",
    response: options => {
      const query_param = options.query;
      const query_id = query_param.id;
      return {
        success: true,
        data: health_knowledge_data_mock.filter(item => item.id == query_id)[0]
      };
    }
  }
] as MockMethod[];
