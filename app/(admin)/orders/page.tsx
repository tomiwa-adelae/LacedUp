import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DEFAULT_LIMIT } from "@/constants";
import { Header } from "../components/Header";
import Pagination from "@/components/Pagination";
import { currentUser } from "@clerk/nextjs/server";
import { AppNavbar } from "../components/AppNavbar";
import { OrdersTable } from "../components/OrdersTable";
import { getUserInfo } from "@/lib/actions/user.actions";
import { getAllOrders } from "@/lib/actions/order.actions";

export const metadata: Metadata = {
	title: "Manage Orders – Admin Panel | LacedUp",
	description:
		"Track customer orders, update delivery status, handle returns, and manage order history for your online shoe store.",
	keywords:
		"manage orders, order fulfillment admin, customer orders Nigeria, order tracking backend",
};

const page = async ({ searchParams }: { searchParams: any }) => {
	const { query, page } = await searchParams;

	const clerkUser = await currentUser();

	const user = await getUserInfo(clerkUser?.id!);

	const orders = await getAllOrders({
		userId: user?.user?._id,
		query,
		page,
		limit: DEFAULT_LIMIT,
	});

	if (orders?.status === 400) redirect("/not-found");

	return (
		<div>
			<AppNavbar search={true} user={user?.user} />
			<Header search={true} user={user?.user} />
			<div className="flex items-center justify-between gap-8">
				<h2 className="text-lg lg:text-3xl uppercase font-semibold">
					My orders
				</h2>
			</div>
			<OrdersTable
				isAdmin={user?.user?.isAdmin}
				userId={user?.user?._id}
				orders={orders?.orders}
			/>
			{orders?.totalPages! > 1 && (
				<Pagination totalPages={orders?.totalPages} page={page} />
			)}
		</div>
	);
};

export default page;
