"use client";
import { Dot, Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";
import { useCart } from "@/context/CartProvider";
import { formatMoneyInput } from "@/lib/utils";

interface Props {
	name: string;
	category: string;
	color: string;
	id: string;
	image: string;
	price: string;
	quantity: any;
	size: string;
}

export const Cart = ({
	name,
	category,
	color,
	id,
	image,
	price,
	quantity,
	size,
}: Props) => {
	// State for quantity
	// const [quantity, setQuantity] = useState(1);

	const { cart, updateQuantity, removeFromCart, clearCart, cartTotal } =
		useCart();

	return (
		<>
			<div className="md:hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-lg p-2 flex flex-col items-start justify-between gap-4 dark:border">
				<Image
					src={image}
					alt={`${name}'s picture`}
					width={1000}
					height={1000}
					className="aspect-video object-cover rounded-lg "
				/>
				<div className="w-full">
					<h3>
						<Link
							href={`/shoes/${id}`}
							className="text-lg font-medium mb-1 hover:text-primary transition-all"
						>
							{name}
						</Link>
					</h3>
					<div className="flex items-center justify-start text-xs my-1 font-medium text-muted-foreground dark:text-gray-200">
						<Link href={`/category/${category}`}>
							Category:{" "}
							<span className="text-black dark:text-white hover:text-primary dark:hover:text-primary">
								{category}
							</span>
						</Link>
						<Dot className="text-black dark:text-white size-5" />
						<p>
							Color:{" "}
							<span className="text-black dark:text-white">
								{color}
							</span>
						</p>
						<Dot className="text-black dark:text-white size-5" />
						<p>
							Size:{" "}
							<span className="text-black dark:text-white">
								{size}
							</span>
						</p>
					</div>
					<div>
						<div className="flex items-center justify-between gap-4 mt-4">
							<h3 className="font-medium text-base">
								₦{formatMoneyInput(price)}
							</h3>
							<div className="flex items-center justify-end gap-2">
								<Button
									variant="ghost"
									size="sm"
									onClick={() =>
										removeFromCart(id, color, size)
									}
								>
									<Trash />
								</Button>
								<div className="flex items-center">
									<Button
										size={"icon"}
										onClick={() =>
											updateQuantity(
												id,
												color,
												size,
												quantity - 1
											)
										}
										className="h-9"
										aria-label="Decrease quantity"
										variant={"ghost"}
									>
										<Minus className="size-4" />
									</Button>

									<p className="px-4 text-sm">{quantity}</p>

									<Button
										size={"icon"}
										onClick={() =>
											updateQuantity(
												id,
												color,
												size,
												quantity + 1
											)
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
				</div>
			</div>
			<div className="hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-lg p-2 md:flex items-center justify-between gap-4 dark:border">
				<Image
					src={image}
					alt={`${name}'s picture`}
					width={1000}
					height={1000}
					className="object-cover aspect-square size-[100px] rounded-lg"
				/>
				<div className="flex-1">
					<h3>
						<Link
							href={`/shoes/${id}`}
							className="text-base font-medium mb-1 hover:text-primary transition-all"
						>
							{name}
						</Link>
					</h3>
					<div className="flex items-center justify-start text-xs my-1 font-medium text-muted-foreground dark:text-gray-200">
						<Link href={`/category/${category}`}>
							Category:{" "}
							<span className="capitalize text-black dark:text-white hover:text-primary dark:hover:text-primary">
								{category}
							</span>
						</Link>
						<Dot className="text-black dark:text-white size-5" />
						<p>
							Color:{" "}
							<span className="text-black dark:text-white">
								{color}
							</span>
						</p>
						<Dot className="text-black dark:text-white size-5" />
						<p>
							Size:{" "}
							<span className="text-black dark:text-white">
								{size}
							</span>
						</p>
					</div>
				</div>

				<div className="flex flex-col items-end justify-center gap-1 h-full">
					<h3 className="font-medium text-base">
						₦{formatMoneyInput(price)}
					</h3>
					<div className="flex items-center justify-end gap-2">
						<Button
							variant="ghost"
							size="sm"
							onClick={() => removeFromCart(id, color, size)}
						>
							<Trash />
						</Button>
						<div className="flex items-center">
							<Button
								size={"icon"}
								onClick={() =>
									updateQuantity(
										id,
										color,
										size,
										quantity - 1
									)
								}
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
								onClick={() =>
									updateQuantity(
										id,
										color,
										size,
										quantity + 1
									)
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
		</>
	);
};
