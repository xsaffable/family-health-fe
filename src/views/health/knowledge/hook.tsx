import { getHealthKnowledgeList } from "@/api/health";
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";
import { useRouter, useRoute } from "vue-router";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, computed, onMounted, onBeforeMount } from "vue";

export function healthKnowledge() {
  const route = useRoute();
  const router = useRouter();
  const id = route.query?.id ? route.query?.id : route.params?.id;
  const form = reactive({
    title: "",
    creator_name: "",
    review_status: ""
  });
  const dataList = ref([]);
  const loading = ref(true);
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      type: "selection",
      width: 55,
      align: "left",
      hide: ({ checkList }) => !checkList.includes("勾选列")
    },
    {
      label: "序号",
      type: "index",
      width: 70,
      hide: ({ checkList }) => !checkList.includes("序号列")
    },
    {
      label: "标题",
      prop: "title",
      minWidth: 120
    },
    {
      label: "创建人",
      prop: "creator_name",
      minWidth: 150
    },
    {
      label: "审核人",
      prop: "reviewer_name",
      minWidth: 100
    },
    {
      label: "审核状态",
      prop: "review_status_name",
      minWidth: 150,
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={
            row.review_status === 1
              ? ""
              : row.review_status === 2
              ? "warning"
              : row.review_status === 3
              ? "success"
              : "danger"
          }
          effect="plain"
        >
          {row.review_status_name}
        </el-tag>
      )
    },
    {
      label: "创建时间",
      minWidth: 180,
      prop: "create_time"
    },
    {
      label: "审核时间",
      minWidth: 180,
      prop: "review_time"
    },
    {
      label: "操作",
      fixed: "right",
      width: 250,
      slot: "operation"
    }
  ];
  const buttonClass = computed(() => {
    return [
      "!h-[20px]",
      "reset-margin",
      "!text-gray-500",
      "dark:!text-white",
      "dark:hover:!text-primary"
    ];
  });
  function handleDetail(row) {
    console.log(row);
    toDetail(row.id);
  }

  function handleUpdate(row) {
    console.log(row);
  }

  function handleDelete(row) {
    loading.value = true;
    console.log(row);
    dataList.value = dataList.value.filter(item => item.id !== row.id);
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  function handleSizeChange(val: number) {
    console.log(`${val} items per page`);
  }

  function handleCurrentChange(val: number) {
    console.log(`current page: ${val}`);
  }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await getHealthKnowledgeList(form);
    dataList.value = data.list;
    pagination.total = data.total;
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  const resetForm = formEl => {
    if (!formEl) return;
    form.title = "";
    form.creator_name = "";
    form.review_status = "";
    formEl.resetFields();
    onSearch();
  };

  function toDetail(id) {
    useMultiTagsStoreHook().handleTags("push", {
      path: `/health/knowledge/detail`,
      name: "KnowledgeDetail",
      query: { id: String(id) },
      meta: {
        title: `养生知识详情信息 - ${id}`,
        // 最大打开标签数
        dynamicLevel: 5
      }
    });
    // 路由跳转
    router.push({ name: "KnowledgeDetail", query: { id: String(id) } });
  }

  function initToDetail() {
    onBeforeMount(() => {
      if (id) toDetail(id);
    });
  }

  onMounted(() => {
    onSearch();
  });

  return {
    id,
    form,
    loading,
    columns,
    dataList,
    pagination,
    buttonClass,
    initToDetail,
    onSearch,
    resetForm,
    handleDetail,
    handleUpdate,
    handleDelete,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}

export function healthKnowledgeDetail() {
  const { pkg, lastBuildTime } = __APP_INFO__;
  const { version } = pkg;
  const columns = [
    {
      label: "版本",
      cellRenderer: () => {
        return <el-tag size="small">{version}</el-tag>;
      }
    },
    {
      label: "最后编译时间",
      cellRenderer: () => {
        return <el-tag size="small">{lastBuildTime}</el-tag>;
      }
    },
    {
      label: "文档地址",
      cellRenderer: () => {
        return (
          <a
            href="https://yiming_chang.gitee.io/pure-admin-doc"
            target="_blank"
          >
            <span style="color: var(--el-color-primary)">文档地址</span>
          </a>
        );
      }
    },
    {
      label: "预览地址",
      cellRenderer: () => {
        return (
          <a
            href="https://yiming_chang.gitee.io/vue-pure-admin"
            target="_blank"
          >
            <span style="color: var(--el-color-primary)">预览地址</span>
          </a>
        );
      }
    },
    {
      label: "Github",
      cellRenderer: () => {
        return (
          <a
            href="https://github.com/pure-admin/vue-pure-admin"
            target="_blank"
          >
            <span style="color: var(--el-color-primary)">Github</span>
          </a>
        );
      }
    },
    {
      label: "QQ交流群",
      cellRenderer: () => {
        return (
          <a href="https://jq.qq.com/?_wv=1027&k=E9fwmFGr" target="_blank">
            <span style="color: var(--el-color-primary)">
              点击链接加入群聊【Pure Admin】
            </span>
          </a>
        );
      }
    }
  ];

  return {
    columns
  };
}

