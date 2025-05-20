import React from "react";
import { RecentOrders } from "../components/RecentOrders";
import { currentUser } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/user.actions";
import { getAllOrders } from "@/lib/actions/order.actions";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DEFAULT_LIMIT } from "@/constants";

const page = async ({ searchParams }: { searchParams: any }) => {
	const { query, page } = await searchParams;
	const clerkUser = await currentUser();

	const user = await getUserInfo(clerkUser?.id!);

	const orders = await getAllOrders({
		userId: user.user._id,
		query,
		page,
		limit: DEFAULT_LIMIT,
	});

	if (orders?.status === 400) redirect("/not-found");

	return (
		<div>
			<div>
				<h2 className="text-lg lg:text-3xl uppercase font-semibold">
					My Account
				</h2>
				<p className="text-muted-foreground text-sm">
					This is an overview of your account with LacedUp
				</p>
			</div>
			<div className="flex flex-col md:flex-row items-start md:items-center md:justify-start gap-4 mt-8">
				<Image
					src={user?.user?.picture}
					alt={`${user?.user?.firstName} ${user?.user?.lastName}'s picture`}
					width={1000}
					height={1000}
					className="rounded-full object-cover size-32"
				/>
				<div>
					<h4 className="text-lg uppercase font-medium">
						{user?.user?.firstName} {user?.user?.lastName}
					</h4>
					<a
						href={`mailto:${user?.user?.email}`}
						className="text-muted-foreground text-sm block dark:text-gray-200 hover:text-primary transition-all hover:underline"
					>
						{user?.user?.email}
					</a>
					<a
						href={`tel:${user?.user?.phoneNumber}`}
						className="text-muted-foreground text-sm block dark:text-gray-200 hover:text-primary transition-all hover:underline"
					>
						{user?.user?.phoneNumber}
					</a>
					<Button
						asChild
						className="text-primary mt-4"
						size="sm"
						variant={"ghost"}
					>
						<Link href="/settings">Edit profile</Link>
					</Button>
				</div>
			</div>
			<Separator className="my-8" />
			<RecentOrders userId={user?.user?._id} orders={orders?.orders} />
		</div>
	);
};

export default page;
