<script setup lang="ts">
import { ref, unref, watch } from "vue";
import { message } from "@/utils/message";
import { FormInstance } from "element-plus";
import { useTags } from "@/layout/hooks/useTag";
import { updateSysUser } from "@/api/system";

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

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(valid => {
    if (valid) {
      if (formData.value.role === "超级管理员") {
        formData.value.role = 0;
      } else if (formData.value.role === "管理员") {
        formData.value.role = 1;
      } else if (formData.value.role === "普通用户") {
        formData.value.role = 2;
      }
      updateSysUser(formData.value);
      message("提交成功", { type: "success" });
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

const SELECT_OPTIONS = [
  { label: "管理员", value: 1 },
  { label: "普通用户", value: 2 }
];

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
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  nickname: [{ required: true, message: "请输入用户昵称", trigger: "blur" }],
  role: [{ required: true, message: "请设置用户角色", trigger: "blur" }],
  password: [{ required: true, message: "请设置密码", trigger: "blur" }]
};
</script>

<template>
  <el-dialog
    v-model="formVisible"
    title="修改用户"
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
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="formData.username"
          :style="{ width: '480px' }"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input
          v-model="formData.nickname"
          :style="{ width: '480px' }"
          placeholder="请输入用户昵称"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="formData.password"
          :style="{ width: '480px' }"
          clearable
          show-password
          placeholder="请输入密码"
        />
      </el-form-item>
      <el-form-item label="用户角色" prop="role">
        <el-select
          v-model="formData.role"
          clearable
          :style="{ width: '480px' }"
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
