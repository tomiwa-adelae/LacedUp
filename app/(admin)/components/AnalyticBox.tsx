"use client";
import { ChartSpline, TrendingDown, TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
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
	number: string | number;
	percentage: string | number;
	direction: any;
	dateRange?: string;
}

export const AnalyticBox = ({
	title,
	description,
	number,
	percentage,
	direction,
	dateRange,
}: Props) => {
	return (
		<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 pb-6 rounded-lg dark:border">
			<div>
				<h4 className="font-medium text-base">{title}</h4>
				<p className="text-xs mt-1 text-muted-foreground">
					{description}
				</p>
			</div>
			<div className="flex-1 mt-8">
				<h3 className="font-semibold text-3xl">{number}</h3>
				<div className="flex items-center justify-between gap-4">
					<p className="text-sm mt-1 text-muted-foreground">
						{dateRange}
					</p>
					<div className="text-green-400 font-medium text-sm">
						{direction === "up" ? (
							<TrendingUp className="size-4 inline mr-2" />
						) : (
							<TrendingDown className="size-4 inline mr-2" />
						)}
						<span>{percentage}%</span>
					</div>
				</div>
			</div>
		</div>
	);
};
