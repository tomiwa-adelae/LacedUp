import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import Link from "next/link";
import { OrdersTable } from "../components/OrdersTable";
import { currentUser } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { getAllOrders } from "@/lib/actions/order.actions";

const page = async () => {
	const clerkUser = await currentUser();

	const user = await getUserInfo(clerkUser?.id!);

	const orders = await getAllOrders(user.user._id);

	if (orders?.status === 400) redirect("/not-found");

	return (
		<div>
			<div className="flex items-center justify-between gap-8">
				<h2 className="text-lg lg:text-3xl uppercase font-semibold">
					My orders
				</h2>
				<div className="flex items-center justify-center gap-4">
					<Button size="md" asChild variant={"ghost"}>
						<Link href="/products/new">
							<Printer className="size-4" />
							Print
						</Link>
					</Button>
					<Button size="md" asChild>
						<Link href="/products/new">
							<Download className="size-4" />
							Export
						</Link>
					</Button>
				</div>
			</div>
			<OrdersTable orders={orders?.orders} />
		</div>
	);
};

export default page;
