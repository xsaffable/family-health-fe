import { deleteHealthNews, getHealthNewsList } from "@/api/health";
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";
import { useRouter } from "vue-router";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, computed, onMounted } from "vue";

export function healthNews() {
  const router = useRouter();
  const form = reactive({
    title: "",
    page: null,
    limit: null
  });
  const dataList = ref([]);
  const loading = ref(true);
  const formDialogVisible = ref(false);
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
      label: "描述",
      prop: "remark",
      minWidth: 200
    },
    {
      label: "创建人",
      prop: "creator_name",
      minWidth: 100
    },
    {
      label: "创建时间",
      minWidth: 160,
      prop: "create_time"
    },
    {
      label: "更新时间",
      minWidth: 160,
      prop: "update_time"
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
  function handleAdd() {
    formDialogVisible.value = true;
  }

  function handleDetail(row) {
    console.log(row);
    useMultiTagsStoreHook().handleTags("push", {
      path: `/health/news/detail`,
      name: "NewsDetail",
      query: { id: String(row.id), title: String(row.title) },
      meta: {
        title: `养生新闻详情信息 - ${row.title}`,
        // 最大打开标签数
        dynamicLevel: 5
      }
    });
    // 路由跳转
    router.push({
      name: "NewsDetail",
      query: { id: String(row.id), title: String(row.title) }
    });
  }

  function handleUpdate(row) {
    useMultiTagsStoreHook().handleTags("push", {
      path: `/health/news/edit`,
      name: "NewsEdit",
      query: { id: String(row.id), title: String(row.title) },
      meta: {
        title: `养生新闻编辑 - ${row.title}`,
        // 最大打开标签数
        dynamicLevel: 5
      }
    });
    // 路由跳转
    router.push({
      name: "NewsEdit",
      query: { id: String(row.id), title: String(row.title) }
    });
  }

  function handleDelete(row) {
    loading.value = true;
    deleteHealthNews(row);
    setTimeout(() => {
      loading.value = false;
    }, 500);
    onSearch();
  }

  function handleSizeChange(val: number) {
    if (val && !val.id) {
      pagination.pageSize = val;
    }
    onSearch();
  }

  function handleCurrentChange(val: number) {
    if (val && !val.id) {
      pagination.currentPage = val;
    }
    onSearch();
  }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  async function onSearch() {
    loading.value = true;
    form.page = pagination.currentPage;
    form.limit = pagination.pageSize;
    const { data } = await getHealthNewsList(form);
    dataList.value = data.list;
    pagination.total = data.total;
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  const resetForm = formEl => {
    if (!formEl) return;
    form.title = "";
    formEl.resetFields();
    onSearch();
  };

  onMounted(() => {
    onSearch();
  });

  return {
    form,
    loading,
    columns,
    dataList,
    pagination,
    buttonClass,
    formDialogVisible,
    onSearch,
    resetForm,
    handleAdd,
    handleDetail,
    handleUpdate,
    handleDelete,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
