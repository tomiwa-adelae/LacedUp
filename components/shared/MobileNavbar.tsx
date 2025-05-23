"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { SidebarContent } from "../../app/(admin)/components/SidebarContent";
import { useState } from "react";
import { IUser } from "@/lib/database/models/user.model";

export function MobileNavbar({ user }: { user?: IUser }) {
	const [openMobile, setOpenMobile] = useState(false); // <-- add state

	return (
		<Sheet open={openMobile} onOpenChange={setOpenMobile}>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					className="hover:bg-transparent"
					size={"icon"}
				>
					<MenuIcon className="size-6" />
				</Button>
			</SheetTrigger>
			<SheetContent className="h-screen py-4" side={"left"}>
				<SidebarContent user={user} setOpenMobile={setOpenMobile} />
			</SheetContent>
		</Sheet>
	);
}
