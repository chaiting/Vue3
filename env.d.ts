/// <reference types="vite/client" />

namespace Company {
  interface Person {
    name: string;
    age: number;
  }
}

namespace School {
  interface Person {
    name: string;
    age: number;
    course: "A" | "B" | "C";
  }
}

// declare function getPerson(): string;
