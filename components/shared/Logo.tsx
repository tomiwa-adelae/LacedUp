import { Footprints } from "lucide-react";
import Link from "next/link";

const Logo = ({
	hide = false,
	title = "Lacedup",
	slug = "/",
	fontSize = "text-3xl",
}: {
	hide?: boolean;
	title?: string;
	slug?: string;
	fontSize?: string;
}) => {
	return (
		<Link
			href={slug}
			className="hover:text-primary transition-colors flex items-center justify-start"
		>
			<Footprints className="size-10 mr-2" />
			<h3
				style={{ fontFamily: "ClashDisplay" }}
				className={`${
					hide && "hidden"
				} md:block ${fontSize} uppercase font-semibold`}
			>
				{title}
			</h3>
		</Link>
	);
};

export default Logo;
