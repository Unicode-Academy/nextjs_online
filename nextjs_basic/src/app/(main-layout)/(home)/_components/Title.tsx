"use client";
import React from "react";

export default function Title({ title }: Readonly<{ title: string }>) {
  console.log(`Ok rồi`);

  return <h1>{title}</h1>;
}
