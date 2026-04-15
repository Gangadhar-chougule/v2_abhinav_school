'use client';

import { TooltipProvider as TooltipProviderPrimitive } from '@radix-ui/react-tooltip';

export function TooltipProvider({ children, ...props }) {
  return <TooltipProviderPrimitive {...props}>{children}</TooltipProviderPrimitive>;
}
