import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { redirect } from "next/navigation";
import { DEFAULT_LIMIT } from "@/constants";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/Pagination";
import { currentUser } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/user.actions";
import { ProductsTable } from "../components/ProductsTable";
import { getAdminProducts } from "@/lib/actions/product.actions";

const page = async ({ searchParams }: { searchParams: any }) => {
	const { query, page } = await searchParams;

	const clerkUser = await currentUser();

	const user = await getUserInfo(clerkUser?.id!);

	const products = await getAdminProducts({
		userId: user.user._id,
		query,
		page,
		limit: DEFAULT_LIMIT,
	});

	if (products.status === 400) redirect("/not-found");

	return (
		<div>
			<div className="flex items-center justify-between gap-8">
				<div>
					<h2 className="text-lg lg:text-3xl uppercase font-semibold">
						My Shoes
					</h2>
					<p className="text-muted-foreground text-sm">
						All your shoes selling shoes in your store
					</p>
				</div>
				<Button size="md" asChild variant={"ghost"}>
					<Link href="/products/new">
						<Plus className="size-4" /> New
					</Link>
				</Button>
			</div>
			<ProductsTable
				products={products.products}
				userId={user?.user._id}
			/>
			{products?.totalPages! > 1 && (
				<Pagination totalPages={products?.totalPages} page={page} />
			)}
		</div>
	);
};

export default page;
