import { ref, watchEffect } from "vue";

export type Theme = "system" | "light" | "dark";

export type UpdateTheme = (_: Theme) => void;

export function useTheme() {
  const storedTheme = localStorage.theme;
  const theme = ref<Theme>(
    storedTheme === "light" ||
      storedTheme === "dark" ||
      storedTheme === "system"
      ? storedTheme
      : "system",
  );

  watchEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme.value);
    localStorage.theme = theme.value;
  });

  const updateTheme = (val: typeof theme.value) => {
    theme.value = val;
  };

  return { theme, updateTheme };
}
