import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { Separator } from "@/components/ui/separator";
import { CartSummary } from "@/components/CartSummary";
import { getUserInfo } from "@/lib/actions/user.actions";
import { OrderReviews } from "../components/OrderReviews";
import { getShippingDetails } from "@/lib/actions/shipping.actions";
import { Header } from "@/components/shared/Header";

export const metadata: Metadata = {
	title: "Review order items – Secure Checkout | LacedUp",
	description:
		"Review your order details. Ready for a smooth and secure checkout experience with multiple payment options including Flutterwave.",
	keywords:
		"Shoe cart, checkout shoes online, review order, secure payment Nigeria, Flutterwave shopping cart",
};

const page = async () => {
	const clerkUser = await currentUser();

	const user = await getUserInfo(clerkUser?.id!);

	const shippingDetails = await getShippingDetails(user.user._id);

	return (
		<div className="relative">
			<Header user={user?.user} />
			<div className="container grid grid-cols-1 lg:grid-cols-3 gap-8 py-4">
				<div className="col-span-2 grid gap-8">
					<div>
						<OrderReviews
							firstName={shippingDetails.details.firstName}
							lastName={shippingDetails.details.lastName}
							email={shippingDetails.details.email}
							phoneNumber={shippingDetails.details.phoneNumber}
							address={shippingDetails.details.address}
							city={shippingDetails.details.city}
							state={shippingDetails.details.state}
							country={shippingDetails.details.country}
							postalCode={shippingDetails.details.postalCode}
						/>
					</div>
				</div>
				<div className="col-span-2 lg:col-span-1">
					<CartSummary
						userId={user?.user._id}
						submit={true}
						shippingDetails={shippingDetails.details}
					/>
				</div>
			</div>
			<div className="container">
				<Separator />
			</div>
		</div>
	);
};

export default page;
