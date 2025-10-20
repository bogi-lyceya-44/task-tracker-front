## Development style

### Components

For each component, a separate directory is created in `components`, which looks like this:

```
components/
└── AppNavbar/
    ├── index.ts             # barrel-export
    ├── AppNavbar.vue        # component
    └── appNavbar.style.ts   # styles (linaria)
```

The Composition API is used to write components.

```vue
<script setup lang="ts">
/* here some logic */
import { defineProps } from "@vue";
import styles from "./appNavbar.style";

const props = defineProps({ name: String });
</script>

<template>
  <!-- here tags -->
  <div :class="styles.navbar">{{ props.name }}</div>
</template>
```

The file `appNavbar.style.ts` is an export of a single object, the fields of which are classes.

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

More details about the syntax can be found in
[linaria docs](https://github.com/callstack/linaria/blob/master/docs/BASICS.md).

To ensure responsiveness, use `em` or `rem` units for indents / roundings and other numeric properties.

The component folder must contain an `index.ts` file, which regulates the component's exports (it also makes imports cleaner and shorter).

```ts
export { default } from "./AppNavbar.vue";
```
