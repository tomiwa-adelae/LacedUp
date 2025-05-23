import { redirect } from "next/navigation";
import { ShopNew } from "@/components/ShopNew";
import { BestSellers } from "@/components/BestSellers";
import { AllProducts } from "@/components/AllProducts";
import { Showcase } from "@/components/shared/Showcase";
import { ShopCategory } from "@/components/ShopCategory";
import { Separator } from "@/components/ui/separator";
import JoinWaitlist from "@/components/shared/JoinWaitlist";
import {
	getAllProducts,
	getNewProducts,
	getTopProducts,
} from "@/lib/actions/product.actions";
import { Header } from "@/components/shared/Header";
import { currentUser } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/user.actions";

const page = async () => {
	const clerkUser = await currentUser();
	const user = await getUserInfo(clerkUser?.id!);
	const newProducts = await getNewProducts({});
	const topProducts = await getTopProducts();
	const products = await getAllProducts({});

	// if (newProducts.status === 400) redirect("/not-found");

	return (
		<div>
			<Header search={true} user={user?.user} />
			<Showcase
				title={
					<>
						Lace up &{" "}
						<span className="text-primary">Stand out.</span>
					</>
				}
				description="Discover premium footwear for every occasion. From
						limited edition sneakers to timeless classics, find your
						perfect pair at LacedUp and elevate your stride."
				cta={[{ slug: "/new", label: "Shop now" }]}
				image={"/assets/images/showcase-img.png"}
			/>
			<div className="container">
				<Separator />
			</div>
			<ShopNew products={newProducts?.products} />
			<div className="container">
				<Separator />
			</div>
			<ShopCategory />
			<div className="container">
				<Separator />
			</div>
			<BestSellers products={topProducts?.products} />
			<div className="container">
				<Separator />
			</div>
			<AllProducts products={products?.products} />
			<div className="container">
				<Separator />
			</div>
			<JoinWaitlist />
		</div>
	);
};

export default page;
