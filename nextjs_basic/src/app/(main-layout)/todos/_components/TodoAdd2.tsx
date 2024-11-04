"use client";

import { create } from "../action";

export default function TodoAdd2() {
  return (
    <div>
      <form action={create}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="form-control"
          required
        />
        <input
          type="text"
          name="content"
          placeholder="Content"
          className="form-control"
          required
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
