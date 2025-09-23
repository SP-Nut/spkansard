"use client";

import dynamic from "next/dynamic";

const FloatingContactButton = dynamic(() => import("./FloatingContactButton"), {
  ssr: false,
});

export default function FloatingContactClient() {
  return <FloatingContactButton />;
}
