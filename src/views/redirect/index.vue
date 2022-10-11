<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Redirect',
  created() {
    const { params, query } = useRoute();
    const { path } = params;
    useRouter().replace({ path: `/${path}`, query });
  },
  // eslint-disable-next-line vue/require-render-return
  render() {}
});
</script>
