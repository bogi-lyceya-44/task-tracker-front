import {defineComponent} from "vue";
import {RouterLink} from "vue-router";

import ProfilePreview from "../ProfilePreview";

import styles from './style.ts'

const AppNavbar = defineComponent(() => {
  return () => (
    <div class={styles.navbar}>
      <RouterLink class={styles.logo} to="/"> task tracker</RouterLink>
      <ProfilePreview />
    </div>
  )
})

export default AppNavbar
