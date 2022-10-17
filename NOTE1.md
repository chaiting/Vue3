### type vs interface
##### type能，interface不能
```ts
// Ex1.
type userName = string
type stuNo = number

// Ex2.
type Student = {stuNo: number} | {classId: number}

// Ex3.
type Data = [number, string];

```


```ts
// core/hook/useActivated.ts
import { onActivated, onDeactivated, ref } from "vue";

/**
 * 確認Keep-alive組件是否activated
 */
export function useActivated() {
  const isComponentActivated = ref(false);

  onActivated(() => {
    isComponentActivated.value = true;
  });

  onDeactivated(() => {
    isComponentActivated.value = false;
  });

  return { isComponentActivated };
}
```

```ts
// Component.vue
import { useActivated } from "@/core/hook/useActivated";

const { isComponentActivated } = useActivated();

watch(reactiveData, () => {
  if (isComponentActivated.value) {
    // todo something...
  }
});
```