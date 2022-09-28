<script setup lang="ts">
const route = useRoute();
const router = useRouter();

onBeforeMount(() => {
  const { params, query } = route;
  const { path } = params;
  router.replace({ path: `/${path}`, query });
});
</script>

<script lang="ts">
export default {
  name: 'Redirect'
};
</script>
