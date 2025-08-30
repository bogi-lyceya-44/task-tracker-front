import { css } from "@linaria/core";

export default {
  boardsListSection: css`
    padding: 1.8em 2em;
  `,

  boardsList: css`
    display: grid;
    margin-top: 2em;
    gap: 1em;
    grid-template-columns: repeat(auto-fit, minmax(12em, 1fr));
  `,

  card: css`
    transition: 0.3s;
  `,

  dragging: css`
    position: relative;
    position: relative;
    overflow: hidden;
    color: var(--text-light-color);
    opacity: 0.4;
  `,

  listMove: css`
    pointer-events: none;
    transition: all 0.4s ease;
  `,
};
