import { css } from "@linaria/core";

export default {
  profileWrapper: css`
    position: relative;
  `,

  profilePreview: css`
    display: flex;
    padding: 0;
    border: none;
    border-radius: 2em;
    background-color: inherit;
    cursor: pointer;
    font-family: Avenir, sans-serif;
    font-size: 1em;
    outline: 0;
  `,

  avatar: css`
    width: 2.25em;
    height: 2.25em;
    border: 1px solid var(--border-color);
    border-radius: 2em;
  `,

  menu: css`
    position: absolute;
    z-index: 10;
    top: 3em;
    right: 0;
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

  accountInfo: css`
    display: flex;
    align-items: center;
    gap: 0.5em;
  `,

  accountAvatar: css`
    width: 3.2em;
    height: 3.2em;
    border: 1px solid var(--border-color);
    border-radius: 2em;
  `,

  accountContent: css`
    display: flex;
    min-width: 8em;
    flex-direction: column;
  `,

  accountNickname: css`
    color: var(--text-color);
    overflow: hidden;
    max-width: 12em;
    font-weight: 500;
    text-overflow: ellipsis;
  `,

  accountEmail: css`
    overflow: hidden;
    max-width: 12em;
    color: var(--text-color);
    font-size: 0.8em;
    text-overflow: ellipsis;
  `,

  hr: css`
    width: 100%;
    height: 1px;
    border: none;
    background-color: var(--border-color);
  `,

  menuList: css`
    display: flex;
    flex-direction: column;
    gap: 0.3em;
  `,

  menuItem: css`
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

  menuItemActive: css`
    background-color: var(--primary-color);
    color: var(--background-color);

    &:hover {
      background-color: var(--primary-color-hover);
    }
  `,

  subMenu: css`
    position: absolute;
    top: 0;
    left: -7.9em;
    display: flex;
    flex-direction: column;
    gap: 0.3em;
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

  subMenuItem: css`
    justify-content: flex-start;
  `,

  subMenuOpen: css`
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  `,

  menuItemDanger: css`
    color: var(--danger-text-color);

    &:hover {
      background-color: var(--danger-background-color);
    }
  `,

  menuItemWrapper: css`
    position: relative;
  `,
};
