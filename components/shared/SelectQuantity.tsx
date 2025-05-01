"use client";
import { useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { Input } from "../ui/input";

export const SelectQuantity = () => {
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
		<div className="mb-6">
			<Label id="quantity" className="mb-3">
				Select quantity
			</Label>

			<div className="flex items-center">
				<Button
					size={"sm"}
					onClick={decreaseQuantity}
					disabled={quantity <= minQuantity}
					className="h-14 rounded-none rounded-l-lg"
					aria-label="Decrease quantity"
					variant={"outline"}
				>
					<Minus className="size-6" />
				</Button>

				{/* Quantity input */}
				<Input
					type="text"
					id="quantity"
					value={quantity}
					onChange={handleQuantityChange}
					aria-label="Quantity"
					className="rounded-none text-center"
				/>

				{/* Increase button */}
				<Button
					size={"sm"}
					onClick={increaseQuantity}
					disabled={quantity >= Math.min(maxQuantity, inStock)}
					className="rounded-none rounded-r-lg h-14"
					variant={"outline"}
					aria-label="Increase quantity"
				>
					<Plus className="size-6" />
				</Button>
			</div>
		</div>
	);
};
