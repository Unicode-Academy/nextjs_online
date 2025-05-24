"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isBackRef = useRef(false);
  useEffect(() => {
    document.addEventListener("keyup", (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isBackRef.current) {
        router.back();
        isBackRef.current = true;
      }
    });
    return () => {
      document.removeEventListener("keyup", () => {});
    };
  }, []);
  return (
    <>
      <div className="modal-content absolute left-0 right-0 top-[5%] w-[400px] mx-auto z-50 border bg-white min-h-[300px] p-10">
        <button
          className="absolute top-3 right-3 text-xl cursor-pointer"
          onClick={() => router.back()}
        >
          &times;
        </button>
        {children}
      </div>
      <div
        className="modal-overlay absolute inset-0 bg-[#00000098]"
        onClick={() => router.back()}
      ></div>
    </>
  );
}
