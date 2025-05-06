"use client";
import Image from "next/image";
// import Logo from "./Logo";
import { sidebarLinks } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
// import { useClerk } from "@clerk/nextjs";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar"; // 👈 Import
import Logo from "@/components/shared/Logo";
import { Info, LogOut, Settings } from "lucide-react";

const AppHeader = () => {
	const router = useRouter();
	// const { signOut } = useClerk();
	const pathname = usePathname();
	const { isMobile, setOpenMobile } = useSidebar();

	return (
		<div className="container">
			<div className="flex flex-1 flex-col overflow-x-hidden">
				<Logo />
				<div className="mt-8 flex flex-col gap-4">
					{sidebarLinks.map((link, idx) => {
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
								onClick={() => {
									if (isMobile) setOpenMobile(false); // 👈 Close sidebar on mobile
								}}
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
										pathname.startsWith("/help-center")
											? "text-primary"
											: "text-black dark:text-white text-sm"
									} hover:text-primary
                                    `}
						onClick={() => {
							if (isMobile) setOpenMobile(false);
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
										pathname.startsWith("/settings")
											? "text-primary"
											: "text-black dark:text-white text-sm"
									} hover:text-primary
                                    `}
						onClick={() => {
							if (isMobile) setOpenMobile(false);
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
						onClick={async () => {
							if (isMobile) setOpenMobile(false);
							// await signOut();
							router.push("/sign-in");
						}}
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
						src={"/assets/images/user.jpeg"}
						alt={`Tomiwa's picture`}
						width={1000}
						height={1000}
						className="w-14 h-14 rounded-full object-cover"
					/>

					<span
						className={cn(
							"text-neutral-700 dark:text-gray-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0 uppercase font-medium group-hover:text-primary"
						)}
					>
						Tomiwa Adelae
					</span>
				</div>
			</div>
		</div>
	);
};

export default AppHeader;
