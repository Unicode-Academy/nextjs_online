"use client";
import { useActionState } from "react";
import { handleCancel, handleRegister } from "../action";
const initialState = {
  message: "",
  success: false,
  errors: {},
};
export default function Form() {
  const [state, formAction, pending] = useActionState(
    handleRegister,
    initialState
  );

  return (
    <form action={formAction}>
      {state.message && (
        <div
          className={`alert alert-${state.success ? "success" : "danger"}`}
          role="alert"
        >
          {state.message}
        </div>
      )}
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          name="name"
          id="name"
          placeholder="Name..."
        />
        {state.errors?.name && (
          <span className="text-danger">{state.errors.name[0]}</span>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="text"
          className="form-control"
          name="email"
          id="email"
          placeholder="Email..."
        />
        {state.errors?.email && (
          <span className="text-danger">{state.errors.email[0]}</span>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          name="password"
          id="password"
          placeholder="Password..."
        />
        {state.errors?.password && (
          <span className="text-danger">{state.errors.password[0]}</span>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="confirm_password" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          className="form-control"
          name="confirm_password"
          id="confirm_password"
          placeholder="Confirm Password..."
        />
        {state.errors?.confirm_password && (
          <span className="text-danger">
            {state.errors.confirm_password[0]}
          </span>
        )}
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary" disabled={pending}>
          Register
        </button>
        <button
          type="button"
          onClick={async () => {
            const response = await handleCancel("Hoàng An");
            console.log(response);
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
