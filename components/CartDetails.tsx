import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Cart } from "./Cart";

export const CartDetails = ({ carts }: { carts: any }) => {
	return (
		<div className="p-8 rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-40 bg-white dark:bg-black dark:border dark:bg-black dark:text-white">
			<div className="flex items-center justify-between gap-8">
				<h2 className="text-xl md:text-2xl uppercase font-semibold">
					My carts
				</h2>
				<Button
					className="hidden lg:inline-flex"
					asChild
					size="md"
					variant={"ghost"}
				>
					<Link href="/">
						Continue shopping <ChevronRight />
					</Link>
				</Button>
			</div>
			<div className="grid gap-4 mt-4">
				{carts.map((cart: any, index: any) => (
					<Cart
						key={index}
						name={cart.name}
						category={cart.category}
						color={cart.color}
						id={cart.id}
						image={cart.image}
						price={cart.price}
						quantity={cart.quantity}
						size={cart.size}
					/>
				))}
			</div>
		</div>
	);
};
