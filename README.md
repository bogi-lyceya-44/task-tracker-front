# Task Tracker Frontend

Фронтенд для таск трекера. Таски, топики, борды - все для канбанщины.

---

## Разработка

Используемые инструменты:

- [TypeScript](https://github.com/microsoft/TypeScript)
- [Vue.js](https://github.com/vuejs/core) + [Vue Router](https://github.com/vuejs/router)
- [Linaria](https://github.com/callstack/linaria)

### Стиль разработки

#### Компоненты

Для каждого компонента создается отдельная директория в `components`, которая выглядит примерно так:

```
components/
└── AppNavbar/
    ├── index.ts        # barrel-экспорт
    ├── AppNavbar.tsx   # компонент
    └── style.ts        # стили (linaria)
```

Для определения компонента используется утилита [defineComponent](https://ru.vuejs.org/api/general#definecomponent)
с синтаксисом функции (первый аргумент - setup функция, второй - объект дополнительных параметров).

```tsx
const AppNavbar = defineComponent(
  (props) => {
    /* here some logic */

    return () => (
      /* here tags */
      <div class={styles.navbar}>${props.name}</div>
    );
  },
  {
    props: { name: String },
  },
);

export default AppNavbar;
```

Файл `style.ts` представляет собой экспорт одного объекта, поля в котором - это классы.

```ts
import { css } from "@linaria/core";

export default {
  navbar: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,

  logo: css`
    color: var(--text-color);

    &:hover {
      color: var(--second-text-color);
    }
  `,
};
```

Более подробно о синтаксисе можно почитать в
[доке linaria](https://github.com/callstack/linaria/blob/master/docs/BASICS.md).

В папке компонента должен присутствовать `index.ts`, который регламентирует экспорты компонента
(также делает импорты чище и короче).

```ts
export { default } from "./AppNavbar.tsx";
```
