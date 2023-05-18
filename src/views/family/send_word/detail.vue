<script setup lang="ts">
import { ref, watch } from "vue";
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
  title: [{ required: true, message: "请输入家庭寄语标题", trigger: "blur" }]
};
</script>

<template>
  <el-dialog
    v-model="formVisible"
    title="家庭日记详情"
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
          disabled
          v-model="formData.title"
          :style="{ width: '480px' }"
        />
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input
          disabled
          v-model="formData.content"
          :style="{ width: '480px', min_height: '500px' }"
          :type="'textarea'"
        />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
