import { css } from "@linaria/core";

export default {
  settingsWrapper: css`
    position: relative;
  `,

  menu: css`
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 0.2em;
    top: 2.6em;
    right: 0;
    z-index: 10;
    padding: 0.5em;
    border: 1px solid var(--border-color);
    border-radius: 1em;
    background-color: var(--background-color);
    box-shadow: 0 0.4em 1em 0 rgba(0, 0, 0, 0.1);
    opacity: 0;
    pointer-events: none;
    transform: translateY(-0.5em);
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
  `,

  menuOpen: css`
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  `,

  menuItem: css`
    text-wrap: nowrap;
    display: flex;
    width: 100%;
    height: 2.2em;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.6em;
    border: none;
    border-radius: 0.6em;
    background-color: inherit;
    color: var(--text-color);
    cursor: pointer;
    font-size: 1em;
    font-weight: 400;
    gap: 0.5em;
    transition: 0.3s;

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
