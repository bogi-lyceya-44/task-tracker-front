import { css } from "@linaria/core";

export default {
  wrapper: css`
    flex: 1;
    position: relative;
  `,

  titleWrapper: css`
    display: flex;
    gap: 0.5em;
  `,

  editButton: css`
    display: flex;
    background-color: transparent;
    color: var(--text-color);
    align-items: center;
    font-size: inherit;
    font-weight: inherit;
    gap: 0.75em;
    padding: 0 0 0 0.3em;
    cursor: pointer;
    width: 100%;
    border: 1px solid transparent;

    &:hover > svg {
      opacity: 1;
    }
  `,

  editIcon: css`
    opacity: 0;
    transition: 0.3s;
  `,

  hide: css`
    display: none;
  `,

  editInput: css`
    background-color: var(--background-color);
    border: 1px solid var(--second-background-color);
    padding: 0 0.3em;
    border-radius: 0.5em;
    font-size: inherit;
    font-weight: inherit;
    font-family: inherit;
    color: inherit;
    width: 11em;

    &:focus {
      outline: 1px solid var(--primary-color-hover);
    }
  `,
};
