"use client";

import { useEffect, useState, useCallback } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { motion } from "framer-motion";

interface VisitorTrend {
  date: string;
  visitors: number;
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active: boolean;
  payload: { value: number }[];
  label: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-sm border border-gray-100 p-4 rounded-lg shadow-lg">
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-lg font-bold text-blue-600">
          {payload[0].value} visitors
        </p>
      </div>
    );
  }
  return null;
};

const CustomizedDot = ({ cx, cy }: { cx: number; cy: number }) => (
  <circle cx={cx} cy={cy} r={4} fill="#3B82F6" className="drop-shadow-md" />
);

export function VisitorChart() {
  const [data, setData] = useState<VisitorTrend[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week");

  const fetchChartData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/dashboard/visitor-trends?range=${timeRange}`
      );
      const data = await response.json();
      setData(data.trends);
    } catch (error) {
      console.error("Failed to fetch visitor trends:", error);
    } finally {
      setIsLoading(false);
    }
  }, [timeRange]);

  useEffect(() => {
    fetchChartData();
  }, [fetchChartData]);

  const getMaxVisitors = () => {
    return Math.max(...data.map((item) => item.visitors));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {isLoading ? "Loading..." : `Peak: ${getMaxVisitors()} visitors`}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {["week", "month", "year"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range as "week" | "month" | "year")}
              className={`px-3 py-1 text-sm rounded-full transition-all ${
                timeRange === range
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {""}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              dx={-10}
            />
            <Tooltip
              content={<CustomTooltip active={false} payload={[]} label={""} />}
            />
            <Area
              type="monotone"
              dataKey="visitors"
              stroke="#3B82F6"
              strokeWidth={2}
              fill="url(#colorVisitors)"
              dot={<CustomizedDot cx={0} cy={0} />}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
