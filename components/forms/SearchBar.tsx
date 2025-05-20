"use client";
import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function SearchBar() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const initialQuery = searchParams.get("query") || "";
	const [query, setQuery] = useState("");

	// Load the current query param into state on first render or when searchParams changes
	useEffect(() => {
		const urlQuery = searchParams.get("query") || "";
		setQuery(urlQuery);
	}, [searchParams]);

	// useEffect(() => {
	// 	const delayDebounceFn = setTimeout(() => {
	// 		let newUrl = "";

	// 		if (query) {
	// 			newUrl = formUrlQuery({
	// 				params: searchParams.toString(),
	// 				key: "query",
	// 				value: query,
	// 			});
	// 		} else {
	// 			newUrl = removeKeysFromQuery({
	// 				params: searchParams.toString(),
	// 				keysToRemove: ["query"],
	// 			});
	// 		}

	// 		router.push(newUrl, { scroll: false });
	// 	}, 3000);
	// 	return () => clearTimeout(delayDebounceFn);
	// }, [query, searchParams, router]);

	// Debounced update to URL when query changes
	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			const params = new URLSearchParams(searchParams.toString());

			if (query) {
				params.set("query", query);
			} else {
				params.delete("query");
			}

			// Build a clean URL with pathname + query string
			const newUrl = `${pathname}?${params.toString()}`;
			router.push(newUrl, { scroll: false });
		}, 500);

		return () => clearTimeout(delayDebounceFn);
	}, [query]);

	return (
		<div className="hidden md:block relative w-full max-w-lg">
			<Search className="absolute top-[50%] left-3 translate-y-[-50%] text-muted-foreground size-5" />
			<Input
				className="pl-8 rounded-full dark:border-white border-2"
				placeholder="Search for shoes..."
				onChange={(e) => setQuery(e.target.value)}
			/>
		</div>
	);
}
