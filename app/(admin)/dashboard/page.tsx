import { CustomerBox } from "../components/CustomerBox";
import { DashboardBox } from "../components/DashboardBox";
import { TopProducts } from "../components/TopProducts";

const page = () => {
	return (
		<div>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				<DashboardBox
					title={"Total Order"}
					number={"1,435"}
					description={"Increase 133% this month"}
					percentage={"7.83%"}
					direction={"up"}
				/>
				<DashboardBox
					title={"Total Products"}
					number={"45"}
					description={"Increase 133% this month"}
					percentage={"7.83%"}
					direction={"down"}
				/>
				<div className="md:col-span-2 lg:col-span-1">
					<DashboardBox
						title={"Total Customers"}
						number={"435"}
						description={"Increase 123% this month"}
						percentage={"7.83%"}
						direction={"down"}
					/>
				</div>
			</div>
			<div className="grid-cols-1 grid gap-4 lg:grid-cols-3 pt-8">
				<TopProducts />
				<div className="col-span-2 md:col-span-1">
					<CustomerBox />
				</div>
			</div>
		</div>
	);
};

export default page;
