"use client";
import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function SearchBar() {
	const [query, setQuery] = useState("");

	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			let newUrl = "";

			if (query) {
				newUrl = formUrlQuery({
					params: searchParams.toString(),
					key: "query",
					value: query,
				});
			} else {
				newUrl = removeKeysFromQuery({
					params: searchParams.toString(),
					keysToRemove: ["query"],
				});
			}

			router.push(newUrl, { scroll: false });
		}, 3000);
		return () => clearTimeout(delayDebounceFn);
	}, [query, searchParams, router]);

	return (
		<div className="relative w-full">
			<Search className="absolute top-[50%] left-3 translate-y-[-50%] text-muted-foreground size-5" />
			<Input
				className="pl-8 rounded-full dark:border-white border-2"
				placeholder="Search for shoes..."
				onChange={(e) => setQuery(e.target.value)}
			/>
		</div>
	);
}
