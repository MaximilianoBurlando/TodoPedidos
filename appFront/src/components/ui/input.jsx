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
      "bg-white white:bg-gray-900 border-blue-500 white:border-blue-400",
      className
      )}
      {...props} />
  );
}

export { Input }
