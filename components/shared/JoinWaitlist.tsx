import React from "react";
import WaitlistForm from "../forms/WaitlistForm";

const JoinWaitlist = () => {
	return (
		<div className="bg-black text-white py-16">
			<div className="container">
				<div className="flex items-center justify-between gap-8">
					<div>
						<h2 className="text-xl md:text-2xl uppercase font-semibold">
							Join Our List, Get 10% Off
						</h2>
						<p className="mt-2 text-base md:w-7/12">
							Sign up for LacedUp emails—new subscribers get 10%
							off a future order!* Plus, get early access to
							sales, coupons, and more. (One code per email
							address.)
						</p>
					</div>
				</div>
				<WaitlistForm />
			</div>
		</div>
	);
};

export default JoinWaitlist;
