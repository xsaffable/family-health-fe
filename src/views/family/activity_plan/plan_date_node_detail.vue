<script setup lang="ts">
import {onMounted, ref, unref, watch} from "vue";
import { message } from "@/utils/message";
import { FormInstance, UploadFile, UploadFiles} from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps, UploadUserFile } from "element-plus";
import {addFamilyActivityPlanActivity, deleteFamilyActivityPlanActivity} from "@/api/family";

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

const formVisible = ref(false);
const formData = ref(props.data);

const closeDialog = () => {
  formVisible.value = false;
  // resetForm(ruleFormRef.value);
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

const dialogImageUrl = ref("");
const dialogVisible = ref(false);

const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  const real_url = uploadFile.url.split("?")[0];
  const picture_url = real_url.split("/")[real_url.split("/").length - 1]
  const req_data = { date_node_id: formData.value.id, picture_url: picture_url };
  deleteFamilyActivityPlanActivity(req_data);
};

const handlePictureCardPreview: UploadProps["onPreview"] = uploadFile => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};

const fileUploadSuccess = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  const url = response.data || "";
  console.log(url);
  const addData = { date_node_id: formData.value.id, picture_url: url };
  addFamilyActivityPlanActivity(addData);
};
</script>

<template>
  <el-dialog
    v-model="formVisible"
    title="养生计划活动"
    :width="680"
    draggable
    :before-close="closeDialog"
  >
    <el-upload
      v-model:file-list="formData.pic_urls"
      action="http://localhost:8081/file/upload"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="fileUploadSuccess"
    >
      <el-icon><Plus /></el-icon>
    </el-upload>

    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </el-dialog>
</template>
