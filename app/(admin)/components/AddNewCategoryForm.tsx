"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent } from "@/components/ui/drawer";

import { Input } from "@/components/ui/input";

import { toast } from "@/hooks/use-toast";
import { createCategory } from "@/lib/actions/category.actions";
import { useState } from "react";

export function AddNewCategoryForm({
	open,
	closeModal,
}: {
	open: boolean;
	closeModal: () => void;
}) {
	const [loading, setLoading] = useState(false);
	const [value, setValue] = useState("");

	const handleSubmit = async () => {
		try {
			setLoading(true);

			const res = await createCategory({ name: value });

			toast({ title: "Success!", description: res?.message });
			closeModal();
		} catch (error) {
			toast({
				title: "Error!",
				description: "An error occurred!",
				variant: "destructive",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<Drawer open={open} onClose={closeModal}>
			<DrawerContent className="z-[1000] pointer-events-auto">
				<div className="mx-auto w-full sm:max-w-sm lg:max-w-lg py-10 container">
					<h4 className="text-sm uppercase font-medium">
						Add new category
					</h4>
					<div className="mt-2">
						<Input
							value={value}
							onChange={(e) => setValue(e.target.value)}
							placeholder={`Loafers`}
						/>
					</div>
					{/* Action Buttons */}
					<div className="flex items-center justify-between gap-4 mt-4 flex-col md:flex-row w-full">
						<DrawerClose asChild>
							<Button
								size="md"
								onClick={closeModal}
								variant="outline"
								className="w-full md:w-auto"
							>
								Cancel
							</Button>
						</DrawerClose>
						<Button
							size="md"
							onClick={handleSubmit}
							disabled={loading}
							className="w-full md:w-auto"
						>
							{loading ? "Submitting..." : "Submit"}
						</Button>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
