"use client";

import { useState } from "react";

type PostState<T> =
  | { status: "idle" | "loading" | "missing_key" }
  | { status: "error"; message: string }
  | { status: "done"; data: T };

/** POSTs JSON to one of the model-backed routes and tracks the states the UI has to show. */
export function usePost<Body, Result>(url: string) {
  const [state, setState] = useState<PostState<Result>>({ status: "idle" });

  async function run(body: Body) {
    setState({ status: "loading" });
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const payload = await response.json();

      if (response.ok) setState({ status: "done", data: payload as Result });
      else if (payload.error === "missing_key") setState({ status: "missing_key" });
      else setState({ status: "error", message: payload.message ?? payload.error });
    } catch {
      setState({ status: "error", message: "Could not reach the server." });
    }
  }

  return { state, run };
}
