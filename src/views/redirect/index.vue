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
  name: 'Redirect',
  created() {
    const { params, query } = this.$route;
    const { path } = params;
    this.$router.replace({ path: `/${path}`, query });
  }
};
</script>
