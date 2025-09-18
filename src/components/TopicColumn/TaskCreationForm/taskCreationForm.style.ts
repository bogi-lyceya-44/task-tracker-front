import { css } from "@linaria/core";

export default {
  createCardButton: css`
    display: flex;
    width: 100%;
    align-items: center;
    padding: 0.75em 1em;
    border: none;
    border-radius: 0.75em;
    margin-top: 0.625em;
    background-color: transparent;
    color: var(--primary-color);
    cursor: pointer;
    gap: 1em;
    transition: 0.3s;

    &:hover {
      background-color: var(--second-background-color-hover);
    }
  `,

  createCardText: css`
    font-size: 1.2em;
    font-weight: 400;
    line-height: 16px;
  `,

  createCardForm: css`
    display: flex;
    flex-direction: column;
    gap: 0.75em;
    padding-top: 1em;
  `,

  textareaName: css`
    background-color: transparent;
    color: var(--text-color);
    border: 1px solid var(--third-background-color);
    border-radius: 0.5em;
    padding: 0.3em 0.5em;
    font-size: 0.9em;
    width: 100%;
    resize: vertical;

    &:focus {
      outline: none;
    }
  `,

  createCardFormSubmit: css`
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

  createCardFormClose: css`
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

  buttonGroup: css`
    display: flex;
    gap: 0.75em;
  `,
};
