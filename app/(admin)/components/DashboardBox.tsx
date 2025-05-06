"use client";
import { ChartSpline, TrendingDown } from "lucide-react";
import { TrendingUp } from "lucide-react";
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
	number: string;
	percentage: string;
	direction: string;
}

export const DashboardBox = ({
	title,
	description,
	number,
	percentage,
	direction,
}: Props) => {
	return (
		<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-4 rounded-lg dark:border">
			<div className="flex items-center justify-start gap-4">
				<h4 className="font-medium text-base">{title}</h4>
				<span
					className={`text-xs  ${
						direction === "up"
							? "bg-green-100 text-green-400 border-green-400"
							: "bg-red-100 text-red-400 border-red-400"
					} p-1 rounded-lg border`}
				>
					{direction === "up" ? (
						<TrendingUp className="size-4 inline" />
					) : (
						<TrendingDown className="size-4 inline" />
					)}
					<span> {percentage}</span>
				</span>
			</div>
			<div className="flex items-center justify-between gap-4 mt-4">
				<div className="flex-1">
					<h3 className="font-semibold text-3xl">{number}</h3>
					<p className="text-xs mt-1 text-muted-foreground">
						{description}
					</p>
				</div>
				<div className="w-24">
					<ChartContainer config={chartConfig}>
						<LineChart
							accessibilityLayer
							data={chartData}
							margin={{
								left: 12,
								right: 12,
							}}
						>
							<CartesianGrid vertical={false} />
							{/* <XAxis
								dataKey="month"
								tickLine={false}
								axisLine={false}
								tickMargin={8}
								tickFormatter={(value) => value.slice(0, 3)}
							/> */}
							<ChartTooltip
								cursor={false}
								content={<ChartTooltipContent hideLabel />}
							/>
							<Line
								dataKey="desktop"
								type="natural"
								stroke="green"
								strokeWidth={2}
								dot={false}
							/>
						</LineChart>
					</ChartContainer>
				</div>
			</div>
		</div>
	);
};
