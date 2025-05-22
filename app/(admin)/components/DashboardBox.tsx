"use client";
import { Icon, TrendingDown } from "lucide-react";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart } from "recharts";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
	{ month: "January", desktop: 186 },
	{ month: "February", desktop: 305 },
	{ month: "March", desktop: 237 },
	{ month: "April", desktop: 73 },
	{ month: "May", desktop: 209 },
	{ month: "June", desktop: 214 },
];

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig;

interface Props {
	title: string;
	description: string;
	icon: any;
	number: string;
}

export const DashboardBox = ({ title, description, icon, number }: Props) => {
	const Icon = icon;
	return (
		<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 pb-6 rounded-lg dark:border">
			<div>
				<div className="flex justify-between items-start">
					<div>
						<h4 className="font-medium text-base">{title}</h4>
						<p className="text-xs mt-1 text-muted-foreground">
							{description}
						</p>
					</div>
					<div className="bg-primary/10 p-2 rounded-full">
						<Icon className="h-6 w-6 text-primary" />
					</div>
				</div>
				<h3 className="mt-8 font-semibold text-3xl">{number}</h3>
			</div>
		</div>
	);
};
