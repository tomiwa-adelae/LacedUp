"use client";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoonStar, Sun } from "lucide-react";

import { useTheme } from "@/context/ThemeProvider";
import { themes } from "@/constants";
import Image from "next/image";

export function Theme() {
	const { mode, setMode } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size={"icon"} variant="outline">
					{mode === "light" ? (
						<Sun className="size-6" />
					) : (
						<MoonStar className="size-6" />
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{themes.map((item, index) => {
					const Icon = item.icon;
					return (
						<DropdownMenuItem
							className={`dark:text-white text-xs uppercase cursor-pointer dark:hover:bg-primary font-semibold ${
								mode === item.value &&
								"bg-primary text-white dark:bg-primary"
							}`}
							key={index}
							onClick={() => {
								setMode(item.value);
								if (item.value !== "system") {
									localStorage.theme = item.value;
								} else {
									localStorage.removeItem("theme");
								}
							}}
						>
							<Icon className="size-5 dark:text-white" />
							<p>{item.value}</p>
						</DropdownMenuItem>
					);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
