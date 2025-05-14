"use client";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { useClerk, useUser } from "@clerk/nextjs";
import React from "react";
import { useRouter } from "next/navigation";
import { sidebarLinks } from "@/constants";
import { LogOut, Settings } from "lucide-react";

export function ProfileDropdown() {
	const { user } = useUser();
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
					src={user?.imageUrl!}
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
				{sidebarLinks.map(({ label, icon, href }, index) => {
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
				})}
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
