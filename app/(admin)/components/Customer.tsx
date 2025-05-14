import { Button } from "@/components/ui/button";
import { DEFAULT_USER_IMAGE } from "@/constants";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";

interface Props {
	firstName: string;
	lastName: string;
	email: string;
	picture: any;
	phoneNumber: string;
	_id: string;
}

export const Customer = ({
	firstName,
	lastName,
	email,
	picture,
	phoneNumber,
}: Props) => {
	return (
		<div className="flex items-center justify-between gap-4 border-b pb-2">
			<div className="flex items-center justify-start gap-2">
				<Image
					src={picture || DEFAULT_USER_IMAGE}
					alt={`${firstName}'s picture`}
					width={1000}
					height={1000}
					className="rounded-full size-10 object-cover"
				/>
				<div>
					<p className="text-sm font-medium text-black dark:text-white">
						{firstName} {lastName}
					</p>
					<a
						href={`mailto:${email}`}
						className="hover:text-primary hover:underline text-xs text-muted-foreground dark:text-gray-200"
					>
						{email}
					</a>
				</div>
			</div>
			<div className="flex items-center justify-end gap-2">
				<Button asChild size={"icon"} variant={"outline"}>
					<a href={`mailto:${phoneNumber}`}>
						<Mail className="size-4" />
					</a>
				</Button>
				<Button asChild size={"icon"} variant={"outline"}>
					<a href={`tel:${phoneNumber}`}>
						<Phone className="size-4" />
					</a>
				</Button>
			</div>
		</div>
	);
};
