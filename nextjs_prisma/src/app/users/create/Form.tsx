"use client";

import { useActionState } from "react";
import { createUser } from "./action";
const initialState = {
  message: "",
};
export default function Form() {
  const [state, formAction, pending] = useActionState(createUser, initialState);
  return (
    <form action={formAction}>
      <div>
        <label>Name</label>
        <input type="text" name="name" placeholder="Name..." required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" name="email" placeholder="Email..." required />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password..."
          required
        />
      </div>
      <div>
        <label>Status</label>
        <select name="status" required>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <button disabled={pending}>Save</button>
      {state.message && <div>{state.message}</div>}
    </form>
  );
}
