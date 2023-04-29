<script setup lang="ts">
import { ref, watch } from "vue";
import { message } from "@/utils/message";
import { FormInstance } from "element-plus";

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

const formVisible = ref(false);
const formData = ref(props.data);

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(valid => {
    if (valid) {
      message("提交成功", { type: "success" });
      formVisible.value = false;
      resetForm(formEl);
    }
  });
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
  title: [{ required: true, message: "请输入家庭日记标题", trigger: "blur" }]
};
</script>

<template>
  <el-dialog
    v-model="formVisible"
    title="新建家庭日记"
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
          placeholder="请输入家庭日记标题"
        />
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input
          v-model="formData.content"
          :style="{ width: '480px', min_height: '500px' }"
          :type="'textarea'"
          placeholder="请输入家庭日记内容"
        />
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
