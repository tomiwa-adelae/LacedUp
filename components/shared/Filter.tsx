"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, Minus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { TagOptions } from "./TagOptions";

export const Filter = () => {
	return (
		<div className="sticky top-21 hidden lg:block p-8 rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-40 bg-white dark:bg-black dark:border">
			<div className="flex items-center justify-between gap-8 mb-4">
				<h2 className="text-xl md:text-2xl uppercase font-semibold">
					Filter
				</h2>
				<Button
					className="text-xs hover:text-primary hover:underline"
					variant={"ghost"}
					size="sm"
				>
					Clear
				</Button>
			</div>
			<Separator />
			<FilterComponent title="Price">
				<PriceFilter />
			</FilterComponent>
			<Separator className="my-4" />
			<FilterComponent title="tags">
				<TagOptions />
			</FilterComponent>
		</div>
	);
};

export const FilterComponent = ({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="mt-4">
			<div
				onClick={() => setIsOpen((prev) => !prev)}
				className="cursor-pointer flex items-center justify-between gap-4"
			>
				<h4 className="text-sm lg:text-base font-medium uppercase">
					{title}
				</h4>
				<Button size="icon" variant="ghost">
					{isOpen ? (
						<ChevronUp className="size-5" />
					) : (
						<ChevronDown className="size-5" />
					)}
				</Button>
			</div>
			{isOpen && <div className="mt-4"> {children}</div>}
		</div>
	);
};

export const PriceFilter = () => {
	const [minPrice, setMinPrice] = useState("");
	const [maxPrice, setMaxPrice] = useState("");
	return (
		<div className="mt-4">
			<div className="flex items-center justify-center gap-4">
				<Input
					type="text"
					value={minPrice}
					onChange={(e) => setMinPrice(e.target.value)}
					placeholder="Min"
					className="h-12"
				/>
				<Minus />
				<Input
					type="text"
					value={maxPrice}
					onChange={(e) => setMaxPrice(e.target.value)}
					placeholder="Max"
					className="h-12"
				/>
			</div>
		</div>
	);
};
