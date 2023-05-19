<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { PaginationProps } from "@pureadmin/table";
import { getSysUserList, deleteSysUser } from "@/api/system";

import Delete from "@iconify-icons/ep/delete";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";

defineOptions({
  name: "user_index"
});

const form = reactive({
  nickname: "",
  page: null,
  limit: null
});

const formRef = ref();
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
    label: "用户名",
    prop: "username",
    minWidth: 100
  },
  {
    label: "用户昵称",
    prop: "nickname",
    minWidth: 220
  },
  {
    label: "角色",
    prop: "role",
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
  deleteSysUser(row);
  setTimeout(() => {
    loading.value = false;
  }, 500);
  onSearch();
}

async function onSearch() {
  loading.value = true;
  form.page = pagination.currentPage;
  form.limit = pagination.pageSize;
  const { data } = await getSysUserList(form);
  dataList.value = data.list;
  pagination.total = data.total;
  setTimeout(() => {
    loading.value = false;
  }, 500);
}

const resetForm = formEl => {
  if (!formEl) return;
  form.nickname = "";
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
      <el-form-item label="用户昵称：" prop="nickname">
        <el-input
          v-model="form.nickname"
          placeholder="请输入用户昵称"
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

    <PureTableBar title="用户列表" @refresh="onSearch">
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
              :icon="useRenderIcon(Delete)"
              @click="handleDelete(row)"
            >
              删除
            </el-button>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}
</style>
