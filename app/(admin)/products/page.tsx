import { Button } from "@/components/ui/button";
import { ListFilter, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ShoeCard } from "../components/ShoeCard";

const page = () => {
	const shoes = [
		{},
		{},
		{},
		{},
		{},
		{},
		{}, // Mock shoe data; replace with actual shoe objects
	];
	const isEven = shoes.length % 2 === 0;
	return (
		<div>
			<div className="flex items-center justify-between gap-8">
				<div>
					<h2 className="text-lg lg:text-3xl uppercase font-semibold">
						My Shoes
					</h2>
					<p className="text-muted-foreground text-sm">
						All your shoes selling shoes in your store
					</p>
				</div>
				<Button size="md" asChild variant={"ghost"}>
					<Link href="/products/new">
						<Plus className="size-4" /> New
					</Link>
				</Button>
			</div>
			<div className="gap-4 grid grid-cols-2 lg:grid-cols-3 mt-4">
				{shoes.map((_, index) => (
					<ShoeCard key={index} />
				))}
				<div
					className={`flex flex-col items-center justify-center gap-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] aspect-auto w-full rounded-lg object-cover hover:bg-accent dark:hover:bg-accent/50 cursor-pointer ${
						isEven && "col-span-2"
					}`}
				>
					<Button variant={"ghost"} size={"lg"}>
						Load more
					</Button>
				</div>
			</div>
		</div>
	);
};

export default page;
