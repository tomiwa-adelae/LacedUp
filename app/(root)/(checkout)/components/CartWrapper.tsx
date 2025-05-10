"use client";
import { CartDetails } from "@/components/CartDetails";
import { CartSummary } from "@/components/CartSummary";
import { EmptyCart } from "@/components/EmptyCart";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartProvider";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const CartWrapper = () => {
	const { cart, updateQuantity, removeFromCart, clearCart, cartTotal } =
		useCart();
	const searchParams = useSearchParams();

	// Handle direct URL parameters if present (e.g., /cart?id=1&color=black&size=M)
	useEffect(() => {
		const id = searchParams.get("id");
		const color = searchParams.get("color");
		const size = searchParams.get("size");

		// If URL parameters are present but we don't have a proper implementation yet
		// This would need a proper implementation to fetch the product details and add to cart
		// This is just a placeholder for the requested URL structure
		if (id && color && size) {
			console.log(`Product added from URL: ${id}, ${color}, ${size}`);
			// Here you would need to fetch the product details and add it to cart
			// This is just a placeholder for the requested URL structure
		}
	}, [searchParams]);

	console.log(cart);

	if (cart.length === 0) {
		return (
			<div className="container mx-auto px-4 py-16 text-center">
				<h1 className="text-3xl font-bold mb-6">Your Cart is Empty</h1>
				<p className="text-gray-600 mb-8">
					Looks like you haven't added any products to your cart yet.
				</p>
				<Link href="/products">
					<Button>Continue Shopping</Button>
				</Link>
			</div>
		);
	}

	return (
		<div className="container grid grid-cols-1 lg:grid-cols-3 gap-8 py-4">
			<div className="col-span-2">
				<CartDetails carts={cart} />
			</div>
			<div className="col-span-2 lg:col-span-1">
				<CartSummary />
			</div>
		</div>
	);
};
