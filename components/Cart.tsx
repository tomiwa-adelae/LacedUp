"use client";
import { Dot, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";
import { Input } from "./ui/input";

export const Cart = () => {
	// State for quantity
	const [quantity, setQuantity] = useState(1);

	// Min and max quantity limits
	const minQuantity = 1;
	const maxQuantity = 10;
	const inStock = 8;

	// Handle quantity increase
	const increaseQuantity = () => {
		if (quantity < Math.min(maxQuantity, inStock)) {
			setQuantity(quantity + 1);
		}
	};

	// Handle quantity decrease
	const decreaseQuantity = () => {
		if (quantity > minQuantity) {
			setQuantity(quantity - 1);
		}
	};

	// Handle direct input of quantity
	const handleQuantityChange = (e: any) => {
		const value = parseInt(e.target.value);
		if (!isNaN(value)) {
			// Keep quantity within limits
			const newQuantity = Math.max(
				minQuantity,
				Math.min(value, Math.min(maxQuantity, inStock))
			);
			setQuantity(newQuantity);
		}
	};

	return (
		<>
			<div className="md:hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-lg p-2 flex flex-col items-start justify-between gap-4 dark:border">
				<Image
					src={"/assets/images/sneakers.jpg"}
					alt={"Sneakers"}
					width={1000}
					height={1000}
					className="aspect-video object-cover rounded-lg "
				/>
				<div className="w-full">
					<h3>
						<Link
							href="/shoes/12345"
							className="text-lg font-medium mb-1 hover:text-primary transition-all"
						>
							Nike Cosmic Unity
						</Link>
					</h3>
					<div className="flex items-center justify-start text-xs my-1 font-medium text-muted-foreground dark:text-gray-200">
						<Link href="/category/loafers">
							Category:{" "}
							<span className="text-black dark:text-white hover:text-primary dark:hover:text-primary">
								Loafers
							</span>
						</Link>
						<Dot className="text-black dark:text-white size-5" />
						<p>
							Color:{" "}
							<span className="text-black dark:text-white">
								Blue
							</span>
						</p>
					</div>
					<div className="flex items-center justify-between gap-4 mt-4">
						<h3 className="font-medium text-base">₦14,900</h3>
						<div className="flex items-center">
							<Button
								size={"icon"}
								onClick={decreaseQuantity}
								disabled={quantity <= minQuantity}
								className="h-9"
								aria-label="Decrease quantity"
								variant={"ghost"}
							>
								<Minus className="size-4" />
							</Button>

							<p className="px-4 text-sm">{quantity}</p>

							<Button
								size={"icon"}
								onClick={increaseQuantity}
								disabled={
									quantity >= Math.min(maxQuantity, inStock)
								}
								className="h-9"
								variant={"ghost"}
								aria-label="Increase quantity"
							>
								<Plus className="size-4" />
							</Button>
						</div>
					</div>
				</div>
			</div>
			<div className="hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-lg p-2 md:flex items-end justify-between gap-4 dark:border">
				<Image
					src={"/assets/images/sneakers.jpg"}
					alt={"Sneakers"}
					width={1000}
					height={1000}
					className="object-cover aspect-square size-[100px] rounded-lg"
				/>
				<div className="flex-1">
					<h3>
						<Link
							href="/shoes/12345"
							className="text-lg font-medium mb-1 hover:text-primary transition-all"
						>
							Nike Cosmic Unity
						</Link>
					</h3>
					<div className="flex items-center justify-start text-sm my-1 font-medium text-muted-foreground dark:text-gray-200">
						<Link href="/category/loafers">
							Category:{" "}
							<span className="text-black dark:text-white hover:text-primary dark:hover:text-primary">
								Loafers
							</span>
						</Link>
						<Dot className="text-black dark:text-white size-5" />
						<p>
							Color:{" "}
							<span className="text-black dark:text-white">
								Blue
							</span>
						</p>
					</div>
				</div>
				<div className="flex flex-col justify-end gap-1 items-end h-full">
					<h3 className="font-medium text-base">₦14,900</h3>
					<div className="flex items-center">
						<Button
							size={"icon"}
							onClick={decreaseQuantity}
							disabled={quantity <= minQuantity}
							className="h-9"
							aria-label="Decrease quantity"
							variant={"ghost"}
						>
							<Minus className="size-4" />
						</Button>

						{/* Quantity input */}
						<p className="px-4 text-sm">{quantity}</p>

						{/* Increase button */}
						<Button
							size={"sm"}
							onClick={increaseQuantity}
							disabled={
								quantity >= Math.min(maxQuantity, inStock)
							}
							className="h-9"
							variant={"ghost"}
							aria-label="Increase quantity"
						>
							<Plus className="size-4" />
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};
