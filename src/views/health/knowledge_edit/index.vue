<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { onBeforeUnmount, onMounted, ref, shallowRef } from "vue";
import { useRoute } from "vue-router";
import { getHealthKnowledgeDetail } from "@/api/health";

defineOptions({
  name: "KnowledgeEdit"
});

const mode = "default";
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref("<p>hello</p>");

const toolbarConfig: any = { excludeKeys: "fullScreen" };
const editorConfig = { placeholder: "请输入内容..." };

const route = useRoute();
const loading = ref(true);
const detail = ref({});
const id = route.query?.id ? route.query?.id : route.params?.id;
const title = route.query?.title ? route.query?.title : route.params?.title;

async function init() {
  loading.value = true;
  const { data } = await getHealthKnowledgeDetail({ id: id });
  detail.value = data;
  valueHtml.value = data.content;
  setTimeout(() => {
    loading.value = false;
  }, 500);
}

onMounted(() => {
  init();
});

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = editor => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

/**
 * 保存内容
 */
function save() {
  const editor_content = editorRef.value.getHtml();
  console.log(editor_content);
}

/**
 * 提交审核
 */
function submit_review() {
  console.log(id);
}

/**
 * 审核通过
 */
function pass_review() {
  console.log(id);
}

/**
 * 审核拒绝
 */
function reject_review() {
  console.log(id);
}
</script>

<template>
  <div>
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
      <div class="wangeditor">
        <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          :mode="mode"
        />
        <Editor
          style="height: 500px; overflow-y: hidden"
          v-model="valueHtml"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="handleCreated"
        />
      </div>
      <el-divider />
      <div style="float: left; margin-bottom: 20px">
        <el-button type="info" @click="save"> 保存 </el-button>
      </div>
      <div style="float: right; margin-bottom: 20px">
        <el-button type="primary" @click="submit_review"> 提交审核 </el-button>
        <el-button type="success" @click="pass_review"> 审核通过 </el-button>
        <el-button type="danger" @click="reject_review"> 审核拒绝 </el-button>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.main-content {
  margin: 0 !important;
}
</style>