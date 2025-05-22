"use client";
import { Button } from "@/components/ui/button";
import { CircleOff, Dot, ListFilter } from "lucide-react";
import { Customer } from "./Customer";
import { IUser } from "@/lib/database/models/user.model";
import { InformationBox } from "./InformationBox";
import { Separator } from "@/components/ui/separator";
import React from "react";

export const CustomerBox = ({ customers }: { customers: IUser[] }) => {
	return (
		<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border">
			<div className="flex items-center justify-between gap-8">
				<div>
					<h2 className="text-lg uppercase font-semibold">
						Customers
					</h2>
					<p className="text-muted-foreground text-sm">
						Information about your customers
					</p>
				</div>
				{/* <Button size="icon" variant={"ghost"}>
					<ListFilter className="size-4" />
				</Button> */}
			</div>
			<div className="grid gap-4 mt-4">
				{customers.map(
					(
						{ firstName, lastName, email, picture, phoneNumber },
						index
					) => (
						<React.Fragment key={index}>
							<Customer
								picture={picture}
								firstName={firstName}
								lastName={lastName}
								email={email}
								phoneNumber={phoneNumber}
								key={index}
							/>
							{index !== customers.length - 1 && <Separator />}
						</React.Fragment>
					)
				)}
			</div>
			<div className="mt-4">
				{customers?.length === 0 && (
					<InformationBox
						variant="pending"
						title="You have no customers yet."
						icon={CircleOff}
					/>
				)}
			</div>
		</div>
	);
};
