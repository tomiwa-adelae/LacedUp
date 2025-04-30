import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const WaitlistForm = () => {
	return (
		<div className="mt-8 relative flex flex-col sm:flex-row max-w-4xl gap-8">
			<div className="flex-1">
				<Input
					className="rounded-full flex-1 border-2 border-white"
					placeholder={"Email address"}
				/>
			</div>
			<Button
				className="sm:absolute top-[50%] right-[2px] translate-x-[-2px] translate-y-[-50%] w-full sm:w-auto"
				size="md"
			>
				Join the party
			</Button>
		</div>
	);
};

export default WaitlistForm;
