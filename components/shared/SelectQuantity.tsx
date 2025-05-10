"use client";
import { useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { Input } from "../ui/input";

interface SelectQuantityProps {
	quantity: number;
	setQuantity: (val: number) => void;
	inStock?: number;
	minQuantity?: number;
	maxQuantity?: number;
}

export const SelectQuantity = ({
	quantity,
	setQuantity,
	inStock = 8,
	minQuantity = 1,
	maxQuantity = 10,
}: SelectQuantityProps) => {
	const increaseQuantity = () => {
		if (quantity < Math.min(maxQuantity, inStock)) {
			setQuantity(quantity + 1);
		}
	};

	const decreaseQuantity = () => {
		if (quantity > minQuantity) {
			setQuantity(quantity - 1);
		}
	};

	const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value);
		if (!isNaN(value)) {
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
					className="h-12 rounded-none rounded-l-lg"
					aria-label="Decrease quantity"
					variant={"outline"}
				>
					<Minus />
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
					className="rounded-none rounded-r-lg h-12"
					variant={"outline"}
					aria-label="Increase quantity"
				>
					<Plus />
				</Button>
			</div>
		</div>
	);
};
