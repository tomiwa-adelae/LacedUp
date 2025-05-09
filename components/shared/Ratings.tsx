import { Star } from "lucide-react";
import React from "react";

const Ratings = () => {
	return (
		<div className="flex items-center justify-start gap-2">
			<div className="flex gap-0.5">
				<Star className="size-4" />
				<Star className="size-4" />
				<Star className="size-4" />
				<Star className="size-4" />
			</div>
			<p className="text-sm font-medium">(18)</p>
		</div>
	);
};

export default Ratings;
