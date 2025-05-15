import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	CircleCheckBig,
	Edit,
	EllipsisVertical,
	Eye,
	Trash,
} from "lucide-react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { IOrder } from "@/lib/database/models/order.model";
import { formatDate, formatMoneyInput } from "@/lib/utils";
import Link from "next/link";

export const OrdersTable = ({ orders }: { orders: IOrder[] }) => {
	return (
		<div className="mt-4">
			<Tabs defaultValue="all" className="space-y-4">
				<TabsList>
					<TabsTrigger value="all">All orders</TabsTrigger>
					<TabsTrigger value="processing">Processing</TabsTrigger>
					<TabsTrigger value="shipped">Shipped</TabsTrigger>
					<TabsTrigger value="delivered">Delivered</TabsTrigger>
					<TabsTrigger value="canceled">Canceled</TabsTrigger>
				</TabsList>
				<TabsContent value="all" className="space-y-4">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>OrderID</TableHead>
								<TableHead>Customer</TableHead>
								<TableHead>Date</TableHead>
								<TableHead>Price</TableHead>
								<TableHead>Items</TableHead>
								<TableHead className="text-center">
									Status
								</TableHead>
								<TableHead className="text-center">
									Payment
								</TableHead>

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
										<TableCell>
											{shippingDetails.firstName}{" "}
											{shippingDetails.lastName}
										</TableCell>
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
										<TableCell className="text-center">
											<Badge
												variant={
													orderStatus === "pending"
														? "warning"
														: orderStatus ===
														  "delivered"
														? "success"
														: orderStatus ===
														  "failed"
														? "danger"
														: "default"
												}
											>
												<CircleCheckBig />{" "}
												{orderStatus === "pending"
													? "Undelivered"
													: orderStatus}
											</Badge>
										</TableCell>
										<TableCell className="text-center">
											<Badge
												variant={
													paymentStatus === "pending"
														? "warning"
														: paymentStatus ===
														  "paid"
														? "success"
														: paymentStatus ===
														  "failed"
														? "danger"
														: "default"
												}
												className="inline-flex px-2 py-1 rounded-full text-xs"
											>
												{paymentStatus}
											</Badge>
										</TableCell>
										<TableCell className="flex gap-2 items-center justify-end">
											<Link href={`/orders/${_id}`}>
												<Eye className="size-5 text-primary" />
											</Link>
											<Edit className="size-5" />
											<Trash className="size-5 text-destructive" />
										</TableCell>
									</TableRow>
								)
							)}
						</TableBody>
					</Table>
				</TabsContent>
			</Tabs>
		</div>
	);
};
