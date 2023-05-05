<script setup lang="ts">
import { ref, unref, watch } from "vue";
import { message } from "@/utils/message";
import { FormInstance, UploadInstance, UploadFile, UploadFiles } from "element-plus";
import { UploadFilled } from "@element-plus/icons-vue";
import {addFamilyPicture, updateFamilyPicture} from "@/api/list";
import { useTags } from "@/layout/hooks/useTag";

const SELECT_OPTIONS = [
  { label: "泡温泉", value: 1 },
  { label: "按摩", value: 2 },
  { label: "喝茶", value: 3 },
  { label: "游泳", value: 4 }
];

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

const ruleFormRef = ref<FormInstance>();
const uploadRef = ref<UploadInstance>();

const formVisible = ref(false);
const formData = ref(props.data);
const file_url = ref("");

const { route, router } = useTags();

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(valid => {
    if (valid) {
      formData.value.url = file_url.value;
      if (formData.value.is_add == 1) {
        addFamilyPicture(formData.value);
      } else {
        updateFamilyPicture(formData.value);
      }
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

const fileUploadSuccess = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  console.log(response)
  file_url.value = response.data || "";
};

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
  title: [{ required: true, message: "请输入图片标题", trigger: "blur" }],
  category: [{ required: true, message: "请输入图片分类", trigger: "blur" }]
};
</script>

<template>
  <el-dialog
    v-model="formVisible"
    title="上传图片"
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
      <el-form-item label="图片标题" prop="title">
        <el-input
          v-model="formData.title"
          :style="{ width: '480px' }"
          placeholder="请输入图片标题"
        />
      </el-form-item>
      <el-form-item label="图片分类" prop="category">
        <el-select
          v-model="formData.category"
          clearable
          :style="{ width: '480px' }"
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
      </el-form-item>
      <el-form-item label="图片描述" prop="remark">
        <el-input
          v-model="formData.remark"
          type="textarea"
          :style="{ width: '480px' }"
          placeholder="请输入图片描述"
        />
      </el-form-item>
      <el-form-item v-if="formData.is_add && formData.is_add === 1">
        <el-upload
          class="upload-demo"
          drag
          action="http://localhost:8081/file/upload"
          multiple
          ref="uploadRef"
          :on-success="fileUploadSuccess"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            拖动文件上传 或者 <em>点击上传</em>
          </div>
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
