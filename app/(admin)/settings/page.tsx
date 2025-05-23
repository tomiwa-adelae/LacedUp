import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { Separator } from "@/components/ui/separator";
import { getUserInfo } from "@/lib/actions/user.actions";
import { SettingsForm } from "@/components/forms/SettingsForm";
import { AppNavbar } from "../components/AppNavbar";
import { Header } from "../components/Header";

export const metadata: Metadata = {
	title: "Store Settings – Admin Configuration | LacedUp",
	description:
		"Configure payment settings, email notifications, shipping options, and other preferences for your online shoe store.",
	keywords:
		"store settings, admin preferences, ecommerce config, shoe store backend settings",
};

const page = async () => {
	const clerkUser = await currentUser();

	const user = await getUserInfo(clerkUser?.id!);

	return (
		<div>
			<AppNavbar user={user?.user} />
			<Header user={user?.user} />
			<div className="flex items-center justify-between gap-8">
				<div>
					<h2 className="text-lg lg:text-3xl uppercase font-semibold">
						Account
					</h2>
					<p className="text-muted-foreground text-sm">
						Manage your profile
					</p>
				</div>
			</div>
			<Separator className="my-8" />
			<SettingsForm
				userId={user?.user._id}
				firstName={user?.user.firstName}
				lastName={user?.user.lastName}
				email={user?.user.email}
				phoneNumber={user?.user.phoneNumber}
				picture={user?.user.picture}
				state={user?.user.state}
				address={user?.user.address}
				city={user?.user.city}
				country={user?.user.country}
			/>
		</div>
	);
};

export default page;
