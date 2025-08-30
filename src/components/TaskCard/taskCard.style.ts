import { css } from "@linaria/core";

export default {
  taskCard: css`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 0.5em;
    border: 1px solid var(--background-color);
    border-radius: 0.75em;
    background-color: var(--background-color);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12);
    gap: 0.25em;

    &:hover > button {
      cursor: pointer;
      opacity: 1;
      visibility: visible;
    }
  `,

  editButton: css`
    color: var(--text-color);
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    display: flex;
    padding: 0.1875em;
    border: none;
    border-radius: 0.25em;
    background-color: transparent;
    opacity: 0;
    transition: 0.3s;
    visibility: hidden;
    &:hover {
      background-color: var(--second-background-color);
    }
  `,

  title: css`
    max-width: calc(100% - 1.2em);
    font-weight: 500;
  `,

  description: css`
    color: var(--second-text-color);
    font-size: 0.875em;
  `,
};
