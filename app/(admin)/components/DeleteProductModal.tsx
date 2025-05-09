"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent } from "@/components/ui/drawer";

import { toast } from "@/hooks/use-toast";
import { deleteProduct } from "@/lib/actions/product.actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
	open: boolean;
	closeModal: () => void;
	productId: string | any;
	userId: string;
}

export function DeleteProductModal({
	open,
	closeModal,
	productId,
	userId,
}: Props) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		try {
			setLoading(true);

			const res = await deleteProduct({ productId, userId });

			if (res?.status == 400)
				return toast({
					title: "Error!",
					description: res?.message,
					variant: "destructive",
				});

			toast({
				title: "Success!",
				description: res?.message,
			});
			closeModal();
			router.push("/products");
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
							Delete product
						</h4>
						<p className="text-sm mt-2 mb-4">
							Are you sure you want to delete this product? This
							action cannot be undone. Once deleted, all
							associated data will be permanently removed.
						</p>

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
								variant={"destructive"}
								size="md"
								onClick={handleSubmit}
								disabled={loading}
								className="w-full sm:w-auto"
							>
								{loading ? "Deleting..." : "Delete"}
							</Button>
						</div>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
