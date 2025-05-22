"use client";
import { toast } from "@/hooks/use-toast";
import React, { createContext, useContext, useEffect, useState } from "react";

// Define types for our cart items and context
export type CartItem = {
	id: string;
	name: string;
	price: number;
	image: string;
	quantity: number;
	color: string;
	size: string;
	category: string;
};

type CartContextType = {
	cart: CartItem[];
	addToCart: (product: CartItem) => void;
	updateQuantity: (
		id: string,
		color: string,
		size: string,
		quantity: number
	) => void;
	removeFromCart: (id: string, color: string, size: string) => void;
	clearCart: () => void;
	cartTotal: number;
	cartCount: number;
};

// Create the context with default values
const CartContext = createContext<CartContextType>({
	cart: [],
	addToCart: () => {},
	updateQuantity: () => {},
	removeFromCart: () => {},
	clearCart: () => {},
	cartTotal: 0,
	cartCount: 0,
});

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [cart, setCart] = useState<CartItem[]>([]);
	const [cartCount, setCartCount] = useState(0);
	const [cartTotal, setCartTotal] = useState(0);
	const [isClient, setIsClient] = useState(false);

	// Initialize the cart from localStorage when the component mounts
	useEffect(() => {
		setIsClient(true);
		const storedCart = localStorage.getItem("cart");
		if (storedCart) {
			try {
				const parsedCart = JSON.parse(storedCart);
				setCart(parsedCart);
			} catch (error) {
				console.error("Failed to parse cart from localStorage:", error);
				localStorage.removeItem("cart");
			}
		}
	}, []);

	// Update localStorage whenever the cart changes
	useEffect(() => {
		if (isClient) {
			localStorage.setItem("cart", JSON.stringify(cart));

			// Calculate cart total and count
			const { total, count } = cart.reduce(
				(acc, item) => {
					acc.total += item.price * item.quantity;
					acc.count += item.quantity;
					return acc;
				},
				{ total: 0, count: 0 }
			);

			setCartTotal(total);
			setCartCount(count);
		}
	}, [cart, isClient]);

	// Add a product to the cart
	const addToCart = (product: CartItem) => {
		setCart((prevCart) => {
			// Check if this exact product (same id, color, size) already exists in the cart
			const existingItemIndex = prevCart.findIndex(
				(item) =>
					item.id === product.id &&
					item.color === product.color &&
					item.size === product.size
			);

			if (existingItemIndex !== -1) {
				// If it exists, update the quantity
				const updatedCart = [...prevCart];
				updatedCart[existingItemIndex].quantity += product.quantity;

				toast({
					title: "Cart updated!",
					description: `${product.name} quantity updated in your cart.`,
				});

				return updatedCart;
			} else {
				// If it doesn't exist, add the new product
				toast({
					title: "Added to cart!",
					description: `${product.name} has been added to your cart.`,
				});

				return [...prevCart, product];
			}
		});
	};

	// Update the quantity of an item in the cart
	const updateQuantity = (
		id: string,
		color: string,
		size: string,
		quantity: number
	) => {
		if (quantity <= 0) {
			removeFromCart(id, color, size);
			return;
		}

		setCart((prevCart) => {
			const updatedCart = prevCart.map((item) => {
				if (
					item.id === id &&
					item.color === color &&
					item.size === size
				) {
					return { ...item, quantity };
				}
				return item;
			});
			return updatedCart;
		});
	};

	// Remove an item from the cart
	const removeFromCart = (id: string, color: string, size: string) => {
		setCart((prevCart) => {
			const updatedCart = prevCart.filter(
				(item) =>
					!(
						item.id === id &&
						item.color === color &&
						item.size === size
					)
			);

			toast({
				title: "Item removed",
				description: "The item has been removed from your cart.",
			});

			return updatedCart;
		});
	};

	// Clear the entire cart
	const clearCart = () => {
		setCart([]);
		toast({
			title: "Cart cleared",
			description: "All items have been removed from your cart.",
		});
	};

	const value = {
		cart,
		addToCart,
		updateQuantity,
		removeFromCart,
		clearCart,
		cartTotal,
		cartCount,
	};

	return (
		<CartContext.Provider value={value}>{children}</CartContext.Provider>
	);
};
