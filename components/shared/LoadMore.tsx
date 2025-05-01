import { Button } from "../ui/button";

const LoadMore = () => {
	return (
		<div className="flex flex-col items-center justify-center gap-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] aspect-auto w-[250px] lg:w-[400px] rounded-lg object-cover hover:bg-accent dark:hover:bg-accent/50 cursor-pointer">
			<Button variant={"ghost"} size={"lg"}>
				Load more
			</Button>
		</div>
	);
};

export default LoadMore;
