"use client";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useCart, CartItem } from "@/context/CartProvider";
import { IAvailableColor } from "@/lib/database/models/product.model";

type ProductDetails = {
	id: string;
	name: string;
	price: number;
	image: string;
	category: string;
};

export const useAddToCart = (product: ProductDetails) => {
	const { id, name, price, image, category } = product;
	const [quantity, setQuantity] = useState(1);
	const [selectedSize, setSelectedSize] = useState("38");
	const [selectedColor, setSelectedColor] = useState<
		string | IAvailableColor
	>("");
	const { addToCart } = useCart();
	const router = useRouter();

	const handleAddToCart = () => {
		// Validate product options
		if (!quantity) {
			toast({
				title: "Error!",
				variant: "destructive",
				description: "Please select a quantity",
			});
			return;
		}

		if (!selectedSize) {
			toast({
				title: "Error!",
				variant: "destructive",
				description: "Please select a size",
			});
			return;
		}

		// if (!selectedColor) {
		// 	toast({
		// 		title: "Error!",
		// 		variant: "destructive",
		// 		description: "Please select a color",
		// 	});
		// 	return;
		// }

		// Extract color value if it's an IAvailableColor object
		const colorValue =
			typeof selectedColor === "string"
				? selectedColor
				: selectedColor.name;

		// Create the cart item
		const cartItem: CartItem = {
			id,
			name,
			price,
			image,
			quantity,
			color: colorValue,
			size: selectedSize,
			category,
		};

		// Add the item to the cart
		addToCart(cartItem);

		// Navigate to the cart page
		router.push(`/cart`);
	};

	return {
		quantity,
		setQuantity,
		selectedSize,
		setSelectedSize,
		selectedColor,
		setSelectedColor,
		handleAddToCart,
	};
};
