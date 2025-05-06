"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	LineChart,
	Line,
	BarChart,
	Bar,
	PieChart,
	Pie,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

// Sample data
const revenueData = [
	{ name: "Jan", revenue: 3400, orders: 120 },
	{ name: "Feb", revenue: 3000, orders: 100 },
	{ name: "Mar", revenue: 4500, orders: 150 },
	{ name: "Apr", revenue: 4100, orders: 135 },
	{ name: "May", revenue: 5200, orders: 170 },
	{ name: "Jun", revenue: 5000, orders: 165 },
	{ name: "Jul", revenue: 6100, orders: 190 },
];
const categoryPerformance = [
	{ name: "Running", sales: 12500 },
	{ name: "Casual", sales: 9800 },
	{ name: "Sports", sales: 8700 },
	{ name: "Formal", sales: 5600 },
	{ name: "Kids", sales: 4300 },
];

const topProductsData = [
	{ name: "Air Max Pro", value: 1200, color: "#0088FE" },
	{ name: "Running Elite", value: 900, color: "#00C49F" },
	{ name: "Casual Comfort", value: 850, color: "#FFBB28" },
	{ name: "Urban Stride", value: 780, color: "#FF8042" },
	{ name: "Trail Blazer", value: 720, color: "#8884d8" },
];
export const AnalyticChart = () => {
	return (
		<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border space-y-6 mt-8">
			<Tabs defaultValue="overview" className="space-y-4">
				<TabsList>
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="products">Products</TabsTrigger>
					<TabsTrigger value="customers">Customers</TabsTrigger>
				</TabsList>

				<TabsContent value="overview" className="space-y-4">
					{/* Revenue & Orders Chart */}
					<CardTitle>Revenue & Orders</CardTitle>
					<CardDescription>
						Monthly revenue and order count over time
					</CardDescription>
					<div className="h-80">
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
									name="Revenue ($)"
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

					{/* Sales by Category */}
					<div className="grid gap-4 md:grid-cols-2">
						<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-8 py-8 rounded-lg dark:border space-y-6">
							<CardTitle>Sales by Category</CardTitle>
							<CardDescription>
								Top performing product categories
							</CardDescription>

							<div className="h-64">
								<ResponsiveContainer width="100%" height="100%">
									<BarChart
										data={categoryPerformance}
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
										<Bar
											dataKey="sales"
											fill="#F97316"
											name="Sales ($)"
										/>
									</BarChart>
								</ResponsiveContainer>
							</div>
						</div>
						{/* Top Products Chart */}
						<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-8 py-8 rounded-lg dark:border space-y-6">
							<CardTitle>Top Selling Products</CardTitle>
							<CardDescription>
								Best performing products by sales
							</CardDescription>
							<div className="h-64">
								<ResponsiveContainer width="100%" height="100%">
									<PieChart>
										<Pie
											data={topProductsData}
											cx="50%"
											cy="50%"
											labelLine={false}
											label={({ name, percent }) =>
												`${name}: ${(
													percent * 100
												).toFixed(0)}%`
											}
											outerRadius={80}
											fill="#8884d8"
											dataKey="value"
										>
											{topProductsData.map(
												(entry, index) => (
													<Cell
														key={`cell-${index}`}
														fill={entry.color}
													/>
												)
											)}
										</Pie>
										<Tooltip />
									</PieChart>
								</ResponsiveContainer>
							</div>
						</div>{" "}
					</div>
				</TabsContent>

				<TabsContent value="products" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Product Performance</CardTitle>
							<CardDescription>
								Detailed analysis of your product catalog
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="text-center p-12 text-muted-foreground">
								<p>Product analytics content goes here</p>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="customers" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Customer Insights</CardTitle>
							<CardDescription>
								Understand your customer behavior
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="text-center p-12 text-muted-foreground">
								<p>Customer analytics content goes here</p>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
};
