"use client";

import { useActionState } from "react";
import { updateUser } from "./action";

const initialState = {
  message: "",
  id: 0,
};
export default function Form({
  user,
}: {
  user: { [key: string]: unknown } | null;
}) {
  const id = user?.id as number;
  const [state, formAction, pending] = useActionState(
    async (prevState: { message: string }, formData: FormData) =>
      updateUser(prevState, formData, id),
    initialState
  );

  return (
    <form action={formAction}>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Name..."
          defaultValue={user?.name as string}
          required
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email..."
          defaultValue={user?.email as string}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" placeholder="Password..." />
      </div>
      <div>
        <label>Status</label>
        <select
          name="status"
          defaultValue={(user?.status as boolean) ? "active" : "inactive"}
          required
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <button disabled={pending}>Save</button>
      {state.message && <div>{state.message}</div>}
    </form>
  );
}
