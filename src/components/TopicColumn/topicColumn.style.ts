import { css } from "@linaria/core";

export default {
  topicWrapper: css`
    height: 100%;
  `,

  topic: css`
    color: var(--text-color);
    width: 16em;
    min-width: 16em;
    padding: 0.5em;
    border-radius: 1em;
    background-color: var(--second-background-color);
    box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.12);
  `,

  topicTop: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0 0.625em 0;
    cursor: pointer;
    font-size: 1.125em;
    font-weight: 500;
  `,

  cardsWrapper: css`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  `,

  cardsList: css`
    display: flex;
    flex-direction: column;
  `,

  cardWrapper: css`
    padding-bottom: 0.5rem;
  `,

  moreButton: css`
    color: var(--text-color);
    padding: 0.5em;
    border: none;
    border-radius: 0.5em;
    background-color: transparent;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background-color: var(--second-background-color-hover);
    }
  `,

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
    font-weight: 500;
    line-height: 16px;
  `,
};
