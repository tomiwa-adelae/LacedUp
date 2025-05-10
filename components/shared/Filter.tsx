"use client";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Minus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { TagOptions } from "./TagOptions";
import { useRouter, useSearchParams } from "next/navigation";
import { formatMoneyInput, handleKeyDown, removeCommas } from "@/lib/utils";

export const Filter = ({
	tags,
	categoryName,
}: {
	tags: any;
	categoryName: string;
}) => {
	const router = useRouter();

	const handleClearFilters = () => {
		const basePath = `${window.location.pathname}?name=${categoryName}`; // keep /category/:id
		router.replace(basePath + "?", { scroll: false });
	};

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
					onClick={handleClearFilters}
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
				<TagOptions tags={tags} />
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
				<h4 className="text-sm font-medium uppercase">{title}</h4>
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
	const searchParams = useSearchParams();
	const router = useRouter();

	const [minPrice, setMinPrice] = useState("");
	const [maxPrice, setMaxPrice] = useState("");

	const [debouncedMin, setDebouncedMin] = useState("");
	const [debouncedMax, setDebouncedMax] = useState("");

	const handleMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
		let inputValue = e.target.value;

		// If the input starts with a "0" and is followed by another number, remove the "0"
		if (
			inputValue.startsWith("0") &&
			inputValue.length > 1 &&
			inputValue[1] !== "."
		) {
			inputValue = inputValue.slice(1);
		}

		// Prevent the input from starting with a period
		if (inputValue.startsWith(".")) {
			return;
		}

		inputValue = inputValue.replace(/[^0-9.]/g, "");
		const parts = inputValue.split(".");
		if (parts.length > 2) {
			inputValue = parts.shift() + "." + parts.join("");
		}
		if (parts[1]) {
			parts[1] = parts[1].substring(0, 2);
			inputValue = parts.join(".");
		}

		if (/^[0-9,]*\.?[0-9]*$/.test(inputValue)) {
			const formattedValue = formatMoneyInput(inputValue);
			setMaxPrice(formattedValue);
		}
	};

	const handleMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
		let inputValue = e.target.value;

		// If the input starts with a "0" and is followed by another number, remove the "0"
		if (
			inputValue.startsWith("0") &&
			inputValue.length > 1 &&
			inputValue[1] !== "."
		) {
			inputValue = inputValue.slice(1);
		}

		// Prevent the input from starting with a period
		if (inputValue.startsWith(".")) {
			return;
		}

		inputValue = inputValue.replace(/[^0-9.]/g, "");
		const parts = inputValue.split(".");
		if (parts.length > 2) {
			inputValue = parts.shift() + "." + parts.join("");
		}
		if (parts[1]) {
			parts[1] = parts[1].substring(0, 2);
			inputValue = parts.join(".");
		}

		if (/^[0-9,]*\.?[0-9]*$/.test(inputValue)) {
			const formattedValue = formatMoneyInput(inputValue);
			setMinPrice(formattedValue);
		}
	};

	// Update input from URL on mount
	useEffect(() => {
		setMinPrice(formatMoneyInput(searchParams.get("minPrice") || ""));
		setMaxPrice(formatMoneyInput(searchParams.get("maxPrice") || ""));
	}, [searchParams]);

	// Debounce
	useEffect(() => {
		const timeout = setTimeout(() => {
			setDebouncedMin(removeCommas(minPrice));
			setDebouncedMax(removeCommas(maxPrice));
		}, 3000);

		return () => clearTimeout(timeout);
	}, [minPrice, maxPrice]);

	// Update URL and trigger fetch
	useEffect(() => {
		const params = new URLSearchParams(searchParams.toString());

		if (debouncedMin) {
			params.set("minPrice", debouncedMin);
		} else {
			params.delete("minPrice");
		}

		if (debouncedMax) {
			params.set("maxPrice", debouncedMax);
		} else {
			params.delete("maxPrice");
		}

		// This updates the URL, but doesn't trigger a server fetch in app dir
		// router.push(`?${params.toString()}`);
		router.replace(`${window.location.pathname}?${params.toString()}`, {
			scroll: false,
		});
	}, [debouncedMin, debouncedMax]);

	return (
		<div className="mt-4">
			<div className="flex items-center justify-center gap-4">
				<Input
					onKeyDown={handleKeyDown}
					value={minPrice}
					onChange={(e) => handleMinPrice(e)}
					placeholder="Min"
					className="h-12"
				/>
				<Minus />
				<Input
					onKeyDown={handleKeyDown}
					value={maxPrice}
					onChange={(e) => handleMaxPrice(e)}
					placeholder="Max"
					className="h-12"
				/>
			</div>
		</div>
	);
};
