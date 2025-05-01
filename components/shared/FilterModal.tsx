import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ListFilter } from "lucide-react";
import { Separator } from "../ui/separator";
import { TagOptions } from "./TagOptions";
import { FilterComponent, PriceFilter } from "./Filter";

export function FilterModal() {
	return (
		<div className="lg:hidden">
			<Dialog>
				<DialogTrigger asChild className="lg:hidden">
					<Button size={"md"} className="w-full" variant="outline">
						Filter <ListFilter />
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<div>
						<div className="flex items-center justify-between gap-8 mb-4">
							<h2 className="text-xl md:text-2xl uppercase font-semibold">
								Filter
							</h2>
						</div>
						<Separator />
						<FilterComponent title="Price">
							<PriceFilter />
						</FilterComponent>
						<Separator className="my-4" />
						<FilterComponent title="tags">
							<TagOptions />
						</FilterComponent>
					</div>
					<Separator className="my-4" />
					<DialogFooter>
						<Button variant={"outline"} size={"md"}>
							Reset
						</Button>
						<Button size={"md"} type="submit">
							Apply
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
