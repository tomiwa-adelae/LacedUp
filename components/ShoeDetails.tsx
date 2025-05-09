"use client";

import { useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { shoeSizes } from "@/constants";
import { ColorSelector } from "./shared/ColorSelector";
import { Label } from "./ui/label";
import { SelectQuantity } from "./shared/SelectQuantity";
import { Separator } from "./ui/separator";

export const ShoeDetails = () => {
	const buttonRef = useRef<HTMLDivElement | null>(null);
	const [showFixedButton, setShowFixedButton] = useState(true);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				setShowFixedButton(!entry.isIntersecting);
			},
			{
				root: null,
				threshold: 1.0,
			}
		);

		if (buttonRef.current) {
			observer.observe(buttonRef.current);
		}

		return () => {
			if (buttonRef.current) {
				observer.unobserve(buttonRef.current);
			}
		};
	}, []);

	return (
		<div>
			<h1 className="leading-relaxed text-3xl lg:text-4xl font-semibold">
				Nike Cosmic Unity
			</h1>
			<p className="text-base text-muted-foreground dark:text-gray-200">
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque
				sint, suscipit corrupti voluptates amet facere ducimus,
				aspernatur debitis provident beatae pariatur qui tempora
				deserunt fugit illo repellat facilis unde aliquam.
			</p>

			<div className="flex items-center justify-between gap-4 mt-4">
				<h2 className="font-semibold text-2xl lg:text-3xl">₦14,900</h2>
				<Button size="icon" variant={"outline"}>
					<Heart />
				</Button>
			</div>

			<Separator className="my-8" />

			<div className="grid gap-4">
				<ColorSelector />
				<div>
					<Label className="mb-3">Select size</Label>
					<Select>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select a size" />
						</SelectTrigger>
						<SelectContent>
							{shoeSizes.map((size, index) => (
								<SelectItem key={index} value={size}>
									{size}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<SelectQuantity />
			</div>

			{/* Static button at bottom of product section */}
			<div ref={buttonRef}>
				<Button className="w-full" size="lg">
					Add to cart
				</Button>
			</div>

			{/* Fixed button at bottom of screen */}
			{showFixedButton && (
				<div className="fixed md:hidden w-full bg-white dark:bg-black border-t py-2 bottom-0 left-0 z-50">
					<div className="container">
						<Button className="w-full" size="lg">
							Add to cart
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};
