import { Star } from "lucide-react";
import React from "react";

const Ratings = () => {
	return (
		<div className="flex gap-2">
			<div className="flex gap-0.5">
				<Star className="size-5" />
				<Star className="size-5" />
				<Star className="size-5" />
				<Star className="size-5" />
			</div>
			<p className="text-base font-medium">(18)</p>
		</div>
	);
};

export default Ratings;
