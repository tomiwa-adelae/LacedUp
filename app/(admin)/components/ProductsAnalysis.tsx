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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
export function ProductsAnalysis({ productsData }: { productsData: any }) {
	const [products, setProducts] = useState([]);
	const [timeframe, setTimeframe] = useState("daily");
	const [colorDistribution, setColorDistribution] = useState([]);
	const [priceRanges, setPriceRanges] = useState([]);
	const [stats, setStats] = useState({
		totalProducts: 0,
		totalOrders: 0,
		avgPrice: 0,
		topCategory: "",
		popularColor: "",
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

	// Process the product data when the component mounts
	useEffect(() => {
		if (productsData && productsData.length) {
			setProducts(productsData);
			processProductData(productsData);
		}
	}, [productsData]);

	// Process the product data into chart-friendly format
	const processProductData = (productData: any) => {
		if (!productData || productData.length === 0) return;

		// Calculate overall stats
		const totalProducts = productData.length;
		const totalOrders = _.sumBy(productData, "totalOrders");
		const avgPrice = _.meanBy(productData, (product: any) =>
			Number(product.price)
		);

		// Process colors from all products
		const allColors: any = [];
		productData.forEach((product: any) => {
			if (product.availableColors && product.availableColors.length) {
				product.availableColors.forEach((color: any) => {
					allColors.push(color.name);
				});
			}
		});

		// Count color frequencies
		const colorCounts = _.countBy(allColors);
		const colorData: any = Object.keys(colorCounts).map((color) => ({
			name: color,
			value: colorCounts[color],
		}));

		// Sort by frequency and get most popular
		colorData.sort((a: any, b: any) => b.value - a.value);
		const popularColor = colorData.length > 0 ? colorData[0].name : "None";

		// Get category distribution
		const categoryGroups = _.groupBy(productData, (product) =>
			product.category ? product.category.name : "Uncategorized"
		);
		const categoryData = Object.keys(categoryGroups).map((category) => ({
			name: category,
			value: categoryGroups[category].length,
		}));

		// Sort by frequency and get top category
		categoryData.sort((a, b) => b.value - a.value);
		const topCategory =
			categoryData.length > 0 ? categoryData[0].name : "None";

		// Create price range distribution
		const priceRanges = [
			{ range: "₦0 - ₦5,000", min: 0, max: 5000, count: 0 },
			{ range: "₦5,001 - ₦10,000", min: 5001, max: 10000, count: 0 },
			{ range: "₦10,001 - ₦20,000", min: 10001, max: 20000, count: 0 },
			{ range: "₦20,001 - ₦30,000", min: 20001, max: 30000, count: 0 },
			{ range: "₦30,001+", min: 30001, max: Infinity, count: 0 },
		];

		productData.forEach((product: any) => {
			const price = Number(product.price);
			const rangeIndex = priceRanges.findIndex(
				(range) => price >= range.min && price <= range.max
			);
			if (rangeIndex !== -1) {
				priceRanges[rangeIndex].count++;
			}
		});

		const priceRangeData: any = priceRanges.map((range) => ({
			name: range.range,
			value: range.count,
		}));

		// Set all the processed data to state
		setStats({
			totalProducts,
			totalOrders,
			avgPrice,
			topCategory,
			popularColor,
		});

		setColorDistribution(colorData);
		setPriceRanges(priceRangeData);
	};

	// Sort products by most ordered
	const sortedProducts = [...products].sort(
		(a: any, b: any) => b.totalOrders - a.totalOrders
	);

	return (
		<div>
			<div className="space-y-2 mb-4">
				<CardTitle>Price Distribution</CardTitle>
				<CardDescription>Products by price range</CardDescription>
			</div>
			<div>
				<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border space-y-6">
					{/* <div className="flex space-x-1">
						<Button
							variant={
								timeframe === "daily" ? "default" : "outline"
							}
							size={"md"}
							className={`rounded-lg`}
							onClick={() => setTimeframe("daily")}
						>
							Daily
						</Button>
						<Button
							size={"md"}
							variant={
								timeframe === "weekly" ? "default" : "outline"
							}
							className={`rounded-lg`}
							onClick={() => setTimeframe("weekly")}
						>
							Weekly
						</Button>
						<Button
							size={"md"}
							variant={
								timeframe === "monthly" ? "default" : "outline"
							}
							className={`rounded-lg`}
							onClick={() => setTimeframe("monthly")}
						>
							Monthly
						</Button>
					</div> */}
					<div className="h-80 mt-8">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart
								data={priceRanges}
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
									name="Number of Products"
									fill="#8884d8"
								>
									{priceRanges.map((entry, index) => (
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

				<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border space-y-6 mt-8">
					<CardTitle className="my-2">Color Distribution</CardTitle>
					<div className="h-64 mt-4">
						<ResponsiveContainer width="100%" height="100%">
							<PieChart>
								<Pie
									data={colorDistribution}
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
									{colorDistribution.map((entry, index) => (
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
				<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-lg dark:border space-y-6 mt-8">
					<Table className="mt-4">
						<TableHeader>
							<TableRow>
								<TableHead>Product Name</TableHead>
								<TableHead>Category</TableHead>
								<TableHead>Price</TableHead>
								<TableHead>Colors</TableHead>
								<TableHead className="text-right">
									Orders
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{sortedProducts.map((product: any) => (
								<TableRow key={product._id}>
									<TableCell>
										<Link
											className="hover:underline hover:text-primary"
											href={`/products/${product._id}`}
										>
											{product.name}
										</Link>
									</TableCell>
									<TableCell className="capitalize">
										{product.category
											? product.category.name
											: "Uncategorized"}
									</TableCell>
									<TableCell>
										₦{formatMoneyInput(product.price)}
									</TableCell>
									<TableCell>
										<div className="flex flex-wrap gap-1">
											{product.availableColors &&
												product.availableColors.map(
													(
														color: any,
														index: any
													) => (
														<div
															key={color._id}
															className="h-4 w-4 rounded-full border"
															style={{
																backgroundColor:
																	color.colorCode,
															}}
															title={color.name}
														/>
													)
												)}
										</div>
									</TableCell>
									<TableCell className="text-right">
										<Badge
											variant={
												product.totalOrders > 0
													? "delivered"
													: "pending"
											}
										>
											{product.totalOrders}
										</Badge>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
}
