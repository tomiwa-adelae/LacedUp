import { footerDetails, socialLinks } from "@/constants";
import Link from "next/link";
import { Separator } from "../ui/separator";
import Logo from "./Logo";

const Footer = () => {
	const year = new Date().getFullYear();
	return (
		<footer className="bg-white text-black dark:bg-black dark:text-white">
			<div className="container">
				<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 py-10">
					<div className="col-span-2 md:col-span-1 lg:col-span-2">
						<Logo />
						<p className="text-muted-foreground dark:text-gray-200 text-base mt-4">
							Digitalizing Africa's housing market. Connecting
							landlords with renters for a seamless property
							experience.
						</p>
						<div className="flex items-center justify-start gap-6 mt-8">
							{socialLinks.map(({ icon, name, slug }, index) => {
								const Icon = icon;
								return (
									<a
										href={slug}
										target="_blank"
										key={index}
										className="flex items-center justify-start gap-4 group hover:text-primary transition-all"
									>
										<Icon className="size-6" />
									</a>
								);
							})}
						</div>
					</div>
					{footerDetails.map(({ title, links }, index) => (
						<div key={index} className="">
							<h3 className="text-sm md:text-base font-semibold tracking-wider uppercase">
								{title}
							</h3>
							<ul className="mt-4 space-y-4">
								{links.map(({ slug, label }, idx) => (
									<li key={idx}>
										<Link
											className="text-base text-muted-foreground dark:text-gray-200 hover:text-primary"
											href={slug}
										>
											{label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
			<div className="container">
				<Separator />
			</div>
			<div className="transition-all py-8 text-center font-medium uppercase text-xs">
				<p className="container">
					&copy; {year} LacedUp. All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
