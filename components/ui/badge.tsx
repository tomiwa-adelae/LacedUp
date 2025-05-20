import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-[11px] font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden rounded-full uppercase",
	{
		variants: {
			variant: {
				default:
					"border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
				black: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
				secondary:
					"border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
				pending:
					"bg-yellow-100 text-yellow-800 border-transparent bg-yellow-100 [a&]:hover:bg-yellow-400/90",
				shipped:
					"bg-blue-100 text-blue-800 border-transparent bg-blue-100 [a&]:hover:bg-blue-400/90",
				delivered:
					"bg-green-100 text-green-800 border-transparent bg-green-100 [a&]:hover:bg-green-400/90",
				success:
					"inline-flex px-2 py-1 rounded-full bg-green-100 text-green-800 [a&]:hover:bg-green/90 rounded-full",
				warning:
					"inline-flex px-2 py-1 rounded-full bg-orange-100 text-orange-800 [a&]:hover:bg-orange/90 rounded-full",
				danger: "inline-flex px-2 py-1 rounded-full bg-red-100 text-red-800 [a&]:hover:bg-green/90 rounded-full",
				destructive:
					"border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
				outline:
					"text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

function Badge({
	className,
	variant,
	asChild = false,
	...props
}: React.ComponentProps<"span"> &
	VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : "span";

	return (
		<Comp
			data-slot="badge"
			className={cn(badgeVariants({ variant }), className)}
			{...props}
		/>
	);
}

export { Badge, badgeVariants };
