import { cn } from "@/lib/utils";

interface Props {
	description?: string;
	title: string;
	icon: any;
	variant: string;
}

export const InformationBox = ({
	description,
	title,
	icon,
	variant,
}: Props) => {
	const Icon = icon;
	return (
		<div
			className={cn(
				"py-4 text-xs md:text-sm px-4 rounded-lg  border text-black font-medium",
				variant === "success" &&
					"bg-green-100 dark:bg-green-900 border-green-400 dark:border-green-600 dark:text-white",
				variant === "pending" &&
					"bg-yellow-100 dark:bg-yellow-900 dark:text-white border-yellow-400 dark:border-yellow-600",
				variant === "delivered" && "bg-blue-100 border-blue-400",
				variant === "danger" && "bg-red-100 border-red-400"
			)}
		>
			<div className="flex items-center justify-start gap-2">
				<Icon className="size-4" />
				<div>
					<h4 className="uppercase font-semibold">{title}</h4>
					<p className="text-xs">{description}</p>
				</div>
			</div>
		</div>
	);
};
