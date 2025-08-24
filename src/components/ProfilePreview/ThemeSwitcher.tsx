import { defineComponent, ref, watchEffect, type Ref } from "vue";

import Icon from "../Icon";

import styles from "./style.ts";

const ThemeSwitcher = defineComponent(
  (props) => {
    const isOpenSub = ref(false);

    watchEffect(() => {
      if (!props.isParentOpen.value) {
        isOpenSub.value = false;
      }
    });

    const openSubMenu = () => {
      isOpenSub.value = !isOpenSub.value;
    };

    return () => {
      return (
        <div class={styles.menuItemWrapper}>
          <button
            class={[styles.menuItem, { [styles.menuItemActive]: isOpenSub.value }]}
            onClick={openSubMenu}
          >
            <span>Theme</span>
            <Icon
              name="arrow_right"
              size="0.8125rem"
            />
          </button>
          <div class={[styles.subMenu, { [styles.subMenuOpen]: isOpenSub.value }]}>
            <button
              class={[styles.menuItem, styles.subMenuItem]}
              onClick={openSubMenu}
            >
              <Icon name="sun" size="1.2em" />
              <span>Light</span>
            </button>
            <button
              class={[styles.menuItem, styles.subMenuItem]}
              onClick={openSubMenu}
            >
              <Icon name="moon" size="1.2em"  />
              <span>Dark</span>
            </button>
            <button
              class={[styles.menuItem, styles.subMenuItem]}
              onClick={openSubMenu}
            >
              <Icon name="monitor-smartphone" size="1.2em" />
              <span>System</span>
            </button>
          </div>
        </div>
      );
    };
  },
  {
    props: {isParentOpen: Object as () => Ref<boolean>},
  },
);

export default ThemeSwitcher;
