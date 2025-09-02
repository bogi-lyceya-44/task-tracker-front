import { css } from "@linaria/core";

export default {
  addTopicForm: css`
    width: 16em;
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 1em;
    background-color: var(--second-background-color);
    border-radius: 1em;
    padding: 0.5em;
  `,

  addTopicFormSubmit: css`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--primary-color);
    color: var(--background-color);
    border: none;
    border-radius: 0.75em;
    padding: 0.4em 1em;
    font-weight: 400;
    font-size: 1rem;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
      background-color: var(--primary-color-hover);
    }
  `,

  addTopicFormClose: css`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--second-background-color);
    border: none;
    border-radius: 0.75em;
    padding: 0.4em 1em;
    font-weight: 400;
    font-size: 1rem;
    transition: 0.3s;
    color: var(--text-color);
    cursor: pointer;

    &:hover {
      background-color: var(--second-background-color-hover);
    }
  `,

  addTopic: css`
    display: flex;
    width: 16em;
    align-items: center;
    padding: 0.6em 0.8em;
    height: fit-content;
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

  inputName: css`
    background-color: transparent;
    color: var(--text-color);
    border: 1px solid var(--third-background-color);
    border-radius: 0.5em;
    padding: 0.3em 0.5em;
    font-size: 1.125em;
    width: 100%;

    &:focus {
      outline: none;
    }
  `,

  buttonGroup: css`
    display: flex;
    gap: 0.75em;
  `,
};
