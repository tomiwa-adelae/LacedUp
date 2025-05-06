"use client";
import { Button } from "@/components/ui/button";
import { Dot, ListFilter } from "lucide-react";
import { Customer } from "./Customer";

export const CustomerBox = () => {
	return (
		<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border">
			<div className="flex items-center justify-between gap-8">
				<div>
					<h2 className="text-lg uppercase font-semibold">
						Customers
					</h2>
					<p className="text-muted-foreground text-sm">
						Information about your customers
					</p>
				</div>
				<Button size="icon" variant={"ghost"}>
					<ListFilter className="size-6" />
				</Button>
			</div>
			<div className="grid gap-4 mt-4">
				<Customer />
				<Customer />
				<Customer />
				<Customer />
			</div>
		</div>
	);
};
