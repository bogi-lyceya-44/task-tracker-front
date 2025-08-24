import {defineComponent} from "vue";

import {router} from "../../router.ts";
import {request} from "../../utils/httpRequest.ts";
import Icon from "../Icon";

import styles from './style.ts'


const BoardsListPanel = defineComponent(
  () => {
    const onCreateNewBoard = async () => {
      const boardId = (
        await request("/create_boards", "POST", {
          boardsToCreate: [
            {
              name: "New board",
              topicIds: [],
            },
          ],
        })
      ).ids[0];
      await router.push(`/board/${boardId}`);
    }

    return () => (
      <div class={styles.panel}>
        <h1 class={styles.title}>Boards List</h1>
        <button class={"btn"} onClick={onCreateNewBoard}>
          <Icon name="plus" size="0.9em" /> New board
        </button>
      </div>
    )
  }
)

export default BoardsListPanel;
