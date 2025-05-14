import { currentUser } from "@clerk/nextjs/server";
import { CustomerBox } from "../components/CustomerBox";
import { DashboardBox } from "../components/DashboardBox";
import { TopProducts } from "../components/TopProducts";
import { getCustomers, getUserInfo } from "@/lib/actions/user.actions";
import {
	getAdminProducts,
	getAdminTopProducts,
} from "@/lib/actions/product.actions";
import { redirect } from "next/navigation";
import { getAllOrders } from "@/lib/actions/order.actions";

const page = async () => {
	const clerkUser = await currentUser();

	const user = await getUserInfo(clerkUser?.id!);

	const products = await getAdminProducts({
		userId: user.user._id,
	});

	const topProducts = await getAdminTopProducts({
		userId: user.user._id,
	});

	const customers = await getCustomers({ userId: user.user._id });

	const orders = await getAllOrders(user.user._id);

	if (
		products?.status === 400 ||
		customers?.status === 400 ||
		orders.status === 400
	)
		redirect("/not-found");

	return (
		<div>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				<DashboardBox
					title={"Total Order"}
					number={orders?.orders?.length}
					description={"Increase 133% this month"}
					percentage={"7.83%"}
					direction={"up"}
				/>
				<DashboardBox
					title={"Total Products"}
					number={products?.products?.length}
					description={"Increase 133% this month"}
					percentage={"7.83%"}
					direction={"down"}
				/>
				<div className="md:col-span-2 lg:col-span-1">
					<DashboardBox
						title={"Total Customers"}
						number={customers?.customers?.length}
						description={"Increase 123% this month"}
						percentage={"7.83%"}
						direction={"down"}
					/>
				</div>
			</div>
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
