import { SettingsForm } from "@/components/forms/SettingsForm";
import { Separator } from "@/components/ui/separator";
import { getUserInfo } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";

const page = async () => {
	const clerkUser = await currentUser();

	const user = await getUserInfo(clerkUser?.id!);

	return (
		<div>
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
			/>
		</div>
	);
};

export default page;
