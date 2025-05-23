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
import { Badge } from "@/components/ui/badge";
import { IOrder } from "@/lib/database/models/order.model";
import { formatDate, formatMoneyInput } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CancelOrderModal } from "./CancelOrderModal";
import { InformationBox } from "./InformationBox";

export const RecentOrders = ({
	userId,
	orders,
}: {
	userId: string;
	orders: IOrder[];
}) => {
	const [openCancelModal, setOpenCancelModal] = useState(false);
	const [orderId, setOrderId] = useState("");

	return (
		<div className="mt-4">
			<h4 className="mb-4 uppercase text-base text-muted-foreground font-medium dark:text-gray-200">
				My recent orders
			</h4>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>OrderID</TableHead>
						<TableHead>Date</TableHead>
						<TableHead>Price</TableHead>
						<TableHead>Items</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Payment</TableHead>

						<TableHead className="text-right">Actions</TableHead>
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
								<TableCell>{formatDate(createdAt)}</TableCell>
								<TableCell>
									₦{formatMoneyInput(totalPrice)}
								</TableCell>
								<TableCell>
									{orderItems.length}{" "}
									{orderItems.length > 1 ? "items" : "item"}
								</TableCell>
								<TableCell>
									<Badge
										variant={
											orderStatus === "pending"
												? "warning"
												: orderStatus === "delivered"
												? "success"
												: orderStatus === "failed"
												? "danger"
												: orderStatus === "cancelled"
												? "danger"
												: "default"
										}
									>
										{orderStatus === "cancelled" && <Ban />}
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
										disabled={orderStatus === "cancelled"}
									>
										<Ban />
									</Button>
								</TableCell>
							</TableRow>
						)
					)}
				</TableBody>
			</Table>
			<div className="mt-4">
				{orders?.length === 0 && (
					<InformationBox
						variant="pending"
						title="You have no orders."
						icon={CircleOff}
					/>
				)}
			</div>

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
