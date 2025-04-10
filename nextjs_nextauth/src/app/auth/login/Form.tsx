"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
type FormData = { email: string; password: string; remember: boolean };
export default function Form() {
  const [form, setForm] = useState<FormData>({
    email: "",
    password: "",
    remember: false,
  } as FormData);
  const [msg, setMsg] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      username: form.email,
      password: form.password,
      remember: form.remember,
      redirect: false,
    });
    if (!result?.ok) {
      setMsg("Email hoặt mật khẩu không chính xác");
    } else {
      window.location.href = "/";
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Đăng nhập</h1>
      {msg && <div className="alert alert-danger">{msg}</div>}
      <div className="mb-3">
        <label htmlFor="">Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Email.."
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="">Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Password.."
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label>
          <input
            type="checkbox"
            className="me-1"
            onChange={(e) => setForm({ ...form, remember: e.target.checked })}
          />{" "}
          Ghi nhớ tôi
        </label>
      </div>
      <button className="btn btn-primary">Đăng nhập</button>
      <p className="text-center">Hoặc</p>
      <div className="d-grid mb-3">
        <button
          type="button"
          className="btn btn-danger"
          onClick={() =>
            signIn("google", {
              callbackUrl: "/",
            })
          }
        >
          Đăng nhập qua Google
        </button>
      </div>
      <div className="d-grid">
        <button
          type="button"
          className="btn btn-dark"
          onClick={() =>
            signIn("github", {
              callbackUrl: "/",
            })
          }
        >
          Đăng nhập qua Github
        </button>
      </div>
    </form>
  );
}
