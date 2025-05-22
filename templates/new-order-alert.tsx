import { WEBSITE_URL } from "@/constants";
import { formatMoneyInput } from "@/lib/utils";
import { Dot } from "lucide-react";
import Image from "next/image";

interface Props {
	name: string;
	email: string;
	orderId: string;
	items: any;
	totalPrice: string;
	address: string;
}

export const NewOrderAlert = ({
	orderId,
	name,
	items,
	totalPrice,
	email,
	address,
}: Props) => `
    <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>New Order Received</title>
  </head>
  <body style="font-family: Arial, sans-serif; color: #333;">
    <div style="max-width: 600px; margin: 0 auto;">
      <h2 style="color: #e91e63;">New Order Placed</h2>
      <p>A new order <strong>#${orderId}</strong> has just been placed by <strong>${name}</strong>.</p>

      <h3>Order Details</h3>
      <ul>
      ${items.map(
			({
				image,
				name,
				id,
				category,
				color,
				size,
				quantity,
				price,
			}: any) => (
				<div
					key={id}
					className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-lg p-2 md:flex items-center justify-between gap-4 dark:border"
				>
					<Image
						src={image}
						alt={`${name}'s picture`}
						width={1000}
						height={1000}
						className="object-cover aspect-square size-[80px] rounded-lg"
					/>
					<div className="flex-1">
						<h3>
							<a
								href={`${WEBSITE_URL}/shoes/${id}`}
								className="text-base font-medium mb-1 hover:text-primary transition-all"
							>
								{name}
							</a>
						</h3>
						<div className="flex items-center justify-start text-xs my-1 font-medium text-muted-foreground dark:text-gray-200">
							<a href={`${WEBSITE_URL}/category/${category}`}>
								Category:{" "}
								<span className="text-black dark:text-white hover:text-primary dark:hover:text-primary">
									{category}
								</span>
							</a>
							<Dot className="text-black dark:text-white size-5" />
							<p>
								Color:{" "}
								<span className="text-black dark:text-white">
									{color}
								</span>
							</p>
							<Dot className="text-black dark:text-white size-5" />
							<p>
								Size:{" "}
								<span className="text-black dark:text-white">
									{size}
								</span>
							</p>
							<Dot className="text-black dark:text-white size-5" />
							<p>
								Quantity:{" "}
								<span className="text-black dark:text-white">
									{quantity}
								</span>
							</p>
						</div>
					</div>

					<div className="flex flex-col justify-center gap-1 items-center h-full">
						<h3 className="font-medium text-base">
							₦{formatMoneyInput(price)}
						</h3>
					</div>
				</div>
			)
		)}
      </ul>

      <p><strong>Total:</strong> ₦${formatMoneyInput(totalPrice)}</p>

      <h4>Customer Info</h4>
      <p>Email: ${email}</p>
      <p>Shipping Address: ${address}</p>

      <hr />
      <p style="font-size: 0.9em; color: #888;">Please log in to the admin panel to manage this order.</p>
    </div>
  </body>
</html>
`;
