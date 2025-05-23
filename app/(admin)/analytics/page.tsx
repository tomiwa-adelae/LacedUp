import type { Metadata } from "next";
import { RecentActivity } from "../components/RecentActivity";
import { currentUser } from "@clerk/nextjs/server";
import { getCustomers, getUserInfo } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { getAllOrders } from "@/lib/actions/order.actions";
import { AnalyticBoxes } from "../components/AnalyticBoxes";
import { getAdminProducts } from "@/lib/actions/product.actions";
import { DEFAULT_LIMIT } from "@/constants";
import { AnalyticChart } from "../components/AnalyticChart";
import { AppNavbar } from "../components/AppNavbar";
import { Header } from "../components/Header";

export const metadata: Metadata = {
	title: "Store Analytics – Sales & Insights | LacedUp",
	description:
		"Analyze sales trends, customer behavior, popular products, and conversion rates. Make data-driven decisions to grow your shoe business.",
	keywords:
		"sales analytics, ecommerce insights, product performance, shoe sales dashboard, admin analytics",
};

const page = async ({ searchParams }: { searchParams: any }) => {
	const { query, page } = await searchParams;

	const clerkUser = await currentUser();

	const user = await getUserInfo(clerkUser?.id!);

	const orders = await getAllOrders({
		userId: user.user._id,
		query,
		page,
	});
	const customers = await getCustomers({ userId: user.user._id });
	const products = await getAdminProducts({
		userId: user.user._id,
		query,
		page,
		limit: DEFAULT_LIMIT,
	});

	if (
		orders?.status === 400 ||
		products.status === 400 ||
		customers.status === 400
	)
		redirect("/not-found");

	return (
		<div>
			<AppNavbar user={user?.user} />
			<Header user={user?.user} />
			<div>
				<h2 className="text-lg lg:text-3xl uppercase font-semibold">
					Analytics
				</h2>
				<p className="text-muted-foreground text-sm">
					Get insights into your store's performance and sales
				</p>
			</div>
			<AnalyticBoxes
				customers={customers?.customers}
				orders={orders?.orders}
			/>
			<AnalyticChart
				orders={orders?.orders}
				products={products?.products}
				customers={customers?.customers}
			/>
			<RecentActivity
				order={orders?.orders[0]}
				customer={customers?.customers[0]}
			/>
		</div>
	);
};

export default page;
