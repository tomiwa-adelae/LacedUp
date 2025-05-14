import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { CustomersTable } from "../components/CustomersTable";
import { AnalyticBox } from "../components/AnalyticBox";
import { AnalyticChart } from "../components/AnalyticChart";
import { RecentActivity } from "../components/RecentActivty";
import { currentUser } from "@clerk/nextjs/server";
import { getCustomers, getUserInfo } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { getAllOrders } from "@/lib/actions/order.actions";
import { AnalyticBoxes } from "../components/AnalyticBoxes";
import { getAdminProducts } from "@/lib/actions/product.actions";

const page = async () => {
	const clerkUser = await currentUser();

	const user = await getUserInfo(clerkUser?.id!);

	const orders = await getAllOrders(user.user._id);
	const customers = await getCustomers({ userId: user.user._id });
	const products = await getAdminProducts({
		userId: user.user._id,
	});

	if (orders?.status === 400) redirect("/not-found");

	return (
		<div>
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
				recentOrder={orders.orders[0]}
				newCustomer={customers?.customers[0]}
				latestProduct={products?.products[0]}
			/>
		</div>
	);
};

export default page;
