import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	ArrowUp,
	ArrowDown,
	DollarSign,
	ShoppingBag,
	Users,
	CreditCard,
	TrendingUp,
	Activity,
	Eye,
	Calendar,
	RefreshCw,
} from "lucide-react";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { IOrder } from "@/lib/database/models/order.model";
import { IUser } from "@/lib/database/models/user.model";
import { IProduct } from "@/lib/database/models/product.model";
import { formatMoneyInput } from "@/lib/utils";
export const RecentActivity = ({
	recentOrder,
	newCustomer,
	latestProduct,
}: {
	recentOrder: IOrder;
	newCustomer: IUser;
	latestProduct: IProduct;
}) => {
	return (
		<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border space-y-6 mt-8">
			<div className="flex justify-between">
				<div>
					<CardTitle>Recent Activity</CardTitle>
					<CardDescription>
						Latest transactions and customer activities
					</CardDescription>
				</div>
				<Button variant="outline" size="sm">
					View All
				</Button>
			</div>
			<div className="space-y-8">
				{[
					{
						action: "New order placed",
						details: `Order-${
							recentOrder._id
						} - ₦${formatMoneyInput(recentOrder.totalPrice)}`,
						time: "Just now",
						icon: <ShoppingBag className="h-4 w-4" />,
						status: "new",
					},
					{
						action: "Payment received",
						details: "Invoice #INV-001 - $892.00",
						time: "2 hours ago",
						icon: <CreditCard className="h-4 w-4" />,
						status: "completed",
					},
					{
						action: "New customer registered",
						details: `${newCustomer.firstName} ${newCustomer.lastName} (${newCustomer.email})`,
						time: "5 hours ago",
						icon: <Users className="h-4 w-4" />,
						status: "info",
					},
					{
						action: "Product viewed 24 times",
						details: "Air Max Pro (SKU: AM-PRO-42)",
						time: "Yesterday",
						icon: <Eye className="h-4 w-4" />,
						status: "info",
					},
				].map((item, i) => (
					<div key={i} className="flex items-center">
						<div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
							{item.icon}
						</div>
						<div className="ml-4 space-y-1">
							<p className="text-sm font-medium leading-none">
								{item.action}
							</p>
							<p className="text-sm text-muted-foreground">
								{item.details}
							</p>
						</div>
						<div className="ml-auto flex items-center gap-2">
							<Badge
								variant={
									item.status === "new"
										? "default"
										: item.status === "completed"
										? "black"
										: "secondary"
								}
							>
								{item.status}
							</Badge>
							<span className="text-xs text-muted-foreground">
								{item.time}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
