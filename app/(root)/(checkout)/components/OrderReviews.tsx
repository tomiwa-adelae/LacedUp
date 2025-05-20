"use client";

import { useCart } from "@/context/CartProvider";
import { formatMoneyInput, formattedPaymentMethod } from "@/lib/utils";
import { Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	address: string;
	city: string;
	state: string;
	country: string;
	postalCode: string;
}

export const OrderReviews = ({
	firstName,
	lastName,
	email,
	phoneNumber,
	address,
	city,
	state,
	country,
	postalCode,
}: Props) => {
	const { cart } = useCart();

	const [payment, setPayment] = useState<any>();

	useEffect(() => {
		const storedPaymentMethod = localStorage.getItem("paymentMethod");

		const paymentMethod = JSON.parse(storedPaymentMethod!);
		setPayment(paymentMethod.paymentMethod);
	}, []);

	return (
		<div className="bg-white grid gap-4 dark:bg-black dark:text-white w-full">
			<div>
				<h2 className="text-xl md:text-2xl uppercase font-semibold mb-2">
					My orders
				</h2>
				{cart.map(
					(
						{
							image,
							name,
							price,
							id,
							category,
							color,
							size,
							quantity,
						},
						index
					) => (
						<div key={index}>
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
											<span className="text-black dark:text-white hover:text-primary dark:hover:text-primary capitalize">
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
										<Dot className="text-black dark:text-white size-5" />
										<p>
											Quantity:{" "}
											<span className="text-black dark:text-white">
												{quantity}
											</span>
										</p>
									</div>
									<div>
										<div className="flex items-center justify-between gap-4 mt-4">
											<h3 className="font-medium text-base">
												₦ {formatMoneyInput(price)}
											</h3>
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
									className="object-cover aspect-square size-[80px] rounded-lg"
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
										<Dot className="text-black dark:text-white size-5" />
										<p>
											Quantity:{" "}
											<span className="text-black dark:text-white">
												{quantity}
											</span>
										</p>
									</div>
								</div>

								<div className="flex flex-col justify-center gap-1 items-center h-full">
									<h3 className="font-medium text-base">
										₦ {formatMoneyInput(price)}
									</h3>
								</div>
							</div>
						</div>
					)
				)}
			</div>
			<div>
				<h2 className="text-lg uppercase font-semibold mb-2">
					Shipping details
				</h2>
				<div className="text-sm text-muted-foreground dark:text-gray-200 grid gap-4 border p-4 rounded-lg font-medium">
					<p>
						Full name:{" "}
						<span className="text-black dark:text-white">
							{firstName} {lastName}
						</span>
					</p>
					<p>
						Email:{" "}
						<span className="text-black dark:text-white">
							{email}
						</span>
					</p>
					<p>
						Phone number:{" "}
						<span className="text-black dark:text-white">
							{phoneNumber}
						</span>
					</p>
					<p>
						Address:{" "}
						<span className="text-black dark:text-white">
							{address}
						</span>
					</p>
					<p>
						City:{" "}
						<span className="text-black dark:text-white">
							{city}
						</span>
					</p>
					<p>
						State:{" "}
						<span className="text-black dark:text-white">
							{state}
						</span>
					</p>
					<p>
						Postal code:{" "}
						<span className="text-black dark:text-white">
							{postalCode}
						</span>
					</p>
					<p>
						Country:{" "}
						<span className="text-black dark:text-white">
							{country}
						</span>
					</p>
				</div>
			</div>
			<div>
				<h2 className="text-lg uppercase font-semibold mb-2">
					Payment Information
				</h2>
				<div className="text-sm text-muted-foreground dark:text-gray-200 grid gap-4 border p-4 rounded-lg font-medium">
					<p>
						Payment method:{" "}
						<span className="text-black dark:text-white">
							{formattedPaymentMethod[payment]}
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};
