import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] rounded-full",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-accent hover:border-foreground/20 rounded-full",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full",
        ghost: "text-muted-foreground hover:text-foreground hover:bg-accent rounded-full",
        link: "text-foreground underline-offset-4 hover:underline",
        // Premium Zyora variants
        hero: "bg-primary text-primary-foreground font-medium hover:scale-[1.03] hover:shadow-[0_0_30px_hsl(0_0%_100%_/_0.2)] active:scale-[0.98] transition-all duration-300 rounded-full",
        heroOutline: "border border-border/50 bg-transparent text-foreground hover:bg-secondary/50 hover:border-foreground/30 font-medium transition-all duration-300 rounded-full",
        glass: "bg-secondary/40 backdrop-blur-md border border-border/30 text-foreground hover:bg-secondary/60 hover:border-border transition-all duration-300 rounded-full",
        premium: "bg-gradient-to-r from-secondary to-muted text-foreground border border-border/50 hover:border-foreground/20 hover:shadow-lg transition-all duration-300 rounded-full",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
