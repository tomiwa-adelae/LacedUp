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
import { OrdersAnalysis } from "./OrdersAnalysis";
import { ProductsAnalysis } from "./ProductsAnalysis";
import { IOrder } from "@/lib/database/models/order.model";
import { IProduct } from "@/lib/database/models/product.model";
import { CustomersAnalysis } from "./CustomersAnalysis";
import { IUser } from "@/lib/database/models/user.model";

// Dashboard component for ecommerce analytics
export function AnalyticChart({
	orders,
	products,
	customers,
}: {
	orders: IOrder[];
	products: IProduct[];
	customers: IUser[];
}) {
	return (
		<div className="mt-8">
			<Tabs defaultValue="overview" className="space-y-2">
				<TabsList>
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="products">Products</TabsTrigger>
					<TabsTrigger value="orders">Orders</TabsTrigger>
					<TabsTrigger value="customers">Customers</TabsTrigger>
				</TabsList>

				<TabsContent value="orders" className="space-y-2">
					<OrdersAnalysis ordersData={orders} />
				</TabsContent>
				<TabsContent value="products" className="space-y-2">
					<ProductsAnalysis productsData={products} />
				</TabsContent>
				<TabsContent value="customers" className="space-y-2">
					<CustomersAnalysis
						customersData={customers}
						ordersData={orders}
					/>
				</TabsContent>
			</Tabs>
		</div>
	);
}
