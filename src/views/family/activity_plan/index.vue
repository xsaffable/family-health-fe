<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { PaginationProps } from "@pureadmin/table";
import { getHealthKnowledgeList } from "@/api/health";
import addForm from "./add.vue";
import plan from "./plan.vue";

import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import InformationLine from "@iconify-icons/ri/information-line";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";
import AddFill from "@iconify-icons/ri/add-circle-line";

defineOptions({
  name: "activity_plan"
});

const form = reactive({
  title: "",
  creator_name: "",
  content: ""
});
const rowDetail = reactive({
  title: "",
  content: ""
});
const dataList = ref([]);
const loading = ref(true);
const formDialogVisible = ref(false);
const planDialogVisible = ref(false);
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

function handleAdd() {
  rowDetail.title = "";
  rowDetail.content = "";
  formDialogVisible.value = true;
}

function handleDetail(row) {
  rowDetail.title = row.title;
  rowDetail.content = row.content;
  planDialogVisible.value = true;
}

function handleUpdate(row) {
  rowDetail.title = row.title;
  rowDetail.content = row.content;
  planDialogVisible.value = true;
}

function handleDelete(row) {
  console.log("delete");
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
  form.content = "";
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
      <el-form-item label="创建人：" prop="creator_name">
        <el-input
          v-model="form.creator_name"
          placeholder="请输入创建人"
          clearable
          class="!w-[180px]"
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

    <PureTableBar title="家庭养生活动计划列表" @refresh="onSearch">
      <template #buttons>
        <el-button
          type="primary"
          :icon="useRenderIcon(AddFill)"
          @click="handleAdd"
        >
          新增计划
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
            <el-popconfirm title="是否确认删除?" @confirm="handleDelete(row)">
              <template #reference>
                <el-button
                  class="reset-margin"
                  link
                  type="primary"
                  :size="size"
                  :icon="useRenderIcon(Delete)"
                >
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
    <addForm v-model:visible="formDialogVisible" v-model:data="rowDetail" />
    <plan v-model:visible="planDialogVisible" v-model:data="rowDetail" />
  </div>
</template>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}
</style>
