/* eslint-disable */
"use client";

import { useFormStatus } from "react-dom";

export const SubmitButton = () => {
  const { pending } = useFormStatus();
  return <button>{pending ? "Creating Todo..." : "Create Todo"}</button>;
};