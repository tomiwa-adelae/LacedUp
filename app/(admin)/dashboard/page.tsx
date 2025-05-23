import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { CustomerBox } from "../components/CustomerBox";
import { TopProducts } from "../components/TopProducts";
import { getCustomers, getUserInfo } from "@/lib/actions/user.actions";
import {
	getAdminProducts,
	getTopProducts,
} from "@/lib/actions/product.actions";
import { redirect } from "next/navigation";
import { getAllOrders } from "@/lib/actions/order.actions";
import { DEFAULT_LIMIT } from "@/constants";
import { DashboardBoxes } from "../components/DashboardBoxes";
import { AppNavbar } from "../components/AppNavbar";
import { Header } from "../components/Header";

export const metadata: Metadata = {
	title: "Admin Dashboard | LacedUp",
	description:
		"Get a quick overview of sales, orders, product performance, and store metrics. Monitor activity and manage store operations from your admin dashboard.",
	keywords:
		"admin dashboard, ecommerce admin, store performance, shoe store dashboard, sales analytics Nigeria",
};

const page = async ({ searchParams }: { searchParams: any }) => {
	const { query, page } = await searchParams;

	const clerkUser = await currentUser();

	const user = await getUserInfo(clerkUser?.id!);

	const products = await getAdminProducts({
		userId: user.user._id,
		query,
		page,
	});

	const topProducts = await getTopProducts();

	const customers = await getCustomers({ userId: user.user._id });

	const orders = await getAllOrders({
		userId: user.user._id,
		query,
		page,
	});

	if (
		// products?.status === 400 ||
		customers?.status === 400 ||
		orders.status === 400
	)
		redirect("/not-found");

	return (
		<div>
			<AppNavbar user={user?.user} />
			<Header user={user?.user} />
			<DashboardBoxes
				orders={orders?.orders}
				products={products?.products}
				customers={customers?.customers}
			/>
			<div className="grid-cols-1 grid gap-4 lg:grid-cols-3 pt-8">
				<TopProducts products={topProducts?.products} />
				<div className="col-span-2 md:col-span-1">
					<CustomerBox
						customers={customers?.customers?.slice(0, 5)}
					/>
				</div>
			</div>
		</div>
	);
};

export default page;
