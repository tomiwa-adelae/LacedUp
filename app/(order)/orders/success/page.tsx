import { Showcase } from "@/components/shared/Showcase";
import { Separator } from "@/components/ui/separator";
import { getOrderDetails } from "@/lib/actions/order.actions";
import { getUserInfo } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const page = async ({ searchParams }: { searchParams: any }) => {
	const clerkUser = await currentUser();

	const { id } = await searchParams;

	const user = await getUserInfo(clerkUser?.id!);

	const order = await getOrderDetails({ userId: user.user._id, orderId: id });

	if (order.status === 400) redirect("/not found");
	return (
		<div>
			<Showcase
				title={
					<>
						Successfully{" "}
						<span className="text-primary">Ordered!</span>
					</>
				}
				description="Thank you for your order, you should receive an email confirmation very soon"
				cta={[
					{ slug: "/", label: "Back to shop" },
					{
						slug: `/orders/${order.order._id}`,
						label: "View details",
					},
				]}
				image={"/assets/images/showcase-img.png"}
			/>
			<div className="container">
				<Separator />
			</div>
		</div>
	);
};

export default page;
