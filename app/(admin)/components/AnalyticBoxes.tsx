"use client";
import { IOrder } from "@/lib/database/models/order.model";
import { AnalyticBox } from "./AnalyticBox";
import { useEffect, useState } from "react";
import { IUser } from "@/lib/database/models/user.model";
import { formatMoneyInput } from "@/lib/utils";
import {
	Wallet,
	ShoppingBag,
	Users,
	TrendingUp,
	Package,
	Calendar,
	ArrowUpRight,
	ArrowDownRight,
} from "lucide-react";

export const AnalyticBoxes = ({
	orders,
	customers,
}: {
	orders: IOrder[];
	customers: IUser[];
}) => {
	const [analytics, setAnalytics] = useState<any>({
		totalOrders: 0,
		newOrdersLastMonth: 0,
		newOrdersPercentage: 0,
		totalRevenue: 0,
		revenueGrowth: 0,
		paymentMethodStats: {},
		ordersByDate: [],
		isPaidPercentage: 0,
		totalCustomers: 0,
		newCustomersLastMonth: 0,
		newCustomersPercentage: 0,
	});

	useEffect(() => {
		if (!orders || orders.length === 0) return;

		// Calculate the date one month ago
		const today = new Date();
		const oneMonthAgo = new Date();
		oneMonthAgo.setMonth(today.getMonth() - 1);

		// Filter orders from the last month
		const ordersLastMonth = orders.filter((order) => {
			const orderDate = new Date(order.createdAt);
			return orderDate >= oneMonthAgo;
		});

		// Calculate percentage of new orders in the last month
		const newOrdersPercentage =
			(ordersLastMonth.length / orders.length) * 100;

		// Calculate total revenue
		const totalRevenue = orders.reduce(
			(sum, order) => sum + order.itemsPrice,
			0
		);

		// Calculate revenue from last month
		const lastMonthRevenue = ordersLastMonth.reduce(
			(sum, order) => sum + order.itemsPrice,
			0
		);

		// Calculate revenue growth percentage
		const previousMonthRevenue = totalRevenue - lastMonthRevenue;
		const revenueGrowth =
			previousMonthRevenue === 0
				? 100
				: ((lastMonthRevenue - previousMonthRevenue) /
						previousMonthRevenue) *
				  100;

		// Payment method statistics
		const paymentMethodStats = orders.reduce((stats: any, order) => {
			const method = order.paymentMethod.replace("*", "_");
			stats[method] = (stats[method] || 0) + 1;
			return stats;
		}, {});

		// Calculate percentage of paid orders
		const paidOrders = orders.filter((order) => order.isPaid).length;
		const isPaidPercentage = (paidOrders / orders.length) * 100;

		// Group orders by date for chart
		const ordersByDate: any = [];
		const dateGroups: any = orders.reduce((groups: any, order: any) => {
			const date: any = new Date(order.createdAt).toLocaleDateString();
			groups[date] = (groups[date] || 0) + 1;
			return groups;
		}, {});

		// Convert to chart format
		Object.entries(dateGroups).forEach(([date, count]) => {
			ordersByDate.push({ date, orders: count });
		});

		// Sort by date
		ordersByDate.sort(
			// @ts-ignore
			(a: any, b: any) => new Date(a.date) - new Date(b.date)
		);

		// Filter customers from the last month
		const customersLastMonth = customers.filter((customer: any) => {
			const signupDate = new Date(customer.createdAt);
			return signupDate >= oneMonthAgo;
		});

		// Calculate percentage of new customers in the last month
		const newCustomersPercentage =
			(customersLastMonth.length / customers.length) * 100;

		// Calculate admin percentage
		const adminUsers = customers.filter(
			(customer) => customer.isAdmin
		).length;
		const adminPercentage = (adminUsers / customers.length) * 100;

		// Group signups by date for chart
		const signupsByDate: any = [];

		// Convert to chart format
		Object.entries(dateGroups).forEach(([date, count]) => {
			signupsByDate.push({ date, signups: count });
		});

		// Sort by date
		signupsByDate.sort(
			// @ts-ignore
			(a: any, b: any) => new Date(a.date) - new Date(b.date)
		);

		// Calculate average daily signups for the last month
		const daysInMonth =
			Object.keys(dateGroups).filter((date) => {
				return new Date(date) >= oneMonthAgo;
			}).length || 1; // Avoid division by zero

		setAnalytics({
			totalOrders: orders.length,
			newOrdersLastMonth: ordersLastMonth.length,
			newOrdersPercentage: newOrdersPercentage.toFixed(2),
			totalRevenue,
			revenueGrowth: revenueGrowth.toFixed(2),
			paymentMethodStats,
			ordersByDate,
			isPaidPercentage: isPaidPercentage.toFixed(2),
			totalCustomers: customers.length,
			newCustomersLastMonth: customersLastMonth.length,
			newCustomersPercentage: newCustomersPercentage.toFixed(2),
			adminPercentage: adminPercentage.toFixed(2),
			signupsByDate,
		});
	}, [orders]);

	// Format date range for display
	const formatDateRange = () => {
		const today = new Date();
		const oneMonthAgo = new Date();
		oneMonthAgo.setMonth(today.getMonth() - 1);

		return `${oneMonthAgo.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
		})} - ${today.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
		})}`;
	};

	return (
		<div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			<AnalyticBox
				title={"Total revenue"}
				number={`₦${formatMoneyInput(analytics.totalRevenue)}`}
				description="Revenue from all orders"
				percentage={analytics.revenueGrowth}
				direction={
					// @ts-ignore
					parseFloat(analytics?.revenueGrowth) >= 0 ? "up" : "down"
				}
				dateRange={formatDateRange()}
				icon={Wallet}
			/>
			<AnalyticBox
				title={"New customers"}
				number={analytics.newCustomersLastMonth}
				description="New sign-ups in the last month"
				percentage={analytics.newCustomersPercentage}
				direction={
					// @ts-ignore
					parseFloat(analytics?.newCustomersPercentage) >= 0
						? "up"
						: "down"
				}
				dateRange={formatDateRange()}
				icon={Users}
			/>
			<AnalyticBox
				title="New Orders"
				description="New orders in the last month"
				number={analytics.newOrdersLastMonth}
				percentage={analytics.newOrdersPercentage}
				direction={
					// @ts-ignore
					parseFloat(analytics.newOrdersPercentage) >= 0
						? "up"
						: "down"
				}
				dateRange={formatDateRange()}
				icon={ShoppingBag}
			/>
		</div>
	);
};
