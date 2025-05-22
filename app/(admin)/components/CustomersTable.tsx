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
import { CircleOff, EllipsisVertical, Mail, Phone } from "lucide-react";
import Image from "next/image";
import { InformationBox } from "./InformationBox";
import { Button } from "@/components/ui/button";

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
								<TableCell>
									<a
										href={`mailto:${email}`}
										className="hover:text-primary hover:underline dark:text-gray-200"
									>
										{email}
									</a>
								</TableCell>
								<TableCell>
									{phoneNumber ? (
										<a
											href={`tel:${phoneNumber}`}
											className="hover:text-primary hover:underline dark:text-gray-200"
										>
											{phoneNumber}
										</a>
									) : (
										<p className="italic">
											No phone number
										</p>
									)}
								</TableCell>
								<TableCell className="text-center">
									{formatDate(createdAt)}
								</TableCell>
								<TableCell>
									<div className="flex items-center justify-end gap-2">
										{phoneNumber && (
											<Button
												asChild
												size={"icon"}
												variant={"outline"}
											>
												<a href={`tel:${phoneNumber}`}>
													<Phone className="size-4" />
												</a>
											</Button>
										)}
										<Button
											asChild
											size={"icon"}
											variant={"outline"}
										>
											<a href={`mailto:${email}`}>
												<Mail className="size-4" />
											</a>
										</Button>
									</div>
								</TableCell>
							</TableRow>
						)
					)}
				</TableBody>
			</Table>
			<div className="mt-4">
				{customers?.length === 0 && (
					<InformationBox
						variant="pending"
						title="You have no customers in your store."
						icon={CircleOff}
					/>
				)}
			</div>
		</div>
	);
};
