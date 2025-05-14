import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { CustomersTable } from "../components/CustomersTable";
import { currentUser } from "@clerk/nextjs/server";
import { getCustomers, getUserInfo } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const page = async () => {
	const clerkUser = await currentUser();

	const user = await getUserInfo(clerkUser?.id!);

	const customers = await getCustomers({ userId: user.user._id });

	if (customers?.status === 400) redirect("/not-found");

	return (
		<div>
			<div className="flex items-center justify-between gap-8">
				<h2 className="text-lg lg:text-3xl uppercase font-semibold">
					My Customers
				</h2>

				<Button size="md" asChild variant={"ghost"}>
					<Link href="/products/new">
						<Plus className="size-4" /> New
					</Link>
				</Button>
			</div>
			<CustomersTable customers={customers?.customers} />
		</div>
	);
};

export default page;
