"use client";

import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import { ScrollArea } from "../ui/scroll-area";
import { MenuIcon } from "lucide-react";

export function MobileNavbar() {
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
				<ScrollArea className="h-full">
					<Logo />
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
}
