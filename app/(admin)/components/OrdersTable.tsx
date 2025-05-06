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

const invoices = [
	{
		image: "/assets/images/sneakers.jpg",
		name: "Nike Cosmic Unity",
		date: "December 12, 2025",
		price: "₦14,900",
		totalOrder: "35",
	},
	{
		image: "/assets/images/sneakers.jpg",
		name: "Nike Cosmic Unity",
		date: "December 12, 2025",
		price: "₦14,900",
		totalOrder: "35",
	},
	{
		image: "/assets/images/sneakers.jpg",
		name: "Nike Cosmic Unity",
		date: "December 12, 2025",
		price: "₦14,900",
		totalOrder: "35",
	},
	{
		image: "/assets/images/sneakers.jpg",
		name: "Nike Cosmic Unity",
		date: "December 12, 2025",
		price: "₦14,900",
		totalOrder: "35",
	},
];

export const OrdersTable = () => {
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
							{invoices.map(
								(
									{ image, name, price, date, totalOrder },
									index
								) => (
									<TableRow key={index}>
										<TableCell>ORD-35553</TableCell>
										<TableCell>John Smith</TableCell>
										<TableCell>May 4, 2025</TableCell>
										<TableCell>₦14,900</TableCell>
										<TableCell>4</TableCell>
										<TableCell className="text-center">
											<Badge
												className="border-none bg-transparent"
												variant={"success"}
											>
												<CircleCheckBig /> Delivered
											</Badge>
										</TableCell>
										<TableCell className="text-center">
											<Badge
												variant={"success"}
												className="inline-flex px-2 py-1 rounded-full text-xs"
											>
												Paid
											</Badge>
										</TableCell>
										<TableCell className="flex gap-2 items-center justify-end">
											<Eye className="size-5 text-primary" />
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
