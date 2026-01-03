import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className, children, ...props }, ref) => {
  return (
    <select
      className={cn(
    "h-11 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-sm text-white transition-all focus:border-accent-blue/60 focus:outline-none focus:shadow-[0_0_0_4px_rgba(61,124,255,0.18)] backdrop-blur-xl",
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  );
});
Select.displayName = "Select";

export { Select };

