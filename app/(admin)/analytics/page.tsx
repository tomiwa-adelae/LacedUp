import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { CustomersTable } from "../components/CustomersTable";
import { AnalyticBox } from "../components/AnalyticBox";
import { AnalyticChart } from "../components/AnalyticChart";
import { RecentActivity } from "../components/RecentActivty";

const page = () => {
	return (
		<div>
			<div>
				<h2 className="text-lg lg:text-3xl uppercase font-semibold">
					Analytics
				</h2>
				<p className="text-muted-foreground text-sm">
					Get insights into your store's performance and sales
				</p>
			</div>
			<div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				<AnalyticBox
					title={"Total revenue"}
					number={"1,435"}
					description={"Total revenue from all transactions"}
					percentage={"7.83%"}
					direction={"up"}
				/>
				<AnalyticBox
					title={"New customers"}
					number={"1,435"}
					description={"New customers in the month of May"}
					percentage={"7.83%"}
					direction={"up"}
				/>
				<AnalyticBox
					title={"Total orders"}
					number={"1,435"}
					description={"Total orders of all-time"}
					percentage={"7.83%"}
					direction={"up"}
				/>
			</div>
			<AnalyticChart />
			<RecentActivity />
		</div>
	);
};

export default page;
