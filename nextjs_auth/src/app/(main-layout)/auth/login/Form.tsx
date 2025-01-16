"use client";

import { useActionState, useEffect } from "react";
import { handleLogin } from "./action";
import { useRouter } from "next/navigation";
export type FormState = {
  message: string;
  success: boolean;
  data?: {
    [key: string]: string;
  };
};
const initialState: FormState = {
  message: "",
  success: false,
};

export default function Form() {
  const [state, formAction, isPending] = useActionState(
    handleLogin,
    initialState
  );
  const router = useRouter();
  useEffect(() => {
    if (state.success) {
      const user = state.data.user;
      if (user.role === "admin") {
        return router.push("/admin");
      }
      router.push("/");
    }
  }, [state, router]);

  return (
    <>
      {state.message && (
        <div className={`alert alert-${state.success ? "success" : "danger"}`}>
          {state.message}
        </div>
      )}
      <form action={formAction}>
        <div className="mb-3">
          <label htmlFor="">Email</label>
          <input
            type="text"
            className="form-control"
            name="email"
            placeholder="Email..."
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="">Mật khẩu</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password..."
            required
          />
        </div>
        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isPending}
          >
            Đăng nhập
          </button>
        </div>
      </form>
    </>
  );
}
