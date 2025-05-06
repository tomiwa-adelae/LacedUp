import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import Link from "next/link";
import { OrdersTable } from "../components/OrdersTable";

const page = () => {
	return (
		<div>
			<div className="flex items-center justify-between gap-8">
				<h2 className="text-lg lg:text-3xl uppercase font-semibold">
					My orders
				</h2>
				<div className="flex items-center justify-center gap-4">
					<Button size="md" asChild variant={"ghost"}>
						<Link href="/products/new">
							<Printer className="size-4" />
							Print
						</Link>
					</Button>
					<Button size="md" asChild>
						<Link href="/products/new">
							<Download className="size-4" />
							Export
						</Link>
					</Button>
				</div>
			</div>
			<OrdersTable />
		</div>
	);
};

export default page;
