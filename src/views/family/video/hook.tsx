import { useRouter } from "vue-router";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, computed, onMounted } from "vue";
import { deleteFamilyVideoList, getFamilyVideoList } from "@/api/family";

export function healthKnowledge() {
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

  function handleDelete(row) {
    loading.value = true;
    deleteFamilyVideoList(row);
    dataList.value = dataList.value.filter(item => item.id !== row.id);
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  function handleSizeChange(val: number) {
    if (val && !val.id) {
      pagination.pageSize = val;
      onSearch();
    }
  }

  function handleCurrentChange(val: number) {
    if (val && !val.id) {
      pagination.currentPage = val;
      onSearch();
    }
  }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  async function onSearch() {
    loading.value = true;
    form.page = pagination.currentPage;
    form.limit = pagination.pageSize;
    const { data } = await getFamilyVideoList(form);
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
    handleDelete,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
