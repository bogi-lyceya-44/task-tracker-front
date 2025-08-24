import { defineComponent, provide } from "vue";
import { RouterView } from "vue-router";

import AppNavbar from "./components/AppNavbar";
import { useTheme } from "./composables/useTheme.ts";

const App = defineComponent(() => {
  const { theme, updateTheme } = useTheme();
  provide("theme", theme);
  provide("updateTheme", updateTheme);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return () => (
    <div class="app" onDragover={handleDragOver}>
      <AppNavbar />
      <RouterView class="main-content" />
    </div>
  );
});

export default App;
