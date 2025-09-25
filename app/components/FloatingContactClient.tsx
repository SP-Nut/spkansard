"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamic import to avoid Server Component restriction and keep bundle small on initial load
const FloatingContactButton = dynamic(() => import("./FloatingContactButton"), {
  ssr: false,
  loading: () => null,
});

export default function FloatingContactClient() {
  return (
    <Suspense fallback={null}>
      <FloatingContactButton />
    </Suspense>
  );
}
