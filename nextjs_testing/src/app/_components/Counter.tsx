"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState<number>(0);
  return (
    <div>
      <h1>Count: {count}</h1>
      <button data-testid="decrease" onClick={() => setCount(count - 1)}>
        -
      </button>
      <button data-testid="increase" onClick={() => setCount(count + 1)}>
        +
      </button>
    </div>
  );
}
