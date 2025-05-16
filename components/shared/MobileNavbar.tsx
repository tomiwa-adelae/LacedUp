"use client";

import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from "@/components/ui/sheet";
import {
	adminSidebarLinks,
	DEFAULT_USER_IMAGE,
	navLinks,
	sidebarLinks,
} from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import { ScrollArea } from "../ui/scroll-area";
import { Info, LogOut, MenuIcon, Settings } from "lucide-react";
import { IUser } from "@/lib/database/models/user.model";
import { SidebarContent } from "@/app/(admin)/components/SidebarContent";
import { useClerk } from "@clerk/nextjs";
import { useIsMobile } from "@/hooks/use-mobile";

export function MobileNavbar({
	user,
	setOpenMobile,
}: {
	user: IUser;
	setOpenMobile?: any;
}) {
	const router = useRouter();
	const pathname = usePathname();
	const { signOut } = useClerk();
	const isMobile = useIsMobile(); // detect mobile

	const handleClick = () => {
		if (isMobile && setOpenMobile) {
			setOpenMobile(false);
		}
	};

	const handleLogout = async () => {
		await signOut();
		localStorage.removeItem("cart");
		router.push("/sign-in"); // Redirect to sign-in page after logout
	};
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					className="hover:bg-transparent"
					size={"icon"}
				>
					<MenuIcon className="size-8" />
				</Button>
			</SheetTrigger>
			<SheetContent className="h-screen" side={"left"}>
				<ScrollArea>
					<div className="container  py-4">
						<div className="flex flex-1 flex-col overflow-x-hidden">
							<Logo />
							<div className="mt-8 flex flex-col gap-4">
								{(user.isAdmin
									? adminSidebarLinks
									: sidebarLinks
								).map((link, idx) => {
									const Icon = link.icon;
									const isActive =
										pathname === link.href ||
										pathname.startsWith(`${link.href}/`);
									return (
										<Link
											key={idx}
											href={link.href}
											className={`group flex items-center justify-start gap-2 group/sidebar py-2
												${
													isActive
														? "text-primary"
														: "text-black dark:text-white text-sm"
												} hover:text-primary
												`}
											onClick={handleClick}
										>
											<Icon className="size-5" />

											<span className="text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0 uppercase font-medium">
												{link.label}
											</span>
										</Link>
									);
								})}
							</div>
						</div>
						<div className="fixed bottom-0">
							<div className="mt-8 flex flex-col gap-4">
								<Link
									href={"/help-center"}
									className={`group flex items-center justify-start gap-2 group/sidebar py-2
												${
													pathname.startsWith(
														"/help-center"
													)
														? "text-primary"
														: "text-black dark:text-white text-sm"
												} hover:text-primary
												`}
									onClick={() => {
										// if (isMobile) setOpenMobile(false);
									}}
								>
									<Info className="size-5" />

									<span className="text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0 uppercase font-medium">
										Help center
									</span>
								</Link>
								<Link
									href={"/settings"}
									className={`group flex items-center justify-start gap-2 group/sidebar py-2
												${
													pathname.startsWith(
														"/settings"
													)
														? "text-primary"
														: "text-black dark:text-white text-sm"
												} hover:text-primary
												`}
									onClick={() => {
										// if (isMobile) setOpenMobile(false);
									}}
								>
									<Settings className="size-5" />

									<span className="text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0 uppercase font-medium">
										Settings
									</span>
								</Link>
								<div
									className={cn(
										"group flex items-center justify-start gap-2  group/sidebar py-2 hover:text-destructive"
									)}
									onClick={handleLogout}
								>
									<LogOut className="size-5" />
									<span
										className={cn(
											"text-black dark:text-white text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0 uppercase font-medium  cursor-pointer group-hover:text-destructive"
										)}
									>
										Logout
									</span>
								</div>
							</div>
							<div
								className={cn(
									"group flex items-center justify-start gap-2  group/sidebar py-2"
								)}
							>
								<Image
									src={user?.picture || DEFAULT_USER_IMAGE}
									alt={`${user.firstName}'s picture`}
									width={1000}
									height={1000}
									className="w-14 h-14 rounded-full object-cover"
								/>

								<span
									className={cn(
										"text-neutral-700 dark:text-gray-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0 uppercase font-medium group-hover:text-primary"
									)}
								>
									{user?.firstName} {user?.lastName}
								</span>
							</div>
						</div>
					</div>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
}
