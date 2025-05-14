"use client";
import { Button } from "@/components/ui/button";
import { Dot, ListFilter } from "lucide-react";
import { Customer } from "./Customer";
import { IUser } from "@/lib/database/models/user.model";

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
				<Button size="icon" variant={"ghost"}>
					<ListFilter className="size-4" />
				</Button>
			</div>
			<div className="grid gap-4 mt-4">
				{customers.map(
					({ firstName, lastName, email, picture, _id }, index) => (
						<Customer
							picture={picture}
							firstName={firstName}
							lastName={lastName}
							email={email}
							id={_id}
							key={index}
						/>
					)
				)}
			</div>
		</div>
	);
};
