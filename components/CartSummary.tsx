"use client";
import { cn, formatMoneyInput } from "@/lib/utils";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { useCart } from "@/context/CartProvider";
import { IShipping } from "@/lib/database/models/shipping.model";
import { DEFAULT_SHIPPING_PRICE } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { createOrder } from "@/lib/actions/order.actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
	cta?: { slug: string; label: string };
	submit?: boolean;
	userId?: string;
	shippingDetails?: IShipping;
}

export const CartSummary = ({
	cta = { slug: "/", label: "Check out" },
	submit,
	userId,
	shippingDetails,
}: Props) => {
	const { cart, updateQuantity, removeFromCart, clearCart, cartTotal } =
		useCart();

	const [loading, setLoading] = useState(false);

	const router = useRouter();

	const handleSubmit = async () => {
		const storedPaymentMethod = localStorage.getItem("paymentMethod");

		const paymentMethod = JSON.parse(storedPaymentMethod!);

		try {
			setLoading(true);

			if (!paymentMethod)
				return toast({
					title: "Success!",
					variant: "destructive",
					description: "You have not selected a payment method.",
				});

			// if (!shippingDetails)
			// 	return toast({
			// 		title: "Success!",
			// 		variant: "destructive",
			// 		description: "You have not provided a shipping details.",
			// 	});

			const updatedCart = cart.map(({ id, ...rest }) => ({
				...rest,
				product: id,
			}));

			const details = {
				user: userId,
				orderItems: updatedCart,
				shippingDetails: {
					firstName: shippingDetails?.firstName,
					lastName: shippingDetails?.lastName,
					email: shippingDetails?.email,
					phoneNumber: shippingDetails?.phoneNumber,
					city: shippingDetails?.city,
					address: shippingDetails?.address,
					state: shippingDetails?.state,
					country: shippingDetails?.country,
					postalCode: shippingDetails?.postalCode,
				},
				paymentMethod: paymentMethod.paymentMethod,
				shippingPrice: DEFAULT_SHIPPING_PRICE,
				totalPrice: cartTotal,
			};

			console.log(details);

			const res = await createOrder(details);

			if (res?.status === 400)
				return toast({
					title: "Error!",
					description: res?.message,
					variant: "destructive",
				});

			toast({
				title: "Success!",
				description: res.message,
			});
			setLoading(false);

			router.push(`/orders/success?id=${res.order._id}`);
		} catch (error) {
			setLoading(false);
			toast({
				title: "Error!",
				description: "An error occurred!",
				variant: "destructive",
			});
		}
	};

	return (
		<div className="sticky top-21 lg:block p-8 pb-4 rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-40 bg-white dark:bg-black dark:border col-span-2 lg:col-span-1">
			<div className="flex items-center justify-between gap-8 mb-4">
				<h2 className="text-xl uppercase font-semibold">
					Order summary
				</h2>
			</div>
			<div className="font-medium text-sm lg:text-base text-black dark:text-white">
				<Separator />
				<div className="flex items-center justify-between py-4">
					<p className="text-muted-foreground dark:text-gray-200">
						Subtotal
					</p>
					<p>₦{formatMoneyInput(cartTotal.toFixed(2))}</p>
				</div>
				<Separator />{" "}
				<div className="flex items-center justify-between py-4">
					<p className="text-muted-foreground dark:text-gray-200">
						Shipping
					</p>
					<p>Free</p>
				</div>
				<Separator />
				<div className="flex items-center justify-between  py-4">
					<p className="text-muted-foreground dark:text-gray-200">
						Total
					</p>
					<p>₦{formatMoneyInput(cartTotal.toFixed(2))}</p>
				</div>
				<Separator />
			</div>
			<Button
				disabled={cart.length === 0}
				asChild
				size="lg"
				className={cn("w-full mt-4", submit && "hidden")}
			>
				<Link href={cta.slug}>{cta.label}</Link>
			</Button>
			<Button
				disabled={cart.length === 0 || !submit || loading}
				size="lg"
				className={cn("w-full mt-4 hidden", submit && "flex")}
				onClick={handleSubmit}
			>
				{loading ? "Ordering..." : "Confirm orders"}
			</Button>
		</div>
	);
};
