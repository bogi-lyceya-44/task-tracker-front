import { css } from "@linaria/core";

export default {
  topicListSection: css`
    display: flex;
    flex: 1;
    padding: 0 2em 1.8em;
  `,

  topicsListWrapper: css`
    display: flex;
    min-height: 100%;
    flex: 1;
    overflow-x: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  `,

  topicsListInner: css`
    display: flex;
    gap: 2em;
  `,

  topicsList: css`
    display: flex;
    gap: 2em;
  `,

  topic: css`
    height: fit-content;
    transition: 0.3s;
  `,

  dragging: css`
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
