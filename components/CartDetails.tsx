import Link from "next/link";
import { Cart } from "./Cart";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

export const CartDetails = ({ carts }: { carts: any }) => {
	return (
		<div>
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
