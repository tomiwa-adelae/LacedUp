"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { LogOut, Settings } from "lucide-react";
import { IUser } from "@/lib/database/models/user.model";
import { adminSidebarLinks, sidebarLinks } from "@/constants";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ProfileDropdown({ user }: { user?: IUser }) {
	const { signOut } = useClerk();

	const router = useRouter();

	const handleLogout = async () => {
		await signOut();
		localStorage.removeItem("cart");
		router.push("/sign-in"); // Redirect to sign-in page after logout
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Image
					src={user?.picture!}
					alt={`${user?.firstName} ${user?.lastName}`}
					width={1000}
					height={1000}
					className="size-10 rounded-full cursor-pointer hover:border border-primary object-cover mr-2"
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel className="uppercase font-medium text-xs text-muted-foreground">
					Your account
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{(user?.isAdmin ? adminSidebarLinks : sidebarLinks).map(
					({ label, icon, href }, index) => {
						const Icon = icon;
						return (
							<DropdownMenuGroup key={index}>
								<Link href={href}>
									<DropdownMenuItem className="cursor-pointer">
										<Icon className="size-5" />
										<span className="uppercase text-xs font-medium">
											{label}
										</span>
									</DropdownMenuItem>
								</Link>
								<DropdownMenuSeparator />
							</DropdownMenuGroup>
						);
					}
				)}
				<Link href={"/settings"}>
					<DropdownMenuItem className="cursor-pointer">
						<Settings className="size-5" />
						<span className="uppercase text-xs font-medium">
							Settings
						</span>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
				</Link>
				<DropdownMenuItem
					onClick={handleLogout}
					className="cursor-pointer"
				>
					<LogOut className="size-5" />
					<span className="uppercase text-xs font-medium">
						Logout
					</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
