import { css } from "@linaria/core";

export default {
  boardPanelSection: css`
    padding: 2em;
  `,
  boardPanel: css`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    border-radius: 1em;
    background-color: var(--background-color);
  `,
  titleInput: css`
    padding: 0.16em;
    border: none;
    border-radius: 0.3em;
    margin: 0;
    font-family: Avenir, sans-serif;
    font-size: 1.875em;
    font-weight: 500;
    line-height: 1em;

    &:focus {
      background-color: var(--background-second-color);
      outline: 2px solid var(--border-color);
    }
  `,

  info: css`
    display: flex;
    flex-direction: column;
    gap: 1.25em;
  `,

  breadcrumbs: css`
    display: flex;
    align-items: center;
    color: var(--text-light-color);
    font-size: 0.875em;
    font-weight: 400;
    gap: 0.6em;

    & > a {
      color: var(--text-light-color);
    }

    & > a:hover {
      text-decoration: underline;
    }
  `,

  controllers: css`
    display: flex;
    align-items: center;
    gap: 1.75em;
  `,

  collaborators: css`
    display: flex;

    & > * {
      &:not(:first-child) {
        margin-left: -0.875em;
      }
    }
  `,

  divider: css`
    width: 1px;
    height: 2.25em;
    align-self: stretch;
    background-color: var(--border-color);
  `,

  toggleMode: css`
    display: flex;
    overflow: hidden;
    padding: 0;
    border: none;
    border-radius: 0.5em;
    margin: 0;
    background-color: var(--second-background-color);
    cursor: pointer;
    gap: 2px;
    transition: 0.3s;

    &:hover,
    &:hover > * {
      background-color: var(--border-color);
    }

    &:hover > .active {
      background-color: var(--primary-hover-color);
    }
  `,

  mode: css`
    padding: 0.5em;
    border-radius: 0.5em;
    background-color: var(--second-background-color);
    color: var(--primary-color);
    transition: 0.3s;

    &.active {
      background-color: var(--primary-color);
      color: #fff;
    }
  `,

  avatar: css`
    width: 2.25em;
    height: 2.25em;
    border: 1px solid var(--border-color);
    border-radius: 2em;
  `,

  noImage: css`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--border-color);
    font-weight: 500;
  `,
};
