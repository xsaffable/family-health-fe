<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { FormInstance } from "element-plus";
import addPlan from "./add_plan.vue";
import planDateNodeDetail from "./plan_date_node_detail.vue";
import {deleteFamilyActivityPlanNode, getFamilyActivityPlanNodeDetail} from "@/api/family";

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
const addDialogVisible = ref(false);
const detailDialogVisible = ref(false);
const plan = ref({});
const planNode = ref({});
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

defineOptions({
  name: "activity_plan"
});

function handleDelete(plan_node) {
  deleteFamilyActivityPlanNode({ id: plan_node.id });
  formData.value.plan_node_list = formData.value.plan_node_list.filter(
    item => item.id != plan_node.id
  );
}

async function handleDetail(plan_node) {
  const { data } = await getFamilyActivityPlanNodeDetail({
    id: plan_node.id
  });
  planNode.value = data;
  const pic_urls = [];
  for (const index in data.picture_urls) {
    pic_urls.push({ name: "", url: data.picture_urls[index] });
  }
  planNode.value.pic_urls = pic_urls;
  console.log(planNode.value);
  detailDialogVisible.value = true;
}
</script>

<template>
  <el-dialog
    v-model="formVisible"
    :width="680"
    draggable
    :before-close="closeDialog"
  >
    <template #header="{ titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">养生计划</h4>
        <el-button type="primary" @click="plan.id = formData.plan.id; addDialogVisible = true;" v-model:data="formData">
          新增时间节点
        </el-button>
      </div>
    </template>
    <el-timeline>
      <el-timeline-item
        v-for="(plan_node, index) in formData.plan_node_list"
        :key="index"
        :timestamp="plan_node.date_node"
        placement="top"
      >
        <el-card>
          <template #header>
            <div class="card-header">
              <span
                ><h4>{{ plan_node.title }}</h4></span
              >
              <span>
                <el-button class="button" text @click="handleDetail(plan_node)"
                  >详情</el-button
                >
                <el-button class="button" text @click="handleDelete(plan_node)"
                  >删除</el-button
                >
              </span>
            </div>
          </template>
          <p>{{ plan_node.remark }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </el-dialog>
  <addPlan v-model:visible="addDialogVisible" v-model:data="plan" />
  <planDateNodeDetail v-model:visible="detailDialogVisible" v-model:data="planNode" />
</template>

<style scoped lang="scss">
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-right: 50px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
