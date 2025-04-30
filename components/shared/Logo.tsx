import { Footprints } from "lucide-react";
import Link from "next/link";

const Logo = () => {
	return (
		<Link
			href="/"
			className="hover:text-primary transition-colors flex items-center justify-start"
		>
			<Footprints className="size-10 mr-2" />
			<h3 className="hidden md:block text-3xl uppercase font-semibold">
				LacedUp
			</h3>
		</Link>
	);
};

export default Logo;
