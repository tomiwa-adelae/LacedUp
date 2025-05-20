"use client";
import { useState, useEffect } from "react";
import {
	LineChart,
	BarChart,
	PieChart,
	Pie,
	Cell,
	ResponsiveContainer,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	Line,
	Bar,
} from "recharts";
import { CircleCheckBig, OctagonPause } from "lucide-react";
import _ from "lodash";
import { CardDescription, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { formatDate, formatMoneyInput } from "@/lib/utils";

// Dashboard component for ecommerce analytics
export function OrdersAnalysis({ ordersData }: { ordersData: any }) {
	// Sample orders data - would be replaced with your actual data
	const [orders, setOrders] = useState([]);
	const [timeframe, setTimeframe] = useState("daily");
	const [revenueData, setRevenueData] = useState([]);
	const [statusData, setStatusData] = useState([]);
	const [paymentMethodData, setPaymentMethodData] = useState([]);
	const [stats, setStats] = useState({
		totalOrders: 0,
		totalRevenue: 0,
		averageOrderValue: 0,
		pendingOrders: 0,
	});

	// Colors for charts
	const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

	// Process the orders data when the component mounts
	useEffect(() => {
		setOrders(ordersData);
		processOrderData(ordersData, timeframe);
	}, []);

	// Re-process data when timeframe changes
	useEffect(() => {
		processOrderData(orders, timeframe);
	}, [timeframe, orders]);

	// Process the orders data into chart-friendly format
	const processOrderData = (orderData: any, selectedTimeframe: any) => {
		if (!orderData || orderData.length === 0) return;

		// Calculate overall stats
		const totalOrders = orderData.length;
		const totalRevenue = _.sumBy(orderData, "totalPrice");
		const averageOrderValue = totalRevenue / totalOrders;
		const pendingOrders = orderData.filter(
			(order: any) => order.orderStatus === "pending"
		).length;

		setStats({
			totalOrders,
			totalRevenue,
			averageOrderValue,
			pendingOrders,
		});

		// Group orders by date according to selected timeframe
		let groupedOrders;

		if (selectedTimeframe === "daily") {
			groupedOrders = _.groupBy(orderData, (order: any) => {
				const date = new Date(order.createdAt);
				return `${date.getFullYear()}-${
					date.getMonth() + 1
				}-${date.getDate()}`;
			});
		} else if (selectedTimeframe === "weekly") {
			groupedOrders = _.groupBy(orderData, (order: any) => {
				const date = new Date(order.createdAt);
				const startOfWeek = new Date(date);
				startOfWeek.setDate(date.getDate() - date.getDay());
				return `Week of ${startOfWeek.getFullYear()}-${
					startOfWeek.getMonth() + 1
				}-${startOfWeek.getDate()}`;
			});
		} else {
			groupedOrders = _.groupBy(orderData, (order: any) => {
				const date = new Date(order.createdAt);
				return `${date.getFullYear()}-${date.getMonth() + 1}`;
			});
		}

		// Create revenue and order count data
		const chartData: any = Object.keys(groupedOrders).map((date) => {
			const orders = groupedOrders[date];
			const revenue = _.sumBy(orders, "totalPrice");
			const orderCount = orders.length;

			return {
				name: date,
				revenue: revenue,
				orders: orderCount,
			};
		});

		// Sort chronologically
		chartData.sort((a: any, b: any) => {
			const dateA: any = new Date(a.name.replace("Week of ", ""));
			const dateB: any = new Date(b.name.replace("Week of ", ""));
			return dateA - dateB;
		});

		setRevenueData(chartData);

		// Create order status data
		const statusGroups = _.groupBy(orderData, "orderStatus");
		const statusChartData: any = Object.keys(statusGroups).map(
			(status) => ({
				name: status.charAt(0).toUpperCase() + status.slice(1),
				value: statusGroups[status].length,
			})
		);

		setStatusData(statusChartData);

		// Create payment method data
		const paymentGroups = _.groupBy(orderData, "paymentMethod");
		const paymentChartData: any = Object.keys(paymentGroups).map(
			(method) => ({
				name: method
					.replace("_", " ")
					.split(" ")
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(" "),
				value: paymentGroups[method].length,
			})
		);

		setPaymentMethodData(paymentChartData);
	};

	return (
		<div>
			<div className="space-y-2 mb-4">
				<CardTitle>Revenue & Orders</CardTitle>
				<CardDescription>
					Monthly revenue and order count over time
				</CardDescription>
			</div>
			<div>
				<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border space-y-6">
					<div className="h-80 mt-8">
						<ResponsiveContainer width="100%" height="100%">
							<LineChart
								data={revenueData}
								margin={{
									top: 5,
									right: 30,
									left: 20,
									bottom: 5,
								}}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis yAxisId="left" />
								<YAxis yAxisId="right" orientation="right" />
								<Tooltip />
								<Legend />
								<Line
									yAxisId="left"
									type="monotone"
									dataKey="revenue"
									stroke="#8884d8"
									activeDot={{ r: 8 }}
									name="Revenue (₦)"
								/>
								<Line
									yAxisId="right"
									type="monotone"
									dataKey="orders"
									stroke="#82ca9d"
									name="Orders"
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>
				</div>
				<div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mt-8">
					<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border space-y-6">
						<CardTitle className="my-2">Payment Methods</CardTitle>
						<div className="h-64">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart
									data={paymentMethodData}
									margin={{
										top: 5,
										right: 30,
										left: 20,
										bottom: 5,
									}}
								>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="name" />
									<YAxis />
									<Tooltip />
									<Legend />
									<Bar
										dataKey="value"
										name="Number of Orders"
										fill="#8884d8"
									>
										{paymentMethodData.map(
											(entry, index) => (
												<Cell
													key={`cell-${index}`}
													fill={
														COLORS[
															index %
																COLORS.length
														]
													}
												/>
											)
										)}
									</Bar>
								</BarChart>
							</ResponsiveContainer>
						</div>
					</div>
					<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border space-y-6">
						<CardTitle className="my-2">
							Order Status Distribution
						</CardTitle>
						<div className="h-80">
							<ResponsiveContainer width="100%" height="100%">
								<PieChart>
									<Pie
										data={statusData}
										cx="50%"
										cy="50%"
										labelLine={true}
										outerRadius={80}
										fill="#8884d8"
										dataKey="value"
										label={({ name, percent }) =>
											`${name}: ${(percent * 100).toFixed(
												0
											)}%`
										}
									>
										{statusData.map((entry, index) => (
											<Cell
												key={`cell-${index}`}
												fill={
													COLORS[
														index % COLORS.length
													]
												}
											/>
										))}
									</Pie>
									<Tooltip />
									<Legend />
								</PieChart>
							</ResponsiveContainer>
						</div>
					</div>
				</div>
				<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border space-y-6 mt-8">
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
								<TableHead className="text-right">
									Payment
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{orders
								.slice(0, 5)
								.map(
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
														orderStatus ===
														"pending"
															? "pending"
															: orderStatus ===
															  "delivered"
															? "delivered"
															: orderStatus ===
															  "shipped"
															? "shipped"
															: orderStatus ===
															  "failed"
															? "danger"
															: "default"
													}
												>
													{orderStatus ===
													"pending" ? (
														<OctagonPause />
													) : (
														<CircleCheckBig />
													)}
													{orderStatus}
												</Badge>
											</TableCell>
											<TableCell className="text-right">
												<Badge
													variant={
														paymentStatus ===
														"pending"
															? "pending"
															: paymentStatus ===
															  "paid"
															? "delivered"
															: paymentStatus ===
															  "failed"
															? "danger"
															: "default"
													}
												>
													{paymentStatus ===
													"pending" ? (
														<OctagonPause />
													) : (
														<CircleCheckBig />
													)}
													{paymentStatus}
												</Badge>
											</TableCell>
										</TableRow>
									)
								)}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
}
