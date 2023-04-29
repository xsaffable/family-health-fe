import { getHealthKnowledgeList } from "@/api/health";
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";
import { useRouter } from "vue-router";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, computed, onMounted } from "vue";

export function healthKnowledge() {
  const router = useRouter();
  const form = reactive({
    title: "",
    creator_name: "",
    review_status: ""
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
      label: "创建人",
      prop: "creator_name",
      minWidth: 150
    },
    {
      label: "创建时间",
      minWidth: 180,
      prop: "create_time"
    },
    {
      label: "视频",
      slot: "video",
      minWidth: 200
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
      path: `/health/knowledge/detail`,
      name: "KnowledgeDetail",
      query: { id: String(row.id), title: String(row.title) },
      meta: {
        title: `养生知识详情信息 - ${row.title}`,
        // 最大打开标签数
        dynamicLevel: 5
      }
    });
    // 路由跳转
    router.push({
      name: "KnowledgeDetail",
      query: { id: String(row.id), title: String(row.title) }
    });
  }

  function handleUpdate(row) {
    console.log(row);
    useMultiTagsStoreHook().handleTags("push", {
      path: `/health/knowledge/edit`,
      name: "KnowledgeEdit",
      query: { id: String(row.id), title: String(row.title) },
      meta: {
        title: `养生知识编辑 - ${row.title}`,
        // 最大打开标签数
        dynamicLevel: 5
      }
    });
    // 路由跳转
    router.push({
      name: "KnowledgeEdit",
      query: { id: String(row.id), title: String(row.title) }
    });
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