<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { onBeforeUnmount, ref, shallowRef, onMounted, unref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { approvalHealthKnowledge, getHealthKnowledgeDetail, updateHealthKnowledge } from "@/api/health";
import { message } from "@/utils/message";
import { getToken } from "@/utils/auth";

defineOptions({
  name: "KnowledgeDetail"
});

const mode = "default";
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref("<p>hello</p>");

const route = useRoute();
const router = useRouter();
const loading = ref(true);
const detail = ref({});
const id = route.query?.id ? route.query?.id : route.params?.id;
const title = route.query?.title ? route.query?.title : route.params?.title;

async function init() {
  loading.value = true;
  const { data } = await getHealthKnowledgeDetail({ id: id });
  detail.value = data;
  valueHtml.value = data.content || "";
  setTimeout(() => {
    loading.value = false;
  }, 500);
}

onMounted(() => {
  init();
});

const toolbarConfig: any = { excludeKeys: "fullScreen" };
const editorConfig = { placeholder: "请输入内容...", readOnly: true };

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = editor => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

/** 刷新路由 */
function onFresh() {
  const { fullPath, query } = unref(route);
  router.replace({
    path: "/redirect" + fullPath,
    query: query
  });
}

/**
 * 提交审核
 */
function submit_review() {
  const token = getToken();
  approvalHealthKnowledge({ id: id, approval: 2, user_id: token.user_id });
  message("操作成功", { type: "success" });
  onFresh();
}

/**
 * 审核通过
 */
function pass_review() {
  const token = getToken();
  approvalHealthKnowledge({ id: id, approval: 3, user_id: token.user_id });
  message("操作成功", { type: "success" });
  onFresh();
}

/**
 * 审核拒绝
 */
function reject_review() {
  const token = getToken();
  approvalHealthKnowledge({ id: id, approval: 4, user_id: token.user_id });
  message("操作成功", { type: "success" });
  onFresh();
}
</script>

<template>
  <div style="margin-bottom: 100px !important">
    <el-card class="box-card m-4" shadow="never">
      <template #header>
        <div class="card-header">
          <span class="font-medium">{{ title }}</span>
        </div>
      </template>
      <el-descriptions border>
        <el-descriptions-item label="创建人" label-align="left" align="left">
          <span style="color: var(--el-color-primary)">{{
            detail.creator_name
          }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="创建时间" label-align="left" align="left">
          <span style="color: var(--el-color-primary)">{{
            detail.create_time
          }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="审核人" label-align="left" align="left">
          <span style="color: var(--el-color-primary)">{{
            detail.reviewer_name
          }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="审核时间" label-align="left" align="left">
          <span style="color: var(--el-color-primary)">{{
            detail.review_time
          }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="审核状态" label-align="left" align="left">
          <span style="color: var(--el-color-primary)">{{
            detail.review_status_name
          }}</span>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card class="box-card m-4" shadow="never">
      <template #header>
        <div class="card-header">
          <span class="font-medium"> 详细内容 </span>
        </div>
      </template>
      <div v-html="detail.content" />
      <el-divider />
      <div style="float: right; margin-bottom: 20px">
        <el-button
          v-show="detail.review_status === 1 || detail.review_status === 4"
          type="primary"
          @click="submit_review"
        >
          提交审核
        </el-button>
        <el-button
          v-show="
            (detail.role === 'super_admin' || detail.role === 'admin') &&
            detail.review_status === 2
          "
          type="success"
          @click="pass_review"
        >
          审核通过
        </el-button>
        <el-button
          v-show="
            (detail.role === 'super_admin' || detail.role === 'admin') &&
            detail.review_status === 2
          "
          type="danger"
          @click="reject_review"
        >
          审核拒绝
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.main-content {
  margin: 0 !important;
}
</style>
