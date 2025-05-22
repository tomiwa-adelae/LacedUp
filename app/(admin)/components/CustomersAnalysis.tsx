"use client";
import { useState, useEffect } from "react";
import {
	PieChart,
	Pie,
	Cell,
	LineChart,
	Line,
	ResponsiveContainer,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
} from "recharts";
import _ from "lodash";
import { CardDescription, CardTitle } from "@/components/ui/card";
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
import { formatDate } from "@/lib/utils";
import { IUser } from "@/lib/database/models/user.model";
import Image from "next/image";
import { DEFAULT_USER_IMAGE } from "@/constants";
import { InformationBox } from "./InformationBox";
import { CircleOff } from "lucide-react";

export function CustomersAnalysis({
	customersData,
	ordersData,
}: {
	ordersData: any;
	customersData: IUser[];
}) {
	const [customers, setCustomers] = useState([]);
	const [signupTrend, setSignupTrend] = useState([]);
	const [customersByMonth, setCustomersByMonth] = useState([]);
	const [adminDistribution, setAdminDistribution] = useState([]);
	const [topCustomers, setTopCustomers] = useState([]);
	const [customerOrderCounts, setCustomerOrderCounts] = useState({});
	const [stats, setStats] = useState({
		totalCustomers: 0,
		newCustomersThisMonth: 0,
		averageCustomerAge: 0,
		activeAdmins: 0,
	});

	// Colors for charts
	const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

	// Process the customer data when the component mounts
	useEffect(() => {
		if (customersData && customersData.length) {
			processCustomerData(customersData, ordersData);
		}
	}, [customersData, ordersData]);

	// Process the customer data into chart-friendly format
	const processCustomerData = (customerData: any, orderData: any = []) => {
		if (!customerData || customerData.length === 0) return;

		// Calculate overall stats
		const totalCustomers = customerData.length;

		// Count admins
		const admins = customerData.filter(
			(customer: any) => customer.isAdmin === true
		);
		const activeAdmins = admins.length;

		// Calculate new customers this month
		const now: any = new Date();
		const thisMonth = now.getMonth();
		const thisYear = now.getFullYear();
		const newCustomersThisMonth = customerData.filter((customer: any) => {
			const createdDate = new Date(customer.createdAt);
			return (
				createdDate.getMonth() === thisMonth &&
				createdDate.getFullYear() === thisYear
			);
		}).length;

		// Calculate average customer account age in days
		const totalAge = customerData.reduce((sum: any, customer: any) => {
			const createdDate: any = new Date(customer.createdAt);
			const ageInDays = Math.floor(
				(now - createdDate) / (1000 * 60 * 60 * 24)
			);
			return sum + ageInDays;
		}, 0);
		const averageCustomerAge = Math.round(totalAge / totalCustomers);

		// Set the stats
		setStats({
			totalCustomers,
			newCustomersThisMonth,
			averageCustomerAge,
			activeAdmins,
		});

		// Admin vs Regular Users distribution
		const adminData: any = [
			{ name: "Admins", value: activeAdmins },
			{ name: "Regular Users", value: totalCustomers - activeAdmins },
		];
		setAdminDistribution(adminData);

		// Calculate customer signups by month for the past year
		const pastYear = new Date();
		pastYear.setFullYear(pastYear.getFullYear() - 1);

		// Group customers by month of signup
		const customersByMonth = _.groupBy(customerData, (customer) => {
			const date = new Date(customer.createdAt);
			return `${date.getFullYear()}-${date.getMonth() + 1}`;
		});

		// Create an array for the past 12 months
		const monthsData: any = [];
		for (let i = 0; i < 12; i++) {
			const d = new Date();
			d.setMonth(d.getMonth() - i);
			const yearMonth = `${d.getFullYear()}-${d.getMonth() + 1}`;
			monthsData.unshift({
				name: `${d.toLocaleString("default", {
					month: "short",
				})} ${d.getFullYear()}`,
				signups: customersByMonth[yearMonth]
					? customersByMonth[yearMonth].length
					: 0,
			});
		}

		setSignupTrend(monthsData);

		// Count orders per customer
		const orderCounts: any = {};

		if (orderData && orderData.length) {
			orderData.forEach((order: any) => {
				// Access the user ID correctly based on the data structure
				const userId = order.user._id || order.user;
				orderCounts[userId] = (orderCounts[userId] || 0) + 1;
			});
		}

		setCustomerOrderCounts(orderCounts);

		// Find top customers by order count
		const customersWithOrders = customerData.map((customer: any) => ({
			...customer,
			orderCount: orderCounts[customer._id] || 0,
			totalSpent: calculateTotalSpent(customer._id, orderData),
		}));

		// Sort by order count
		customersWithOrders.sort(
			(a: any, b: any) => b.orderCount - a.orderCount
		);
		setTopCustomers(customersWithOrders.slice(0, 10));

		// Update customers state with order counts
		setCustomers(customersWithOrders);
	};

	// Calculate total amount spent by a customer
	const calculateTotalSpent = (customerId: any, orders: any) => {
		if (!orders || !orders.length) return 0;

		// Filter orders by customer ID, handling both direct ID and nested object cases
		const customerOrders = orders.filter((order: any) => {
			const orderUserId = order.user._id || order.user;
			return orderUserId === customerId;
		});

		return customerOrders.reduce(
			(total: any, order: any) => total + (Number(order.totalPrice) || 0),
			0
		);
	};

	return (
		<div>
			<div className="space-y-2 mb-4">
				<CardTitle>Customer Growth</CardTitle>
				<CardDescription>New customer signups by month</CardDescription>
			</div>
			<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border">
				<div className="h-64 mt-4">
					<ResponsiveContainer width="100%" height="100%">
						<LineChart
							data={signupTrend}
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
							<Line
								type="monotone"
								dataKey="signups"
								stroke="#8884d8"
								activeDot={{ r: 8 }}
								name="New Signups"
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</div>
			<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border mt-8">
				<CardTitle className="my-2">User roles</CardTitle>
				<div className="h-64 mt-4">
					<ResponsiveContainer width="100%" height="100%">
						<PieChart>
							<Pie
								data={adminDistribution}
								cx="50%"
								cy="50%"
								labelLine={true}
								outerRadius={80}
								fill="#8884d8"
								dataKey="value"
								label={({ name, percent }) =>
									`${name}: ${(percent * 100).toFixed(0)}%`
								}
							>
								{adminDistribution.map((entry, index) => (
									<Cell
										key={`cell-${index}`}
										fill={COLORS[index % COLORS.length]}
									/>
								))}
							</Pie>
							<Tooltip />
							<Legend />
						</PieChart>
					</ResponsiveContainer>
				</div>
			</div>

			<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border mt-8">
				<CardTitle className="my-2">My customers</CardTitle>
				<Table className="mt-4">
					<TableHeader>
						<TableRow>
							<TableHead>Customer</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Joined</TableHead>
							<TableHead>Role</TableHead>
							<TableHead className="text-right">Orders</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{customers
							.sort(
								(a: any, b: any) =>
									// @ts-ignore
									new Date(b.createdAt) -
									// @ts-ignore
									new Date(a.createdAt)
							)
							.map((customer: any) => (
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
											<Link
												className="hover:underline hover:text-primary"
												href={`/customers/${customer._id}`}
											>
												{customer.firstName}{" "}
												{customer.lastName}
											</Link>
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
										<Badge
											variant={
												customer.orderCount > 0
													? "delivered"
													: "pending"
											}
										>
											{customer.orderCount || 0}
										</Badge>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
				<div className="mt-4">
					{customers?.length === 0 && (
						<InformationBox
							variant="pending"
							title="You have no customers in your store."
							icon={CircleOff}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
