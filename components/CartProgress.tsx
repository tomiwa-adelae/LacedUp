"use client";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { usePathname } from "next/navigation";

export const CartProgress = () => {
	const pathname = usePathname();

	return (
		<div className="container py-4 max-w-md flex items-start justify-center">
			<div className="flex items-center justify-center gap-1 flex-col">
				<Button className="size-10 cursor-default" size={"sm"}>
					1
				</Button>
				<p className="font-medium text-sm text-primary">Cart</p>
			</div>
			<Separator className="flex-1 mt-6" />
			<div className="flex items-center text-muted-foreground dark:text-gray-200 justify-center gap-1 flex-col">
				<Button
					variant={
						pathname.startsWith("/address")
							? "default"
							: pathname.startsWith("/review")
							? "default"
							: "outline"
					}
					size={"sm"}
					className="size-10 cursor-default"
				>
					2
				</Button>
				<p className="font-medium text-sm">Shipping</p>
			</div>
			<Separator className="flex-1 mt-6" />
			<div className="flex items-center text-muted-foreground  dark:text-gray-200 justify-center gap-1 flex-col">
				<Button
					className="size-10 cursor-default"
					variant={
						pathname.startsWith("/review") ? "default" : "outline"
					}
					size={"sm"}
				>
					3
				</Button>
				<p className="font-medium text-sm">Review</p>
			</div>
		</div>
	);
};
