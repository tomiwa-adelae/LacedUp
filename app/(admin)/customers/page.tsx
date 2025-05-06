import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { CustomersTable } from "../components/CustomersTable";

const page = () => {
	return (
		<div>
			<div className="flex items-center justify-between gap-8">
				<h2 className="text-lg lg:text-3xl uppercase font-semibold">
					My Customers
				</h2>

				<Button size="md" asChild variant={"ghost"}>
					<Link href="/products/new">
						<Plus className="size-4" /> New
					</Link>
				</Button>
			</div>
			<CustomersTable />
		</div>
	);
};

export default page;
