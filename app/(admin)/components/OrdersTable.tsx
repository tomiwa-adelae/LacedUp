"use client";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Ban,
	CircleCheckBig,
	CircleDashed,
	CircleOff,
	Eye,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { IOrder } from "@/lib/database/models/order.model";
import { formatDate, formatMoneyInput, formUrlQuery } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CancelOrderModal } from "./CancelOrderModal";
import { useRouter, useSearchParams } from "next/navigation";
import { InformationBox } from "./InformationBox";

export const OrdersTable = ({
	userId,
	isAdmin,
	orders,
}: {
	userId: string;
	isAdmin: boolean;
	orders: IOrder[];
}) => {
	const [openCancelModal, setOpenCancelModal] = useState(false);
	const [orderId, setOrderId] = useState("");

	const router = useRouter();
	const searchParams = useSearchParams();

	const filterSearch = async (type: string) => {
		try {
			let newUrl = "";
			newUrl = formUrlQuery({
				params: searchParams.toString(),
				key: "query",
				value: type,
			});

			router.push(newUrl, { scroll: false });
		} catch (error) {}
	};

	return (
		<div className="mt-4">
			<Tabs defaultValue="all" className="space-y-4">
				<TabsList>
					<TabsTrigger onClick={() => filterSearch("")} value="all">
						All orders
					</TabsTrigger>
					{/* <TabsTrigger
						onClick={() => filterSearch("processing")}
						value="processing"
					>
						Processing
					</TabsTrigger> */}
					<TabsTrigger
						onClick={() => filterSearch("delivered")}
						value="delivered"
					>
						Delivered
					</TabsTrigger>
					<TabsTrigger
						onClick={() => filterSearch("cancelled")}
						value="cancelled"
					>
						Cancelled
					</TabsTrigger>
					<TabsTrigger
						onClick={() => filterSearch("failed")}
						value="failed"
					>
						Failed
					</TabsTrigger>
				</TabsList>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>OrderID</TableHead>
							{isAdmin && <TableHead>Customer</TableHead>}
							<TableHead>Date</TableHead>
							<TableHead>Price</TableHead>
							<TableHead>Items</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Payment</TableHead>

							<TableHead className="text-right">
								Actions
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{orders.map(
							(
								{
									_id,
									shippingDetails,
									createdAt,
									totalPrice,
									orderItems,
									orderStatus,
									paymentStatus,
								}: any,
								index
							) => (
								<TableRow key={index}>
									<TableCell>
										<Link
											className="hover:underline hover:text-primary"
											href={`/orders/${_id}`}
										>
											{
												// @ts-ignore
											}
											ORD-{_id.slice(-6)}
										</Link>
									</TableCell>
									{isAdmin && (
										<TableCell>
											{shippingDetails.firstName}{" "}
											{shippingDetails.lastName}
										</TableCell>
									)}
									<TableCell>
										{formatDate(createdAt)}
									</TableCell>
									<TableCell>
										₦{formatMoneyInput(totalPrice)}
									</TableCell>
									<TableCell>
										{orderItems.length}{" "}
										{orderItems.length > 1
											? "items"
											: "item"}
									</TableCell>
									<TableCell>
										<Badge
											variant={
												orderStatus === "pending"
													? "warning"
													: orderStatus ===
													  "delivered"
													? "success"
													: orderStatus === "failed"
													? "danger"
													: orderStatus ===
													  "cancelled"
													? "danger"
													: "default"
											}
										>
											{orderStatus === "cancelled" && (
												<Ban />
											)}
											{orderStatus === "delivered" && (
												<CircleCheckBig />
											)}
											{orderStatus === "pending" && (
												<CircleDashed />
											)}
											{orderStatus === "pending"
												? "Undelivered"
												: orderStatus}
										</Badge>
									</TableCell>
									<TableCell>
										<Badge
											variant={
												paymentStatus === "pending"
													? "warning"
													: paymentStatus === "paid"
													? "success"
													: paymentStatus === "failed"
													? "danger"
													: "default"
											}
										>
											{paymentStatus}
										</Badge>
									</TableCell>
									<TableCell className="flex gap-1 items-center justify-end">
										<Button
											size="icon"
											variant={"ghost"}
											asChild
										>
											<Link href={`/orders/${_id}`}>
												<Eye className="size-5 text-primary" />
											</Link>
										</Button>
										<Button
											onClick={() => {
												setOpenCancelModal(true);
												setOrderId(_id);
											}}
											size="icon"
											variant={"ghost"}
											disabled={
												orderStatus === "cancelled"
											}
										>
											<Ban />
										</Button>
									</TableCell>
								</TableRow>
							)
						)}
					</TableBody>
				</Table>
				{orders?.length === 0 && (
					<InformationBox
						variant="pending"
						title="You have no orders."
						icon={CircleOff}
					/>
				)}
			</Tabs>
			{openCancelModal && (
				<CancelOrderModal
					orderId={orderId}
					open={openCancelModal}
					closeModal={() => {
						setOpenCancelModal(false);
					}}
					userId={userId}
				/>
			)}
		</div>
	);
};
