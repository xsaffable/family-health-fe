<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { PaginationProps } from "@pureadmin/table";
import { getFamilyDiaryList, deleteFamilyDiary } from "@/api/family";
import addForm from "./add.vue";
import detailForm from "./detail.vue";
import editForm from "./update.vue";

import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import InformationLine from "@iconify-icons/ri/information-line";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";
import AddFill from "@iconify-icons/ri/add-circle-line";

defineOptions({
  name: "diary"
});

const form = reactive({
  title: "",
  creator_name: "",
  content: "",
  page: null,
  limit: null
});
const rowDetail = reactive({
  id: "",
  title: "",
  content: ""
});
const formRef = ref();
const dataList = ref([]);
const loading = ref(true);
const formDialogVisible = ref(false);
const formDialogDetailVisible = ref(false);
const formDialogEditVisible = ref(false);
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
    minWidth: 100
  },
  {
    label: "内容",
    prop: "content",
    minWidth: 220
  },
  {
    label: "创建人",
    prop: "creator_name",
    minWidth: 100
  },
  {
    label: "创建时间",
    minWidth: 180,
    prop: "create_time"
  },
  {
    label: "更新时间",
    minWidth: 180,
    prop: "update_time"
  },
  {
    label: "操作",
    fixed: "right",
    width: 250,
    slot: "operation"
  }
];

function handleAdd() {
  rowDetail.id = "";
  rowDetail.title = "";
  rowDetail.content = "";
  formDialogVisible.value = true;
}

function handleDetail(row) {
  rowDetail.id = row.id;
  rowDetail.title = row.title;
  rowDetail.content = row.content;
  formDialogDetailVisible.value = true;
}

function handleUpdate(row) {
  rowDetail.id = row.id;
  rowDetail.title = row.title;
  rowDetail.content = row.content;
  formDialogEditVisible.value = true;
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

function handleDelete(row) {
  loading.value = true;
  deleteFamilyDiary(row);
  setTimeout(() => {
    loading.value = false;
  }, 500);
  onSearch();
}

async function onSearch() {
  loading.value = true;
  form.page = pagination.currentPage;
  form.limit = pagination.pageSize;
  const { data } = await getFamilyDiaryList(form);
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
</script>

<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="bg-bg_color w-[99/100] pl-8 pt-4"
    >
      <el-form-item label="标题：" prop="title">
        <el-input
          v-model="form.title"
          placeholder="请输入标题"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon(Search)"
          :loading="loading"
          @click="onSearch"
        >
          搜索
        </el-button>
        <el-button
          :icon="useRenderIcon(Refresh)"
          :loading="loading"
          @click="resetForm(formRef)"
        >
          重置
        </el-button>
      </el-form-item>
    </el-form>

    <PureTableBar title="家庭日记列表" @refresh="onSearch">
      <template #buttons>
        <el-button
          type="primary"
          :icon="useRenderIcon(AddFill)"
          @click="handleAdd"
        >
          新增家庭日记
        </el-button>
      </template>
      <template v-slot="{ size, checkList }">
        <pure-table
          border
          align-whole="center"
          showOverflowTooltip
          table-layout="auto"
          :loading="loading"
          :size="size"
          :data="dataList"
          :columns="columns"
          :checkList="checkList"
          :pagination="pagination"
          :paginationSmall="size === 'small' ? true : false"
          :header-cell-style="{
            background: 'var(--el-table-row-hover-bg-color)',
            color: 'var(--el-text-color-primary)'
          }"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
          <template #operation="{ row }">
            <el-button
              class="reset-margin"
              link
              type="primary"
              :size="size"
              :icon="useRenderIcon(InformationLine)"
              @click="handleDetail(row)"
            >
              详情
            </el-button>
            <el-button
              class="reset-margin"
              link
              type="primary"
              :size="size"
              :icon="useRenderIcon(EditPen)"
              @click="handleUpdate(row)"
            >
              修改
            </el-button>
            <el-button
              class="reset-margin"
              link
              type="primary"
              :size="size"
              :icon="useRenderIcon(Delete)"
              @click="handleDelete(row)"
            >
              删除
            </el-button>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
    <addForm v-model:visible="formDialogVisible" />
    <detailForm v-model:visible="formDialogDetailVisible" v-model:data="rowDetail" />
    <editForm v-model:visible="formDialogEditVisible" v-model:data="rowDetail" />
  </div>
</template>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}
</style>
