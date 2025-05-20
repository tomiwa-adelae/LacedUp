"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent } from "@/components/ui/drawer";

import { toast } from "@/hooks/use-toast";
import { cancelOrder } from "@/lib/actions/order.actions";
import { useState } from "react";

interface Props {
	open: boolean;
	closeModal: () => void;
	orderId: string | any;
	userId: string;
}

export function CancelOrderModal({ open, closeModal, orderId, userId }: Props) {
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		try {
			setLoading(true);

			const res = await cancelOrder({ orderId, userId });

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
							Cancel order
						</h4>
						<p className="text-sm mt-2 mb-4">
							Are you sure you want to cancel this order? This
							action cannot be undone. Once cancel, all processes
							concerning this order would be automatically
							stopped.
						</p>

						<div className="flex items-center container justify-between gap-4 mt-4 flex-col sm:flex-row w-full">
							<DrawerClose asChild>
								<Button
									size="md"
									onClick={closeModal}
									variant="outline"
									className="w-full sm:w-auto"
								>
									Close
								</Button>
							</DrawerClose>
							<Button
								variant={"destructive"}
								size="md"
								onClick={handleSubmit}
								disabled={loading}
								className="w-full sm:w-auto"
							>
								{loading ? "Cancelling..." : "Cancel Order"}
							</Button>
						</div>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
