import { IconType } from "react-icons";

export enum ChartType {
  Line = "line",
  Bar = "bar",
  Pie = "pie",
  Doughnut = "doughnut",
  Radar = "radar",
}

export interface BaseChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
  }[];
}

export interface StatCardType {
  title: string;
  value: string;
  icon: IconType;
  trend: "up" | "down" | "neutral";
  change: number;
}
