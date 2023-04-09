<script setup lang="ts">
import { healthKnowledgeEdit } from "./hook";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue";

defineOptions({
  name: "KnowledgeEdit"
});

const mode = "default";
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref("<p>hello</p>");

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = "<p>模拟 Ajax 异步设置内容</p>";
  }, 1500);
});

const toolbarConfig: any = { excludeKeys: "fullScreen" };
const editorConfig = { placeholder: "请输入内容..." };

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = editor => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

const { title, detail } = healthKnowledgeEdit();
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
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.main-content {
  margin: 0 !important;
}
</style>
