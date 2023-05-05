<script setup lang="ts">
import {ref, unref, watch} from "vue";
import { message } from "@/utils/message";
import { FormInstance, UploadFile, UploadFiles } from "element-plus";
import { UploadFilled } from "@element-plus/icons-vue";
import { addFamilyVideoList } from "@/api/family";
import {useTags} from "@/layout/hooks/useTag";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    default: () => {
      return {};
    }
  }
});

const { route, router } = useTags();
const ruleFormRef = ref<FormInstance>();

const formVisible = ref(false);
const formData = ref(props.data);
const file_url = ref("");

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(valid => {
    if (valid) {
      formData.value.url = file_url.value;
      addFamilyVideoList(formData.value);
      message("操作成功", { type: "success" });
      formVisible.value = false;
      resetForm(formEl);
      onFresh();
    }
  });
};

/** 刷新路由 */
function onFresh() {
  const { fullPath, query } = unref(route);
  router.replace({
    path: "/redirect" + fullPath,
    query: query
  });
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const closeDialog = () => {
  formVisible.value = false;
  resetForm(ruleFormRef.value);
};

const emit = defineEmits(["update:visible"]);
watch(
  () => formVisible.value,
  val => {
    emit("update:visible", val);
  }
);

watch(
  () => props.visible,
  val => {
    formVisible.value = val;
  }
);

watch(
  () => props.data,
  val => {
    formData.value = val;
  }
);

const rules = {
  title: [{ required: true, message: "请输入养生视频标题", trigger: "blur" }]
};

const fileUploadSuccess = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  file_url.value = response.data || "";
};
</script>

<template>
  <el-dialog
    v-model="formVisible"
    title="上传家庭养生视频"
    :width="680"
    draggable
    :before-close="closeDialog"
  >
    <!-- 表单内容 -->
    <el-form
      ref="ruleFormRef"
      :model="formData"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="标题" prop="title">
        <el-input
          v-model="formData.title"
          :style="{ width: '480px' }"
          placeholder="请输入养生视频标题"
        />
      </el-form-item>
      <el-form-item>
        <el-upload
          class="upload-demo"
          drag
          action="http://localhost:8081/file/upload"
          multiple
          :on-success="fileUploadSuccess"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">拖动文件上传 或者 <em>点击上传</em></div>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>
