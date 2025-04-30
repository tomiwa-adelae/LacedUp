"use client";
import { navLinks } from "@/constants";
import Link from "next/link";
import { SearchBar } from "../forms/SearchBar";
import Logo from "./Logo";
import { Button } from "../ui/button";
import { Theme } from "./Theme";

export const Header = () => {
	return (
		<header className="fixed w-full flex items-center justify-center h-20 dark:bg-black dark:text-white">
			<div className="container flex items-center justify-center gap-8">
				<Logo />
				<div className="flex-1 flex items-center justify-center gap-8">
					<SearchBar />
					<nav className="flex items-center justify-end gap-6">
						{navLinks.map((link, idx) => (
							<Link
								key={idx}
								href={link.slug}
								className="uppercase text-sm font-medium hover:text-primary transition-all"
							>
								{link.label}
							</Link>
						))}
						<Theme />
						<Button className="hidden md:flex" asChild size={"md"}>
							<Link href="/contact">Contact us</Link>
						</Button>
					</nav>
				</div>
			</div>
		</header>
	);
};
