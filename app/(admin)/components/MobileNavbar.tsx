"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { SidebarContent } from "./SidebarContent";
import { useState } from "react";

export function MobileNavbar() {
	const [openMobile, setOpenMobile] = useState(false); // <-- add state

	return (
		<Sheet open={openMobile} onOpenChange={setOpenMobile}>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					className="hover:bg-transparent"
					size={"icon"}
				>
					<MenuIcon className="size-8" />
				</Button>
			</SheetTrigger>
			<SheetContent className="h-screen py-4" side={"left"}>
				<SidebarContent setOpenMobile={setOpenMobile} />
			</SheetContent>
		</Sheet>
	);
}
