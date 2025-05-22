"use client";
import Image from "next/image";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { FileUpload } from "./ui/file-upload";
import { Button } from "@/components/ui/button";
import { updateUser } from "@/lib/actions/user.actions";
import { Drawer, DrawerClose, DrawerContent } from "@/components/ui/drawer";
import { uploadImage } from "@/lib/actions/upload.actions";
import {
	deleteProduct,
	deleteProductImage,
} from "@/lib/actions/product.actions";

interface Props {
	open: boolean;
	closeModal: (updatedMedia?: any) => void;
	userId: string;
}

export function ProfileImageModal({ open, closeModal, userId }: Props) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [image, setImage] = useState<any>("");

	// Handle form submission
	const handleSubmit = async () => {
		try {
			setLoading(true);

			const uploadResult = await uploadImage(image);

			if (uploadResult?.status === 400) {
				toast({
					title: "Error!",
					description: uploadResult?.message,
					variant: "destructive",
				});
				return;
			}

			const details = {
				picture: uploadResult.url,
				pictureId: uploadResult.id,
			};

			const res = await updateUser({ details, userId });

			console.log(res);

			if (res?.status === 400)
				return toast({
					title: "Error!",
					description: res?.message,
					variant: "destructive",
				});

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
					<div className="mx-auto w-full sm:max-w-sm lg:max-w-lg py-10">
						<h4 className="text-sm uppercase font-medium">
							Change profile picture
						</h4>
						{image ? (
							<div className="py-4">
								<Image
									src={image}
									alt={"New profile picture"}
									width={1000}
									height={1000}
									className="rounded-full object-cover size-40"
								/>
							</div>
						) : (
							<FileUpload
								showTitle={false}
								loading={loading}
								onChange={(files) => {
									const reader = new FileReader();
									reader.readAsDataURL(files[0]);
									reader.onload = async () => {
										try {
											const binaryString = reader.result;

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
								className="w-full sm:w-auto text-xs"
							>
								{loading ? "Updating..." : "Update image"}
							</Button>
						</div>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
