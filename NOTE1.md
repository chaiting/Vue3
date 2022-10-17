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