"use client";
import Logo from "./Logo";
import Link from "next/link";
import { Theme } from "./Theme";
import { Button } from "../ui/button";
import { CartCount } from "./CartCount";
import { SearchBar } from "../forms/SearchBar";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { ProfileDropdown } from "./ProfileDropdown";
import { IUser } from "@/lib/database/models/user.model";
import { MobileNavbar } from "./MobileNavbar";

export const Header = ({
	user,
	search,
}: {
	user?: IUser;
	search?: boolean;
}) => {
	return (
		<header className="fixed top-0 w-full border-b flex items-center justify-center h-20 dark:bg-black dark:text-white z-50 bg-white text-black">
			<div className="container flex items-center justify-center gap-2 lg:gap-8">
				<Logo hide />
				{search && <SearchBar />}
				<div className="flex-1 flex items-center justify-start gap-2 lg:gap-8">
					{/* <nav className="hidden lg:flex items-center justify-end gap-6">
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
					</nav> */}
				</div>
				<div className="flex items-center justify-end gap-4">
					<Theme />
					<CartCount />
					<SignedIn>
						<ProfileDropdown user={user} />
					</SignedIn>
					<SignedOut>
						<Button className="hidden md:flex" asChild size={"md"}>
							<Link href="/sign-in">Login</Link>
						</Button>
					</SignedOut>
					<div className="md:hidden">
						<MobileNavbar user={user} />
					</div>
				</div>
			</div>
		</header>
	);
};
