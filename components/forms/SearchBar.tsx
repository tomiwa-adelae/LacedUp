"use client";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function SearchBar() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [query, setQuery] = useState("");

	useEffect(() => {
		const urlQuery = searchParams.get("query") || "";
		setQuery(urlQuery);
	}, [searchParams]);

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
