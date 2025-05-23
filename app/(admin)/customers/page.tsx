import { CustomersTable } from "../components/CustomersTable";
import { currentUser } from "@clerk/nextjs/server";
import { getCustomers, getUserInfo } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { DEFAULT_LIMIT } from "@/constants";
import Pagination from "@/components/Pagination";
import { AppNavbar } from "../components/AppNavbar";
import { Header } from "../components/Header";

const page = async ({ searchParams }: { searchParams: any }) => {
	const { query, page } = await searchParams;

	const clerkUser = await currentUser();

	const user = await getUserInfo(clerkUser?.id!);

	const customers = await getCustomers({
		userId: user.user._id,
		query,
		page,
		limit: DEFAULT_LIMIT,
	});

	if (customers?.status === 400) redirect("/not-found");

	return (
		<div>
			<AppNavbar search={true} user={user?.user} />
			<Header search={true} user={user?.user} />
			<div className="flex items-center justify-between gap-8">
				<h2 className="text-lg lg:text-3xl uppercase font-semibold">
					My Customers
				</h2>
			</div>
			<CustomersTable customers={customers?.customers} />
			{customers?.totalPages! > 1 && (
				<Pagination totalPages={customers?.totalPages} page={page} />
			)}
		</div>
	);
};

export default page;
