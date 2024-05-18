import * as React from "react"

import { cn } from "@/lib/utils"

// TODO: make it handle the error message and input styles
// TODO: make it part of a full Form compoenent that compartimentalize Formik
const FormController = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "grid gap-2",
      className
    )}
    {...props}
  />
))
FormController.displayName = "FormController"

export { FormController }
