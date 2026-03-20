import * as React from "react"

import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
      "bg-white border border-blue-500 w-40 px-2 py-1 rounded-md",
      className
      )}
      {...props} />
  );
}

export { Input }
