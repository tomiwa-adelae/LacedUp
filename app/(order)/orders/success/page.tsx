import { Showcase } from "@/components/shared/Showcase";
import { ShopCategory } from "@/components/ShopCategory";
import { ShopNew } from "@/components/ShopNew";
import { Separator } from "@/components/ui/separator";
import { getOrderDetails } from "@/lib/actions/order.actions";
import { getNewProducts } from "@/lib/actions/product.actions";
import { getUserInfo } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const page = async ({ searchParams }: { searchParams: any }) => {
	const clerkUser = await currentUser();

	const { id } = await searchParams;

	const user = await getUserInfo(clerkUser?.id!);

	const order = await getOrderDetails({ userId: user.user._id, orderId: id });
	const newProducts = await getNewProducts({});

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
				image={order?.order.orderItems[0].image}
			/>
			<div className="container">
				<Separator />
			</div>
			<ShopNew products={newProducts.products} />
			<div className="container">
				<Separator />
			</div>
			<ShopCategory />
			<div className="container">
				<Separator />
			</div>
		</div>
	);
};

export default page;
