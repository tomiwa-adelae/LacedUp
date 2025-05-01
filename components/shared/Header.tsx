"use client";
import { navLinks } from "@/constants";
import Link from "next/link";
import { SearchBar } from "../forms/SearchBar";
import Logo from "./Logo";
import { Button } from "../ui/button";
import { Theme } from "./Theme";
import { MobileNavbar } from "./MobileNavbar";

export const Header = () => {
	return (
		<header className="fixed w-full flex items-center justify-center h-20 dark:bg-black dark:text-white z-50 bg-white text-black">
			<div className="container flex items-center justify-center gap-2 lg:gap-8">
				<Logo hide />
				<div className="flex-1 flex items-center justify-center gap-2 lg:gap-8">
					<SearchBar />
					<nav className="hidden lg:flex items-center justify-end gap-6">
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
					</nav>
					<Button className="hidden md:flex" asChild size={"md"}>
						<Link href="/contact">Contact us</Link>
					</Button>
					<div className="md:hidden">
						<MobileNavbar />
					</div>
				</div>
			</div>
		</header>
	);
};
