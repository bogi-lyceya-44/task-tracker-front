import {
  type Component,
  type DefineComponent,
  defineComponent,
  markRaw,
  onMounted,
  ref,
  resolveDynamicComponent
} from "vue";

const Icon = defineComponent(
  (props) => {
    const iconComponent = ref<Component | null>(null);

    onMounted(async () => {
      const module = await import(`../../assets/icons/${props.name}.svg`);
      iconComponent.value = markRaw(module.default) as Component;
    });

    return () =>
      iconComponent.value
        ? (
          <>
            {(() => {
              const Comp = resolveDynamicComponent(iconComponent.value) as DefineComponent;
              return (
                <Comp
                  style={{
                    display: "inline-block",
                    verticalAlign: "middle",
                    height: props.size,
                    width: props.size
                  }}
                />
              );
            })()}
          </>
        )
        : null;
  },
  {
    props: {
      name: String,
      size: {
        type: String,
        required: false,
        default: "1em",
      },
    },
  }
)

export default Icon;
