import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { DEFAULT_USER_IMAGE } from "@/constants";
import { IUser } from "@/lib/database/models/user.model";
import { formatDate } from "@/lib/utils";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";

export const CustomersTable = ({ customers }: { customers: IUser[] }) => {
	return (
		<div className="mt-4">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Phone</TableHead>
						<TableHead className="text-center">
							Joined date
						</TableHead>
						<TableHead></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{customers.map(
						(
							{
								picture,
								firstName,
								lastName,
								email,
								phoneNumber,
								createdAt,
							},
							index
						) => (
							<TableRow key={index}>
								<TableCell className="font-medium flex items-center justify-start  gap-2">
									<Image
										src={picture || DEFAULT_USER_IMAGE}
										alt={`${firstName}'s picture`}
										width={1000}
										height={1000}
										className="rounded-full object-cover size-10"
									/>
									<span className="line-clamp-2">
										{firstName} {lastName}
									</span>
								</TableCell>
								<TableCell>{email}</TableCell>
								<TableCell>{phoneNumber}</TableCell>
								<TableCell className="text-center">
									{formatDate(createdAt)}
								</TableCell>
								<TableCell>
									<EllipsisVertical className="size-5" />
								</TableCell>
							</TableRow>
						)
					)}
				</TableBody>
			</Table>
		</div>
	);
};
