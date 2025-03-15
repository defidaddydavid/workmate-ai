"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useState } from "react";

interface ClientBodyProps {
  children: ReactNode;
  className?: string;
}

export default function ClientBody({ children, className }: ClientBodyProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <body
      className={cn(
        "bg-background antialiased min-h-screen flex flex-col",
        className
      )}
    >
      {children}
    </body>
  );
}
