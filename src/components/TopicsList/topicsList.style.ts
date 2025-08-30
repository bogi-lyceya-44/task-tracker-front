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
    gap: 2em;
    overflow-x: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
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

  addTopic: css`
    display: flex;
    width: 16em;
    min-width: 10em;
    height: fit-content;
    align-items: center;
    padding: 0.6em 0.8em;
    border: none;
    border-radius: 1em;
    background-color: var(--second-background-color);
    color: var(--text-color);
    cursor: pointer;
    font-size: 1em;
    gap: 0.8em;
    transition: 0.3s;

    &:hover {
      background-color: var(--second-background-color-hover);
    }
  `,
};
