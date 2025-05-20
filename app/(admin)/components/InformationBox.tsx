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
				"py-4 text-sm px-4 rounded-lg  border text-black font-medium",
				variant === "success" && "bg-green-100 border-green-400",
				variant === "pending" && "bg-yellow-100 border-yellow-400",
				variant === "delivered" && "bg-blue-100 border-blue-400",
				variant === "danger" && "bg-red-100 border-red-400"
			)}
		>
			<div className="flex items-center justify-start gap-2">
				<Icon className="size-4" />
				<div>
					<h4 className="text-sm uppercase font-semibold">{title}</h4>
					<p className="text-xs">{description}</p>
				</div>
			</div>
		</div>
	);
};
