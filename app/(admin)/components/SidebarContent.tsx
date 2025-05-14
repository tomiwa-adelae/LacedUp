"use client";
import Logo from "@/components/shared/Logo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sidebarLinks } from "@/constants";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useClerk } from "@clerk/nextjs";
import { Info, LogOut, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export const SidebarContent = ({ setOpenMobile }: any) => {
	const router = useRouter();
	const pathname = usePathname();
	const isMobile = useIsMobile(); // detect mobile
	const { signOut } = useClerk();

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
		<ScrollArea>
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
								pathname.startsWith("/help-center")
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
								pathname.startsWith("/settings")
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
		</ScrollArea>
	);
};
