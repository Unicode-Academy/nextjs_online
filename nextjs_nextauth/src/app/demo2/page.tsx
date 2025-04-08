"use client";

import { useEffect } from "react";
import { instance } from "../utils/fetch-wrapper";

export default function DemoFetchWrapperClient() {
  useEffect(() => {
    const getProfile = async () => {
      const data = await instance.get(`/auth/profile`, false);
      console.log(data);
    };
    getProfile();
  }, []);
  return (
    <div>
      <h1>Demo Fetch Wrapper Client</h1>
    </div>
  );
}
