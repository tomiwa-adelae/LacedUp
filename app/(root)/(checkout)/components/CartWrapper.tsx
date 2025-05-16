"use client";
import { CartDetails } from "@/components/CartDetails";
import { CartSummary } from "@/components/CartSummary";
import { EmptyCart } from "@/components/EmptyCart";
import { useCart } from "@/context/CartProvider";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const CartWrapper = () => {
	const { cart } = useCart();
	const searchParams = useSearchParams();

	useEffect(() => {
		const id = searchParams.get("id");
		const color = searchParams.get("color");
		const size = searchParams.get("size");

		if (id && color && size) {
			console.log(`Product added from URL: ${id}, ${color}, ${size}`);
		}
	}, [searchParams]);

	if (cart.length === 0) {
		return <EmptyCart />;
	}

	return (
		<div className="relative container grid grid-cols-1 lg:grid-cols-3 gap-8 py-4">
			<div className="col-span-2">
				<CartDetails carts={cart} />
			</div>
			<CartSummary cta={{ label: "Check out", slug: "/address" }} />
		</div>
	);
};
