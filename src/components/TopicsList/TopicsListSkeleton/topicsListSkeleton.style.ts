import { css } from "@linaria/core";

export default {
  topicsList: css`
    display: flex;
    gap: 2em;
    height: 100%;
  `,

  topicSkeleton: css`
    height: 100%;
    width: 16em;
    padding: 0.5em;
    border-radius: 1em;
    background-color: var(--second-background-color);
  `,
};
