<script lang="ts">
import { createVNode, resolveComponent } from 'vue';
import svg from '@/components/SvgIcon/index.vue';
import { isExternal } from '@/utils';

export default defineComponent({
  name: 'KIcon',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { name } = { ...props };
    if (name.indexOf('el-icon-') === 0) {
      return () =>
        createVNode('el-icon', { class: 'icon el-icon' }, [
          createVNode(resolveComponent(name))
        ]);
    }
    if (name.indexOf('local-') === 0 || isExternal(name)) {
      return () =>
        createVNode(svg, {
          name
        });
    }
    return () => createVNode('i', { class: [name, 'icon'] });
  }
});
</script>
