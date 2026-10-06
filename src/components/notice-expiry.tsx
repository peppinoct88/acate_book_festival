"use client";

import { useSyncExternalStore, type ReactNode } from "react";

const subscribe = () => () => {};

/** Nasconde lato client un avviso scaduto dopo la build. */
export function NoticeExpiry({ until, children }: { until?: string; children: ReactNode }) {
  const expired = useSyncExternalStore(
    subscribe,
    () => (until ? Date.now() > new Date(until).getTime() : false),
    () => false,
  );
  if (expired) return null;
  return <>{children}</>;
}
