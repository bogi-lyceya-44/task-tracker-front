import { defineComponent } from "vue";
import { RouterView } from "vue-router";

import AppNavbar from "./components/AppNavbar";

const App = defineComponent(() => {
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

