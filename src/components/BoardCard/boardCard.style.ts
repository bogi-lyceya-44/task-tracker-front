import { css } from "@linaria/core";

export default {
  boardLink: css`
    border: none !important;
    color: inherit;
  `,

  boardCard: css`
    display: flex;
    height: 10em;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0.6em;
    border: 1px solid transparent;
    border-radius: 1em;
    background-color: var(--second-background-color);
    color: var(--text-color);
    box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.12);
    transition: 0.3s;

    &:hover {
      box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.12);
    }

    .dragging > & {
      border: 1px dashed #aeabb7;
    }

    .boards-list:has(.dragging) &:hover {
      box-shadow: none;
    }
  `,

  boardCardInfo: css`
    padding: 0.2em 0.4em;
    border-radius: 0.4em;
    background-color: var(--background-color);
  `,
};
