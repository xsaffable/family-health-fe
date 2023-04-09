import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { getHealthKnowledgeDetail } from "@/api/health";

export function healthKnowledgeEdit() {
  const route = useRoute();
  const loading = ref(true);
  const detail = ref({});
  const id = route.query?.id ? route.query?.id : route.params?.id;
  const title = route.query?.title ? route.query?.title : route.params?.title;

  async function init() {
    loading.value = true;
    const { data } = await getHealthKnowledgeDetail({ id: id });
    detail.value = data;
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  onMounted(() => {
    init();
  });

  return {
    id,
    title,
    detail
  };
}
