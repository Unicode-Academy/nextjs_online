"use client";

import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../redux/slice/counterSlice";
import { RootState } from "../redux/store";

export default function Counter() {
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch();
  const handleIncrement = () => {
    dispatch(increment());
  };
  const handledecrement = () => {
    dispatch(decrement());
  };
  return (
    <div>
      <h1 className="text-3xl">Count: {count}</h1>
      <button
        onClick={handledecrement}
        className="px-3 py-0 border text-xl inline-block bg-amber-500"
      >
        -
      </button>
      <button
        onClick={handleIncrement}
        className="px-3 py-0 border text-xl inline-block bg-amber-500"
      >
        +
      </button>
    </div>
  );
}
