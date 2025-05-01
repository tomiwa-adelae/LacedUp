"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, Minus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { TagOptions } from "./TagOptions";

export const Filter = () => {
	const [minPrice, setMinPrice] = useState("");
	const [maxPrice, setMaxPrice] = useState("");
	const [isPriceOpen, setIsPriceOpen] = useState(false);
	const [isTagsOpen, setIsTagsOpen] = useState(false);

	const ToggleButton = ({
		isOpen,
		onClick,
	}: {
		isOpen: boolean;
		onClick: () => void;
	}) => (
		<Button size="icon" variant="ghost" onClick={onClick}>
			{isOpen ? (
				<ChevronUp className="size-5" />
			) : (
				<ChevronDown className="size-5" />
			)}
		</Button>
	);

	return (
		<div className="p-8 rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
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
			<div className="mt-4">
				<div
					onClick={() => setIsPriceOpen((prev) => !prev)}
					className="flex items-center justify-between gap-4 cursor-pointer"
				>
					<h4 className="text-base font-medium uppercase">Price</h4>
					<Button size="icon" variant="ghost">
						{isTagsOpen ? (
							<ChevronUp className="size-5" />
						) : (
							<ChevronDown className="size-5" />
						)}
					</Button>
				</div>
				{isPriceOpen && (
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
				)}
			</div>
			<Separator className="my-4" />
			{/* Tags Filter */}
			<div className="mt-4">
				<div
					onClick={() => setIsTagsOpen((prev) => !prev)}
					className="cursor-pointer flex items-center justify-between gap-4"
				>
					<h4 className="text-base font-medium uppercase">Tags</h4>
					<Button size="icon" variant="ghost">
						{isTagsOpen ? (
							<ChevronUp className="size-5" />
						) : (
							<ChevronDown className="size-5" />
						)}
					</Button>
				</div>

				{isTagsOpen && (
					<div className="mt-4">
						<TagOptions />
					</div>
				)}
			</div>
		</div>
	);
};
