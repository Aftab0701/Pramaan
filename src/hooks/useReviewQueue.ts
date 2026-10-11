"use client";

import { useSyncExternalStore } from "react";
import type { ExtractedClaim } from "@/lib/claimFields";

export interface QueuedClaim extends ExtractedClaim {
  publisher: string;
  url: string;
  asOf: string;
}

const STORAGE_KEY = "pramaan.review-queue";
const EMPTY: QueuedClaim[] = [];
const listeners = new Set<() => void>();

// useSyncExternalStore needs the same array back until storage changes, so parse once per raw value.
let cachedRaw: string | null = null;
let cachedQueue: QueuedClaim[] = EMPTY;

function read(): QueuedClaim[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedQueue = raw ? JSON.parse(raw) : EMPTY;
  }
  return cachedQueue;
}

function write(queue: QueuedClaim[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Claims waiting for a human reviewer. Kept in the browser for the prototype. */
export function useReviewQueue() {
  const queue = useSyncExternalStore(subscribe, read, () => EMPTY);

  return {
    queue,
    add: (claim: QueuedClaim) => write([...read(), claim]),
    remove: (index: number) => write(read().filter((_, i) => i !== index)),
  };
}
