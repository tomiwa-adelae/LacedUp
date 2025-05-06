import { SettingsForm } from "@/components/forms/SettingsForm";
import { Separator } from "@/components/ui/separator";

const page = () => {
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
			<SettingsForm />
		</div>
	);
};

export default page;
