"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";

const Pagination = ({
	page = 1,
	totalPages,
}: {
	page?: string | number;
	totalPages?: number;
}) => {
	console.log(page);
	const router = useRouter();
	const searchParams = useSearchParams();

	const onClick = (type: string) => {
		const pageValue = type === "next" ? Number(page) + 1 : Number(page) - 1;

		const newUrl = formUrlQuery({
			params: searchParams.toString(),
			key: "page",
			value: pageValue.toString(),
		});

		router.push(newUrl, { scroll: false });
	};

	return (
		<div className="flex items-center justify-between py-4">
			<Button
				variant={"ghost"}
				size="icon"
				disabled={Number(page) <= 1}
				onClick={() => onClick("prev")}
			>
				<ArrowLeft />
			</Button>
			<Button
				variant={"ghost"}
				disabled={Number(page) >= totalPages!}
				onClick={() => onClick("next")}
				size="icon"
			>
				<ArrowRight />
			</Button>
		</div>
	);
};

export default Pagination;
