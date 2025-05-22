"use client";
import { useState, useEffect } from "react";
import {
	LineChart,
	BarChart,
	PieChart,
	Pie,
	Area,
	AreaChart,
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
import _ from "lodash";
import { CardDescription, CardTitle, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { formatDate, formatMoneyInput } from "@/lib/utils";
import Image from "next/image";
import { DEFAULT_USER_IMAGE } from "@/constants";
import { InformationBox } from "./InformationBox";
import { CircleOff } from "lucide-react";

// Dashboard Overview component
export function OverviewAnalysis({
	ordersData,
	productsData,
	customersData,
}: {
	ordersData: any;
	productsData: any;
	customersData: any;
}) {
	const [revenueData, setRevenueData] = useState([]);
	const [salesOverTime, setSalesOverTime] = useState([]);
	const [topSellingProducts, setTopSellingProducts] = useState([]);
	const [productCategoryDistribution, setProductCategoryDistribution] =
		useState([]);
	const [customerGrowth, setCustomerGrowth] = useState([]);
	const [recentOrders, setRecentOrders] = useState([]);
	const [recentCustomers, setRecentCustomers] = useState([]);
	const [stats, setStats] = useState({
		totalRevenue: 0,
		totalOrders: 0,
		totalCustomers: 0,
		totalProducts: 0,
		averageOrderValue: 0,
		revenueGrowth: 0,
		orderGrowth: 0,
		customerGrowth: 0,
	});

	// Colors for charts
	const COLORS = [
		"#0088FE",
		"#00C49F",
		"#FFBB28",
		"#FF8042",
		"#8884d8",
		"#82ca9d",
		"#ffc658",
	];

	// Process all data when components mount
	useEffect(() => {
		if (ordersData && productsData && customersData) {
			processAllData(ordersData, productsData, customersData);
		}
	}, [ordersData, productsData, customersData]);

	// Process all analytics data
	const processAllData = (orders: any, products: any, customers: any) => {
		if (!orders?.length || !products?.length || !customers?.length) return;

		// Calculate basic stats
		const totalRevenue = _.sumBy(orders, "totalPrice");
		const totalOrders = orders.length;
		const totalCustomers = customers.length;
		const totalProducts = products.length;
		const averageOrderValue = totalRevenue / totalOrders;

		// Calculate growth metrics (comparing this month to last month)
		const now = new Date();
		const thisMonth = now.getMonth();
		const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
		const thisYear = now.getFullYear();
		const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear;

		// This month's orders and revenue
		const thisMonthOrders = orders.filter((order: any) => {
			const date = new Date(order.createdAt);
			return (
				date.getMonth() === thisMonth && date.getFullYear() === thisYear
			);
		});
		const thisMonthRevenue = _.sumBy(thisMonthOrders, "totalPrice");
		const thisMonthOrderCount = thisMonthOrders.length;

		// Last month's orders and revenue
		const lastMonthOrders = orders.filter((order: any) => {
			const date = new Date(order.createdAt);
			return (
				date.getMonth() === lastMonth &&
				date.getFullYear() === lastMonthYear
			);
		});
		const lastMonthRevenue = _.sumBy(lastMonthOrders, "totalPrice");
		const lastMonthOrderCount = lastMonthOrders.length;

		// New customers this month vs last month
		const thisMonthCustomers = customers.filter((customer: any) => {
			const date = new Date(customer.createdAt);
			return (
				date.getMonth() === thisMonth && date.getFullYear() === thisYear
			);
		}).length;

		const lastMonthCustomers = customers.filter((customer: any) => {
			const date = new Date(customer.createdAt);
			return (
				date.getMonth() === lastMonth &&
				date.getFullYear() === lastMonthYear
			);
		}).length;

		// Calculate growth percentages
		const revenueGrowth =
			lastMonthRevenue === 0
				? 100
				: ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) *
				  100;
		const orderGrowth =
			lastMonthOrderCount === 0
				? 100
				: ((thisMonthOrderCount - lastMonthOrderCount) /
						lastMonthOrderCount) *
				  100;
		const custGrowth =
			lastMonthCustomers === 0
				? 100
				: ((thisMonthCustomers - lastMonthCustomers) /
						lastMonthCustomers) *
				  100;

		setStats({
			totalRevenue,
			totalOrders,
			totalCustomers,
			totalProducts,
			averageOrderValue,
			revenueGrowth,
			orderGrowth,
			customerGrowth: custGrowth,
		});

		// Generate monthly revenue data for the past 6 months
		const salesData: any = [];
		for (let i = 5; i >= 0; i--) {
			const d = new Date();
			d.setMonth(d.getMonth() - i);
			const month = d.getMonth();
			const year = d.getFullYear();

			const monthOrders = orders.filter((order: any) => {
				const date = new Date(order.createdAt);
				return date.getMonth() === month && date.getFullYear() === year;
			});

			const revenue = _.sumBy(monthOrders, "totalPrice");
			const orderCount = monthOrders.length;

			salesData.push({
				name: d.toLocaleString("default", { month: "short" }),
				revenue: revenue,
				orders: orderCount,
			});
		}
		setSalesOverTime(salesData);

		// Process revenue data by day for the current month (last 30 days)
		const last30Days: any = [];
		for (let i = 29; i >= 0; i--) {
			const d = new Date();
			d.setDate(d.getDate() - i);

			const dayOrders = orders.filter((order: any) => {
				const date = new Date(order.createdAt);
				return (
					date.getDate() === d.getDate() &&
					date.getMonth() === d.getMonth() &&
					date.getFullYear() === d.getFullYear()
				);
			});

			const revenue = _.sumBy(dayOrders, "totalPrice");

			last30Days.push({
				name: `${d.getDate()}/${d.getMonth() + 1}`,
				revenue: revenue,
			});
		}
		setRevenueData(last30Days);

		// Find top selling products
		const productSales: any = {};
		orders.forEach((order: any) => {
			order.orderItems.forEach((item: any) => {
				const productId = item.product._id || item.product;
				productSales[productId] =
					(productSales[productId] || 0) + item.quantity;
			});
		});

		// Map product sales to product data
		const productsWithSales = products.map((product: any) => ({
			...product,
			salesCount: productSales[product._id] || 0,
		}));

		// Sort by sales and get top 5
		productsWithSales.sort((a: any, b: any) => b.salesCount - a.salesCount);
		setTopSellingProducts(productsWithSales.slice(0, 5));

		// Get product category distribution
		const categories = _.groupBy(products, (product: any) =>
			product.category ? product.category.name : "Uncategorized"
		);

		const categoryData: any = Object.keys(categories).map((category) => ({
			name: category,
			value: categories[category].length,
		}));

		setProductCategoryDistribution(categoryData);

		// Customer growth by month for the past 6 months
		const customerData: any = [];
		for (let i = 5; i >= 0; i--) {
			const d = new Date();
			d.setMonth(d.getMonth() - i);
			const month = d.getMonth();
			const year = d.getFullYear();

			const newCustomers = customers.filter((customer: any) => {
				const date = new Date(customer.createdAt);
				return date.getMonth() === month && date.getFullYear() === year;
			});

			customerData.push({
				name: d.toLocaleString("default", { month: "short" }),
				customers: newCustomers.length,
			});
		}
		setCustomerGrowth(customerData);

		// Get most recent orders
		const sortedOrders: any = [...orders].sort(
			(a: any, b: any) =>
				new Date(b.createdAt).getTime() -
				new Date(a.createdAt).getTime()
		);
		setRecentOrders(sortedOrders.slice(0, 5));

		// Get most recent customers
		const sortedCustomers: any = [...customers].sort(
			(a: any, b: any) =>
				new Date(b.createdAt).getTime() -
				new Date(a.createdAt).getTime()
		);
		setRecentCustomers(sortedCustomers.slice(0, 5));
	};

	return (
		<div className="space-y-6">
			<div className="space-y-2 mb-4">
				<CardTitle>Overview</CardTitle>
				<CardDescription>
					Key metrics and performance indicators
				</CardDescription>
			</div>

			{/* Revenue charts and Sales Over Time */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border space-y-6">
					<CardTitle className="mb-4">
						Revenue Over Time (30 Days)
					</CardTitle>
					<div className="h-64">
						<ResponsiveContainer width="100%" height="100%">
							<AreaChart
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
								<YAxis />
								<Tooltip
									formatter={(value) => [
										`₦${formatMoneyInput(value)}`,
										"Revenue",
									]}
								/>
								<Area
									type="monotone"
									dataKey="revenue"
									stroke="#8884d8"
									fill="#8884d8"
									fillOpacity={0.3}
								/>
							</AreaChart>
						</ResponsiveContainer>
					</div>
				</div>
				<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border space-y-6">
					<CardTitle className="mb-4">
						Sales Performance (6 Months)
					</CardTitle>
					<div className="h-64">
						<ResponsiveContainer width="100%" height="100%">
							<LineChart
								data={salesOverTime}
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
			</div>

			{/* Products and Customers */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border space-y-6">
					<CardTitle className="mb-4">Product Categories</CardTitle>
					<div className="h-64">
						<ResponsiveContainer width="100%" height="100%">
							<PieChart>
								<Pie
									data={productCategoryDistribution}
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
									{productCategoryDistribution.map(
										(entry, index) => (
											<Cell
												key={`cell-${index}`}
												fill={
													COLORS[
														index % COLORS.length
													]
												}
											/>
										)
									)}
								</Pie>
								<Tooltip />
								<Legend />
							</PieChart>
						</ResponsiveContainer>
					</div>
				</div>

				<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border space-y-6">
					<CardTitle className="mb-4">Customer Growth</CardTitle>
					<div className="h-64">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart
								data={customerGrowth}
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
									dataKey="customers"
									fill="#8884d8"
									name="New Customers"
								>
									{customerGrowth.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={COLORS[index % COLORS.length]}
										/>
									))}
								</Bar>
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>
			</div>

			{/* Top Products and Recent Orders Tables */}
			<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border space-y-6">
				<CardTitle className="mb-4">Top Selling Products</CardTitle>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Product</TableHead>
							<TableHead>Category</TableHead>
							<TableHead>Price</TableHead>
							<TableHead className="text-right">Sales</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{topSellingProducts.map((product: any) => (
							<TableRow key={product._id}>
								<TableCell>
									<Link
										href={`/products/${product._id}`}
										className="font-medium flex items-center justify-start  gap-2 group"
									>
										<Image
											src={product.media[0]?.url || ""}
											alt={`${product.name}'s picture`}
											width={1000}
											height={1000}
											className="rounded-full object-cover size-10"
										/>
										<span className="line-clamp-2 group-hover:underline group-hover:text-primary transition-all">
											{product.name}
										</span>
									</Link>
								</TableCell>
								<TableCell>
									{product.category
										? product.category.name
										: "Uncategorized"}
								</TableCell>
								<TableCell>
									₦{formatMoneyInput(product.price)}
								</TableCell>
								<TableCell className="text-right">
									<Badge
										variant={
											product.salesCount > 0
												? "delivered"
												: "outline"
										}
									>
										{product.salesCount}
									</Badge>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				{topSellingProducts?.length === 0 && (
					<InformationBox
						variant="pending"
						title="You have no products in your store."
						icon={CircleOff}
					/>
				)}
			</div>

			<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border space-y-6">
				<CardTitle className="mb-4">Recent Orders</CardTitle>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Order ID</TableHead>
							<TableHead>Customer</TableHead>
							<TableHead>Date</TableHead>
							<TableHead className="text-right">Amount</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{recentOrders.map((order: any) => (
							<TableRow key={order._id}>
								<TableCell>
									<Link
										href={`/orders/${order._id}`}
										className="hover:underline hover:text-primary"
									>
										ORD-{order._id.slice(-6)}
									</Link>
								</TableCell>
								<TableCell>
									{order.shippingDetails
										? `${order.shippingDetails.firstName} ${order.shippingDetails.lastName}`
										: "N/A"}
								</TableCell>
								<TableCell>
									{formatDate(order.createdAt)}
								</TableCell>
								<TableCell className="text-right">
									₦{formatMoneyInput(order.totalPrice)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				{recentOrders?.length === 0 && (
					<InformationBox
						variant="pending"
						title="You have no orders."
						icon={CircleOff}
					/>
				)}
			</div>

			{/* Recent Customers */}
			<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border space-y-6">
				<CardTitle className="mb-4">Recent Customers</CardTitle>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Customer</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Joined</TableHead>
							<TableHead>Role</TableHead>
							<TableHead className="text-right">Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{recentCustomers.map((customer: any) => (
							<TableRow key={customer._id}>
								<TableCell>
									<div className="flex items-center gap-3">
										<Image
											src={
												customer.picture ||
												DEFAULT_USER_IMAGE
											}
											alt={`${customer.firstName}'s picture`}
											width={1000}
											height={1000}
											className="rounded-full object-cover size-10"
										/>
										<span>
											{customer.firstName}{" "}
											{customer.lastName}
										</span>
									</div>
								</TableCell>
								<TableCell>
									<a
										href={`mailto:${customer.email}`}
										className="hover:text-primary hover:underline"
									>
										{customer.email}
									</a>
								</TableCell>
								<TableCell>
									{formatDate(customer.createdAt)}
								</TableCell>
								<TableCell>
									<Badge
										variant={
											customer.isAdmin
												? "delivered"
												: "outline"
										}
									>
										{customer.isAdmin
											? "Admin"
											: "Customer"}
									</Badge>
								</TableCell>
								<TableCell className="text-right">
									<Button variant="ghost" size="sm" asChild>
										<Link
											href={`/customers/${customer._id}`}
										>
											View
										</Link>
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				{recentCustomers?.length === 0 && (
					<InformationBox
						variant="pending"
						title="You have no customers in your store."
						icon={CircleOff}
					/>
				)}
			</div>
		</div>
	);
}
