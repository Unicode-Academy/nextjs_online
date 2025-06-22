"use client";

import { useState } from "react";
import {
  useAddUserMutation,
  useDeleteUserMutation,
  useGetUserQuery,
  useGetUsersQuery,
  User,
  useUpdateUserMutation,
} from "../redux/services/users";

export default function Users() {
  const [id, setId] = useState(0);
  const { data: users, isLoading } = useGetUsersQuery();
  const { data: user } = useGetUserQuery(id, {
    skip: id === 0,
  });
  const [addUser] = useAddUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    if (!id) {
      addUser({ name, email });
      return;
    }

    updateUser({ id, name, email });
  };

  const handleShowForm = (id: number | undefined) => {
    setId(id ?? 0);
  };

  const handleDelete = (id: number | undefined) => {
    deleteUser(id ?? 0);
  };

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users?.map((user: User) => (
          <li key={user.id}>
            {user.name}{" "}
            <button onClick={() => handleShowForm(user.id)}>Edit</button>{" "}
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={user?.name ?? ""}
            onChange={() => {}}
          />
        </div>
        <div>
          <label htmlFor="name">Email</label>
          <input
            type="email"
            name="email"
            defaultValue={user?.email ?? ""}
            onChange={() => {}}
          />
        </div>
        <button>Add</button>
      </form>
    </div>
  );
}
