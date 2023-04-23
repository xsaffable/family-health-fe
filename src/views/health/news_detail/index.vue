<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getHealthKnowledgeDetail } from "@/api/health";

defineOptions({
  name: "NewsDetail"
});

const mode = "default";
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref("<p>hello</p>");

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
        <el-descriptions-item label="更新时间" label-align="left" align="left">
          <span style="color: var(--el-color-primary)">{{
            detail.update_time
          }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="描述" label-align="left" align="left">
          <span style="color: var(--el-color-primary)">{{
            detail.description
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
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.main-content {
  margin: 0 !important;
}
</style>
