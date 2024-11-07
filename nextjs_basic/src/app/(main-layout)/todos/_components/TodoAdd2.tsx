"use client";

// import { useState } from "react";
import { useActionState } from "react";
import { create } from "../action";
const initialState = {
  message: "",
  success: false,
};
export default function TodoAdd2() {
  // const [msg, setMsg] = useState<string>("");
  const [state, formAction] = useActionState(create, initialState);

  return (
    <div>
      <form
        // action={async (formData: FormData) => {
        //   const response: { success: boolean; message: string | undefined } =
        //     await create(formData);
        //   if (!response.success) {
        //     setMsg(response.message as string);
        //   }
        // }}
        action={formAction}
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="form-control"
        />
        <input
          type="text"
          name="content"
          placeholder="Content"
          className="form-control"
        />
        <button type="submit">Add</button>
        {state.message && (
          <span className="text-danger d-block">{state.message}</span>
        )}
      </form>
    </div>
  );
}
