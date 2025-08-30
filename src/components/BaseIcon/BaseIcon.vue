<script setup lang="ts">
import { ref, onMounted, markRaw, type Component } from "vue";

const props = defineProps<{
  name: string;
  size?: string;
}>();

const iconComponent = ref<Component | null>(null);

onMounted(async () => {
  const module = await import(`../../assets/icons/${props.name}.svg`);
  iconComponent.value = markRaw(module.default) as Component;
});
</script>

<template>
  <component
    v-if="iconComponent"
    :is="iconComponent"
    :style="{
      display: 'inline-block',
      verticalAlign: 'middle',
      height: props.size || '1em',
      width: props.size || '1em',
    }"
  />
</template>
