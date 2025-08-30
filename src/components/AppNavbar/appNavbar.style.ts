import { css } from "@linaria/core";

export default {
  navbar: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5em 2em;
    border-bottom: 1px solid var(--border-color);
  `,

  navWrapper: css`
    display: flex;
    align-items: center;
    color: var(--text-color);
    gap: 1em;
  `,

  logo: css`
    color: var(--text-color);
    font-size: 1.2em;
    font-weight: 500;
    letter-spacing: 2px;
  `,

  divider: css`
    width: 1px;
    height: 1.6em;
    background-color: var(--border-color);
  `,

  nav: css`
    display: flex;
    gap: 0.7em;
  `,

  navItem: css`
    padding: 0.3em 0.6em;
    border-radius: 0.5em;
    color: var(--text-color);
    transition: 0.3s;

    &:hover {
      background-color: var(--second-background-color);
    }

    &.active {
      background-color: var(--primary-color-light-hover);
      color: var(--primary-color);
      &:hover {
        opacity: 0.86;
      }
    }
  `,
};
