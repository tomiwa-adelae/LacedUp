"use client";

import { RequiredAsterisk } from "@/components/shared/RequiredAsterisk";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent } from "@/components/ui/drawer";
import { FileUpload } from "@/components/ui/file-upload";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

import { toast } from "@/hooks/use-toast";
import { createCategory } from "@/lib/actions/category.actions";
import Image from "next/image";
import { useState } from "react";

export function AddNewCategoryForm({
	open,
	closeModal,
}: {
	open: boolean;
	closeModal: () => void;
}) {
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState("");
	const [image, setImage] = useState<any>("");

	const handleSubmit = async () => {
		try {
			setLoading(true);

			const res = await createCategory({ name, image });

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
				<div className="container">
					<div className="h-screen mx-auto w-full sm:max-w-sm lg:max-w-lg py-10">
						<h4 className="text-sm uppercase font-medium">
							Add new category
						</h4>
						<div className="mt-4">
							<Label className="mb-2">
								Category name <RequiredAsterisk />
							</Label>
							<Input
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder={`Loafers`}
							/>
						</div>
						<div>
							{image ? (
								<div className="py-4">
									<Image
										src={image}
										alt={"New profile picture"}
										width={1000}
										height={1000}
										className="rounded-lg object-cover aspect-video"
									/>
								</div>
							) : (
								<FileUpload
									title="Upload category image"
									loading={loading}
									onChange={(files) => {
										const reader = new FileReader();
										reader.readAsDataURL(files[0]);
										reader.onload = async () => {
											try {
												const binaryString =
													reader.result;

												setLoading(true);

												setImage(binaryString);
											} catch (error) {
												setLoading(false);
											} finally {
												setLoading(false);
											}
										};
									}}
								/>
							)}
						</div>
						{/* Action Buttons */}
						<div className="flex items-center container justify-between gap-4 mt-4 flex-col sm:flex-row w-full">
							<DrawerClose asChild>
								<Button
									size="md"
									onClick={closeModal}
									variant="outline"
									className="w-full sm:w-auto"
								>
									Cancel
								</Button>
							</DrawerClose>
							<Button
								size="md"
								onClick={handleSubmit}
								disabled={loading}
								className="w-full sm:w-auto"
							>
								{loading ? "Submitting..." : "Submit"}
							</Button>
						</div>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
