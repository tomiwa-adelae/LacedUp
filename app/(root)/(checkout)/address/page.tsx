import { currentUser } from "@clerk/nextjs/server";
import { Separator } from "@/components/ui/separator";
import { CartSummary } from "@/components/CartSummary";
import { getUserInfo } from "@/lib/actions/user.actions";
import { PaymentMethod } from "../components/PaymentMethod";
import { getShippingDetails } from "@/lib/actions/shipping.actions";
import { ShippingInformation } from "../components/ShippingInformation";

const page = async () => {
	const clerkUser = await currentUser();

	const user = await getUserInfo(clerkUser?.id!);

	const shippingDetails = await getShippingDetails(user?.user._id);

	return (
		<div className="relative">
			<div className="container grid grid-cols-1 lg:grid-cols-3 gap-8 py-4">
				<div className="col-span-2 grid gap-8">
					<ShippingInformation
						shippingDetails={shippingDetails.details}
						userId={
							shippingDetails.details === null
								? user?.user._id
								: shippingDetails?.details?.user
						}
						firstName={
							shippingDetails.details === null
								? user?.user.firstName
								: shippingDetails?.details?.firstName
						}
						lastName={
							shippingDetails.details === null
								? user?.user.lastName
								: shippingDetails?.details?.lastName
						}
						email={
							shippingDetails.details === null
								? user?.user.email
								: shippingDetails?.details?.email
						}
						phoneNumber={
							shippingDetails.details === null
								? user?.user.phoneNumber
								: shippingDetails?.details?.phoneNumber
						}
						state={
							shippingDetails.details === null
								? user?.user.state
								: shippingDetails?.details?.state
						}
						address={
							shippingDetails.details === null
								? user?.user.address
								: shippingDetails?.details?.address
						}
						city={
							shippingDetails.details === null
								? user?.user.city
								: shippingDetails?.details?.city
						}
						postalCode={
							shippingDetails.details === null
								? user?.user.postalCode
								: shippingDetails?.details?.postalCode
						}
					/>
					<PaymentMethod />
				</div>
				<div className="col-span-2 lg:col-span-1">
					<CartSummary
						cta={{ slug: "/review", label: "Review orders" }}
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
