"use client";

import _ from "lodash";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrdersAnalysis } from "./OrdersAnalysis";
import { ProductsAnalysis } from "./ProductsAnalysis";
import { IOrder } from "@/lib/database/models/order.model";
import { IProduct } from "@/lib/database/models/product.model";
import { CustomersAnalysis } from "./CustomersAnalysis";
import { OverviewAnalysis } from "./OverviewAnalysis";
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

				<TabsContent value="overview" className="space-y-2">
					<OverviewAnalysis
						ordersData={orders}
						productsData={products}
						customersData={customers}
					/>
				</TabsContent>
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
