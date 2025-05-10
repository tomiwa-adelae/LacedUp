"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ListFilter } from "lucide-react";
import { Separator } from "../ui/separator";
import { TagOptions } from "./TagOptions";
import { FilterComponent, PriceFilter } from "./Filter";
import { useRouter } from "next/navigation";

export function FilterModal({
	tags,
	categoryName,
}: {
	tags: any;
	categoryName: string;
}) {
	const router = useRouter();

	const handleClearFilters = () => {
		const basePath = `${window.location.pathname}?name=${categoryName}`; // keep /category/:id
		router.replace(basePath + "?", { scroll: false });
	};

	return (
		<Dialog>
			<DialogTrigger className="w-full">
				<Button
					size={"md"}
					className="w-full lg:hidden"
					variant="outline"
				>
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
						<TagOptions tags={tags} />
					</FilterComponent>
				</div>
				<Separator className="my-4" />
				<DialogFooter>
					<DialogClose>
						<Button
							className="w-full md:w-auto"
							onClick={handleClearFilters}
							variant={"outline"}
							size={"md"}
						>
							Reset
						</Button>
					</DialogClose>

					<DialogClose>
						<Button className="w-full md:w-auto" size={"md"}>
							Apply
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
