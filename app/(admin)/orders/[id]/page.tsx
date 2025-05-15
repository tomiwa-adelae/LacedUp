import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getOrderDetails } from "@/lib/actions/order.actions";
import { getUserInfo } from "@/lib/actions/user.actions";
import { IOrder } from "@/lib/database/models/order.model";
import {
	formatDate,
	formatMoneyInput,
	formattedPaymentMethod,
} from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import {
	Banknote,
	CircleCheckBig,
	CreditCard,
	Dot,
	Download,
	Hash,
	Mail,
	MapPinHouse,
	MessageSquareWarning,
	Phone,
	Printer,
	Share,
	Share2,
	Smartphone,
	User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { InformationBox } from "../../components/InformationBox";
import { PaymentButton } from "../../components/PaymentButton";
import { MarkAsPaidButton } from "../../components/MarkAsPaidButton";
import { MarkAsDeliveredButton } from "../../components/MarkAsDeliveredButton";

const page = async ({ params }: { params: any }) => {
	const clerkUser = await currentUser();

	const { id } = await params;

	const user = await getUserInfo(clerkUser?.id!);

	const order = await getOrderDetails({ userId: user.user._id, orderId: id });

	if (order.status === 400) redirect("/not found");
	return (
		<div>
			<div className="flex items-center justify-between gap-8 bg-white dark:bg-black">
				<div>
					<div className="flex items-center justify-between gap-4">
						<h2 className="text-lg lg:text-3xl uppercase font-semibold">
							Order-{order.order._id.slice(-6)}{" "}
						</h2>
						<div className="flex items-center justify-between gap-2">
							<Badge
								variant={
									order?.order?.paymentStatus === "pending"
										? "warning"
										: order.order.paymentStatus === "paid"
										? "success"
										: order.order.paymentStatus === "failed"
										? "danger"
										: "default"
								}
								className="inline-flex px-2 py-1 rounded-full text-xs"
							>
								{order.order.paymentStatus === "pending"
									? "Unpaid"
									: order?.order?.paymentStatus}
							</Badge>
							<Badge
								variant={
									order?.order?.orderStatus === "pending"
										? "warning"
										: order?.order?.orderStatus ===
										  "delivered"
										? "success"
										: order?.order?.orderStatus === "failed"
										? "danger"
										: "default"
								}
							>
								<CircleCheckBig />{" "}
								{order?.order?.orderStatus === "pending"
									? "Undelivered"
									: order?.order?.orderStatus}
							</Badge>
						</div>
					</div>
					<p className="text-sm text-muted-foreground">
						Order date: {formatDate(order.order.createdAt)}
					</p>
				</div>
				<div className="flex items-center justify-center gap-4">
					<Button size="md" variant={"ghost"}>
						<MessageSquareWarning className="size-4" />
						Report
					</Button>
					<Button size="md">
						<Share2 className="size-4" />
						Share order{" "}
					</Button>
				</div>
			</div>
			<div>
				<div className="grid-cols-1 grid gap-4 lg:grid-cols-3 pt-4">
					<div className="col-span-2 grid gap-4">
						<div className="flex flex-col gap-4">
							<div>
								<h4 className="mb-2 font-medium text-muted-foreground text-sm lg:text-base uppercase">
									Order items
								</h4>
								{order.order.orderItems.map(
									(
										{
											image,
											name,
											product,
											color,
											size,
											quantity,
											price,
										}: any,
										index: string
									) => (
										<div>
											<div
												key={index}
												className="md:hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-lg p-2 flex flex-col items-start justify-between gap-4 dark:border"
											>
												<Image
													src={image}
													alt={`${name}'s picture`}
													width={1000}
													height={1000}
													className="aspect-video object-cover rounded-lg "
												/>
												<div className="w-full">
													<h3>
														<Link
															href={`/shoes/${product}`}
															className="text-base font-medium mb-1 hover:text-primary transition-all"
														>
															{name}
														</Link>
													</h3>
													<div className="flex items-center justify-start text-xs my-1 font-medium text-muted-foreground dark:text-gray-200">
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
													<div className="flex mt-4 justify-start gap-2 font-medium text-sm items-center h-full">
														<h3>
															( 2 x ₦{" "}
															{formatMoneyInput(
																price
															)}
															)
														</h3>
														=
														<h3>
															₦{" "}
															{formatMoneyInput(
																quantity * price
															)}
														</h3>
													</div>
												</div>
											</div>
											<div className="hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-lg p-2 md:flex items-center justify-between gap-4 dark:border">
												<Image
													src={image}
													alt={`${name}'s picture`}
													width={1000}
													height={1000}
													className="object-cover aspect-square size-[80px] rounded-lg"
												/>
												<div className="flex-1">
													<h3>
														<Link
															href={`/shoes/${id}`}
															className="text-base font-medium mb-1 hover:text-primary transition-all"
														>
															{name}
														</Link>
													</h3>
													<div className="flex items-center justify-start text-xs my-1 font-medium text-muted-foreground dark:text-gray-200">
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
												<div className="flex items-center justify-start gap-2 font-medium text-sm h-full">
													<h3>
														( 2 x ₦
														{formatMoneyInput(
															price
														)}
														)
													</h3>
													=
													<h3>
														₦{" "}
														{formatMoneyInput(
															quantity * price
														)}
													</h3>
												</div>
											</div>
										</div>
									)
								)}
							</div>
							<div>
								<h4 className="mb-2 font-medium text-muted-foreground text-sm lg:text-base uppercase">
									Order summary
								</h4>

								<div className="text-sm text-muted-foreground dark:text-gray-200 grid gap-4 border p-4 rounded-lg font-medium">
									<p className="flex items-center justify-between gap-4">
										<span>Subtotal: </span>
										<span className="text-black dark:text-white">
											₦
											{formatMoneyInput(
												order.order.itemsPrice
											)}
										</span>
									</p>
									<p className="flex items-center justify-between gap-4">
										Shipping:{" "}
										<span className="text-black dark:text-white">
											₦{order.order.shippingPrice}
										</span>
									</p>
									<p className="text-black dark:text-white flex items-center justify-between gap-4">
										Total:
										<span>
											₦
											{formatMoneyInput(
												order.order.totalPrice
											)}
										</span>
									</p>
									{/* {!user?.user?.isAdmin &&
									!order?.order?.isPaid &&
									order.order.paymentMethod === "card" && (
										<Button
											className="w-full mt-4"
											size="lg"
										>
											Pay now
										</Button>
									)}
									{user?.user?.isAdmin &&
									order.order.paymentMethod ===
										"cash_on_delivery" &&
										!order?.order?.isPaid && (
										<Button
										className="w-full mt-4"
											size="lg"
											>
											Mark as paid
										</Button>
									)} */}
								</div>
							</div>
						</div>
					</div>
					<div className="col-span-2 lg:col-span-1 grid gap-4">
						<div className="p-8 rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-40  dark:border">
							<h4 className="font-medium text-muted-foreground dark:text-gray-100 text-sm lg:text-base uppercase">
								Customer
							</h4>
							<div className="text-sm mt-4">
								<p className="flex items-center justify-start gap-2">
									<Image
										src={order?.order?.user?.picture}
										alt={`${order?.order?.user?.firstName}'s picture`}
										width={1000}
										height={1000}
										className="size-8 object-cover rounded-full"
									/>
									<span>
										{order?.order?.user?.firstName}{" "}
										{order?.order?.user?.lastName}
									</span>
								</p>

								<div className="space-y-2 mt-4">
									<p>
										<a
											className="hover:underline hover:text-primary"
											href={`mailto:${order?.order?.user.email}`}
										>
											<Mail className="inline mr-2 size-4" />
											<span>
												{order?.order?.user?.email}{" "}
											</span>
										</a>
									</p>
									<p>
										{order?.order?.user?.phoneNumber ? (
											<a
												className="hover:underline hover:text-primary block"
												href={`tel:${order?.order?.user.phoneNumber}`}
											>
												<Phone className="inline mr-2 size-4" />
												<span>
													{
														order?.order?.user
															?.phoneNumber
													}{" "}
												</span>
											</a>
										) : (
											<p className="italic block">
												<Phone className="inline mr-2 size-4" />
												<span>
													No phone number found
												</span>
											</p>
										)}
									</p>
								</div>
							</div>
						</div>
						<div className="p-8 pb-4 rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-40  dark:border">
							<h4 className="font-medium text-muted-foreground dark:text-gray-100 text-sm lg:text-base uppercase">
								Shipping address
							</h4>
							<div className="text-sm mt-4 space-y-2">
								<p>
									<User className="inline mr-2 size-4" />
									<span>
										{
											order?.order?.shippingDetails
												?.firstName
										}{" "}
										{
											order?.order?.shippingDetails
												?.lastName
										}
									</span>
								</p>
								<p>
									<MapPinHouse className="inline mr-2 size-4" />
									<span>
										{order?.order?.shippingDetails?.address}
										, {order?.order?.shippingDetails?.city},{" "}
										{order?.order?.shippingDetails?.state},{" "}
										{order?.order?.shippingDetails?.country}{" "}
									</span>
								</p>
								<p>
									<Hash className="inline mr-2 size-4" />
									<span>
										Postal code:{" "}
										{
											order?.order?.shippingDetails
												?.postalCode
										}
									</span>
								</p>
								{order?.order?.orderStatus === "delivered" && (
									<InformationBox
										description={`Order has been ${order?.order?.orderStatus}`}
									/>
								)}
								{user?.user?.isAdmin &&
									order?.order?.isPaid &&
									order.order.orderStatus !== "delivered" && (
										<MarkAsDeliveredButton
											userId={user?.user._id}
											orderId={order?.order?._id}
										/>
									)}
								{!user?.user.isAdmin &&
									order?.order.orderStatus === "pending" && (
										<InformationBox
											description={`Order is still ${order?.order?.paymentStatus}`}
										/>
									)}
							</div>
						</div>
						<div className="p-8 pb-4 rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-40  dark:border">
							<h4 className="font-medium text-muted-foreground dark:text-gray-100 text-sm lg:text-base uppercase">
								Payment Information
							</h4>
							<div className="text-sm mt-4 space-y-2">
								<p>
									{order.order.paymentMethod ===
									"cash_on_delivery" ? (
										<Banknote className="inline mr-2 size-4" />
									) : order.order.paymentMethod === "card" ? (
										<CreditCard className="inline mr-2 size-4" />
									) : (
										<Smartphone className="inline mr-2 size-4" />
									)}
									<span>
										Payment method:{" "}
										{
											formattedPaymentMethod[
												order.order.paymentMethod
											]
										}
									</span>
								</p>
								{!user?.user.isAdmin &&
									order?.order.paymentStatus ===
										"pending" && (
										<InformationBox
											description={`Payment is still ${order?.order?.paymentStatus}`}
										/>
									)}
								{!user?.user?.isAdmin &&
									!order?.order?.isPaid &&
									order.order.paymentMethod === "card" && (
										<PaymentButton />
									)}
								{user?.user?.isAdmin &&
									order.order.paymentMethod ===
										"cash_on_delivery" &&
									!order?.order?.isPaid && (
										<MarkAsPaidButton
											userId={user?.user._id}
											orderId={order?.order?._id}
										/>
									)}
								{order?.order?.paymentStatus === "paid" && (
									<InformationBox
										description={`Order has been ${order?.order?.paymentStatus}`}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;
