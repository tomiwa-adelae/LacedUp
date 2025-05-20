"use client";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";
import { CancelOrderModal } from "./CancelOrderModal";

export const CancelOrderButton = ({
	userId,
	orderId,
}: {
	userId: string;
	orderId: string;
}) => {
	const [openCancelModal, setOpenCancelModal] = useState(false);

	return (
		<>
			<Button
				variant="destructive"
				size="md"
				onClick={() => setOpenCancelModal(true)}
			>
				<Trash className="size-4" />
				Cancel order
			</Button>
			{openCancelModal && (
				<CancelOrderModal
					orderId={orderId}
					open={openCancelModal}
					closeModal={() => {
						setOpenCancelModal(false);
					}}
					userId={userId}
				/>
			)}
		</>
	);
};
