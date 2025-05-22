"use client";
import { Footprints, ShoppingBag, Users } from "lucide-react";
import { DashboardBox } from "./DashboardBox";

interface Props {
	products: any;
	orders: any;
	customers: any;
}

export const DashboardBoxes = ({ orders, products, customers }: Props) => {
	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			<DashboardBox
				title={"Total Order"}
				number={orders?.length}
				description={"These are your total orders"}
				icon={ShoppingBag}
			/>
			<DashboardBox
				title={"Total Products"}
				number={products?.length}
				description={"These are the total products you have"}
				icon={Footprints}
			/>
			<div className="md:col-span-2 lg:col-span-1">
				<DashboardBox
					title={"Total Customers"}
					number={customers?.length}
					description={"These are the total customers you have"}
					icon={Users}
				/>
			</div>
		</div>
	);
};
