import { defineComponent } from "vue";
import { RouterLink } from "vue-router";

import styles from "./style.ts";

const BoardCard = defineComponent(
  (props) => {
    return () => (
      <RouterLink class={styles.boardLink} to={`/board/${props.id}`}>
        <div class={styles.boardCard}>
          <div class={styles.boardCardInfo}>{props.name}</div>
        </div>
      </RouterLink>
    );
  },
  {
    props: { id: String, name: String },
  },
);

export default BoardCard;
