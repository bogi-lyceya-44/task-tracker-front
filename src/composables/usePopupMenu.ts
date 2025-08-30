import { onBeforeUnmount, onMounted, type Ref, ref } from "vue";

const usePopupMenu = (wrapper: Ref<HTMLDivElement | null>) => {
  const isOpen = ref(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      isOpen.value &&
      wrapper.value &&
      !wrapper.value.contains(event.target as Node)
    ) {
      isOpen.value = false;
    }
  };

  const handleClickEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      isOpen.value = false;
    }
  };

  const switchOpenPreview = () => {
    isOpen.value = !isOpen.value;
  };

  onMounted(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleClickEscape);
  });

  onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside);
    document.removeEventListener("keydown", handleClickEscape);
  });

  return { isOpen, switchOpenPreview };
};

export default usePopupMenu;
