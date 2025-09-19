import { css } from "@linaria/core";

export default {
  taskCardWrapper: css`
    position: relative;
  `,

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

  taskCardActive: css`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 0.5em;
    border-radius: 0.75em;
    background-color: var(--background-color);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12);
    gap: 0.25em;
    border: 1px solid var(--second-background-color);
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
    color: var(--text-color);
    max-width: calc(100% - 1.2em);
    font-weight: 500;
  `,

  titleInput: css`
    color: var(--text-color);
    font-weight: 500;
    font-size: 1rem;
    background-color: var(--second-background-color);
    border: 1px solid var(--second-background-color);
    border-radius: 0.5em;
    padding: 0.2em;
    outline: none;

    &:focus {
      border: 1px solid var(--primary-color);
    }
  `,

  description: css`
    color: var(--second-text-color);
    font-size: 0.875em;
  `,

  descriptionInput: css`
    color: var(--text-color);
    font-weight: 400;
    font-size: 0.9rem;
    background-color: var(--second-background-color);
    border: 1px solid var(--second-background-color);
    border-radius: 0.5em;
    padding: 0.2em;
    outline: none;
    font-family: inherit;
    resize: vertical;

    &:focus {
      border: 1px solid var(--primary-color);
    }
  `,

  activeCard: css`
    border-radius: 0.75em;
    outline: 1px solid var(--second-background-color);
    position: relative;
    z-index: 10;
  `,

  overlay: css`
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 5;
  `,

  saveButton: css`
    position: absolute;
    bottom: -2.8em;
    color: var(--background-color);
    background-color: var(--primary-color);
    border-radius: 0.5em;
    font-weight: inherit;
    font-size: inherit;
    padding: 0.3em 0.6em;
    border: none;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background-color: var(--primary-color-hover);
    }
  `,

  formWrapper: css`
    position: absolute;
    width: 100%;
    z-index: 10;
    top: 0;
  `,

  menu: css`
    position: absolute;
    top: 0;
    right: -5.5em;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  `,

  menuItem: css`
    background-color: var(--background-color);
    border: 1px solid var(--second-background-color);
    color: var(--text-color);
    padding: 0.3em 0.8em;
    font-size: 1rem;
    border-radius: 0.75em;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
      background-color: var(--second-background-color);
    }
  `,

  menuItemDanger: css`
    color: var(--danger-text-color);

    &:hover {
      background-color: var(--danger-background-color);
    }
  `,
};
