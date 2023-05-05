<script setup lang="ts">
import Card from "./components/Card.vue";
import {deleteFamilyPicture, getCardList} from "@/api/list";
import { message } from "@/utils/message";
import { ElMessageBox } from "element-plus";
import { ref, onMounted, nextTick } from "vue";
import dialogForm from "./components/DialogForm.vue";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Search from "@iconify-icons/ep/search";
import AddFill from "@iconify-icons/ri/add-circle-line";

defineOptions({
  name: "picture"
});

const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;

const INITIAL_DATA = {
  title: "",
  remark: "",
  category: ""
};

const pagination = ref({ current: 1, pageSize: 12, total: 0 });

const productList = ref([]);
const dataLoading = ref(true);
const formDialogVisible = ref(false);
const formData = ref({ ...INITIAL_DATA });
const searchData = ref({});

const getCardListData = async () => {
  try {
    const { data } = await getCardList({ category: searchData.value.type });
    productList.value = data.list;
    pagination.value = {
      ...pagination.value,
      total: data.list.length
    };
  } catch (e) {
    console.log(e);
  } finally {
    setTimeout(() => {
      dataLoading.value = false;
    }, 500);
  }
};

onMounted(() => {
  getCardListData();
});

const onPageSizeChange = (size: number) => {
  pagination.value.pageSize = size;
  pagination.value.current = 1;
};
const onCurrentChange = (current: number) => {
  pagination.value.current = current;
};
const handleDeleteItem = product => {
  ElMessageBox.confirm(
    product
      ? `确认删除后【${product.title}】的所有信息将被清空, 且无法恢复`
      : "",
    "提示",
    {
      type: "warning"
    }
  )
    .then(() => {
      deleteFamilyPicture({ id: product.id });
      message("删除成功", { type: "success" });
      setTimeout(() => {
        getCardListData();
      }, 500);
    })
    .catch(() => {});
};
const handleManageProduct = product => {
  formDialogVisible.value = true;
  nextTick(() => {
    formData.value = { ...product, is_add: 0 };
  });
};

const searchChange = value => {
  getCardListData();
};

const SELECT_OPTIONS = [
  { label: "泡温泉", value: 1 },
  { label: "按摩", value: 2 },
  { label: "喝茶", value: 3 },
  { label: "游泳", value: 4 }
];
</script>

<template>
  <div class="main">
    <div class="w-full flex justify-between mb-4">
      <el-button
        :icon="useRenderIcon(AddFill)"
        @click="
          formData.is_add = 1;
          formDialogVisible = true;
        "
      >
        上传图片
      </el-button>
      <el-select
        v-model="searchData.type"
        clearable
        :style="{ width: '300px' }"
        @change="searchChange"
      >
        <el-option
          v-for="(item, index) in SELECT_OPTIONS"
          :key="index"
          :value="item.value"
          :label="item.label"
        >
          {{ item.label }}
        </el-option>
      </el-select>
    </div>
    <div
      v-loading="dataLoading"
      :element-loading-svg="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
    >
      <el-empty
        description="暂无数据"
        v-show="
          productList.slice(
            pagination.pageSize * (pagination.current - 1),
            pagination.pageSize * pagination.current
          ).length === 0
        "
      />
      <template v-if="pagination.total > 0">
        <el-row :gutter="16">
          <el-col
            v-for="(product, index) in productList.slice(
              pagination.pageSize * (pagination.current - 1),
              pagination.pageSize * pagination.current
            )"
            :key="index"
            :xs="24"
            :sm="12"
            :md="8"
            :lg="8"
            :xl="4"
          >
            <Card
              :product="product"
              @delete-item="handleDeleteItem"
              @manage-product="handleManageProduct"
            />
          </el-col>
        </el-row>
        <el-pagination
          class="float-right"
          v-model:currentPage="pagination.current"
          :page-size="pagination.pageSize"
          :total="pagination.total"
          :page-sizes="[12, 24, 36]"
          :background="true"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="onPageSizeChange"
          @current-change="onCurrentChange"
        />
      </template>
    </div>
    <dialogForm v-model:visible="formDialogVisible" :data="formData" />
  </div>
</template>
