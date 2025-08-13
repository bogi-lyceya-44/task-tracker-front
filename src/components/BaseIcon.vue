<script lang="ts">
import { type Component, defineComponent, markRaw } from "vue";

export default defineComponent({
  name: "BaseIcon",
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: [Number, String],
      required: false,
    },
  },
  data(): { iconComponent: Component | null } {
    return {
      iconComponent: null,
    };
  },
  async created() {
    const module = await import(`../assets/icons/${this.name}.svg`);
    this.iconComponent = markRaw(module.default) as Component;
  },
});
</script>

<template>
  <component
    :is="iconComponent"
    :width="size || 16"
    :height="size || 16"
    style="display: inline-block; vertical-align: middle"
  />
</template>
