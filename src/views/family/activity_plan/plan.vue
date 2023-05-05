<script setup lang="ts">
import { ref, watch } from "vue";
import { FormInstance } from "element-plus";
import addPlan from "./add_plan.vue";

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

function handleDelete() {
  console.log("删除时间节点");
}

function handleDetail() {
  console.log("查看时间节点详情");
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
        <el-button type="primary" @click="addDialogVisible = true">
          新增时间节点
        </el-button>
      </div>
    </template>
    <el-timeline>
      <el-timeline-item timestamp="2018/4/12" placement="top">
        <el-card>
          <template #header>
            <div class="card-header">
              <span><h4>测试标题</h4></span>
              <span>
                <el-button class="button" text @click="handleDetail">详情</el-button>
                <el-button class="button" text @click="handleDelete">删除</el-button>
              </span>
            </div>
          </template>
          <p>这是一个时间节点的测试描述</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/12" placement="top">
        <el-card>
          <template #header>
            <div class="card-header">
              <span><h4>测试标题</h4></span>
              <span>
                <el-button class="button" text>详情</el-button>
                <el-button class="button" text @click="handleDelete">删除</el-button>
              </span>
            </div>
          </template>
          <p>这是一个时间节点的测试描述</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/12" placement="top">
        <el-card>
          <template #header>
            <div class="card-header">
              <span><h4>测试标题</h4></span>
              <span>
                <el-button class="button" text>详情</el-button>
                <el-button class="button" text>删除</el-button>
              </span>
            </div>
          </template>
          <p>这是一个时间节点的测试描述</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/12" placement="top">
        <el-card>
          <template #header>
            <div class="card-header">
              <span><h4>测试标题</h4></span>
              <span>
                <el-button class="button" text>详情</el-button>
                <el-button class="button" text>删除</el-button>
              </span>
            </div>
          </template>
          <p>这是一个时间节点的测试描述</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/12" placement="top">
        <el-card>
          <template #header>
            <div class="card-header">
              <span><h4>测试标题</h4></span>
              <span>
                <el-button class="button" text>详情</el-button>
                <el-button class="button" text>删除</el-button>
              </span>
            </div>
          </template>
          <p>这是一个时间节点的测试描述</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/3" placement="top">
        <el-card>
          <template #header>
            <div class="card-header">
              <span><h4>测试标题</h4></span>
              <span>
                <el-button class="button" text>详情</el-button>
                <el-button class="button" text>删除</el-button>
              </span>
            </div>
          </template>
          <p>这是一个时间节点的测试描述</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/2" placement="top">
        <el-card>
          <template #header>
            <div class="card-header">
              <span><h4>测试标题</h4></span>
              <span>
                <el-button class="button" text>详情</el-button>
                <el-button class="button" text>删除</el-button>
              </span>
            </div>
          </template>
          <p>这是一个时间节点的测试描述</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </el-dialog>
  <addPlan v-model:visible="addDialogVisible" />
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
