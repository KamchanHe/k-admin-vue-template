<script lang="ts">
import { h } from 'vue';

export default {
  name: 'Redirect',
  setup() {
    const route = useRoute();
    const router = useRouter();

    onBeforeMount(() => {
      const { params, query } = route;
      const { path } = params;
      router.replace({ path: `/${path}`, query });
    });

    return () => h('div');
  }
};
</script>
