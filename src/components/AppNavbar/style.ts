import { css } from "@linaria/core";

export default {
  navbar: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5em 2em;
    border-bottom: 1px solid var(--border-color);
  `,

  logo: css`
    color: var(--text-color);
    font-size: 1.2em;
    font-weight: 500;
    letter-spacing: 2px;
  `,
};
