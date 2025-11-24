import * as React from "react";

// Simplified tooltip implementation to avoid invalid hook issues from Radix.
// This preserves the component API shape but currently renders children
// without advanced tooltip behavior.

const TooltipProvider: React.FC<any> = ({ children }) => <>{children}</>;

const Tooltip: React.FC<any> = ({ children }) => <>{children}</>;

const TooltipTrigger: React.FC<any> = ({ children, ...props }) => (
  <button type={props.type ?? "button"} {...props}>
    {children}
  </button>
);

const TooltipContent = React.forwardRef<HTMLDivElement, any>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  ),
);

TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
