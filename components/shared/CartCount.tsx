"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartProvider";

export const CartCount = () => {
	const { cartCount } = useCart();

	return (
		<Link href="/cart">
			<Button variant="ghost" size="icon" className="relative">
				<ShoppingCart />
				{cartCount > 0 && (
					<span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
						{cartCount}
					</span>
				)}
			</Button>
		</Link>
	);
};
