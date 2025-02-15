import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend: string;
  trendValue?: number;
  isIncreasing?: boolean;
  color?: "blue" | "green" | "red";
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  isIncreasing,
  color = "blue",
}: StatCardProps) {
  const colorClasses = {
    blue: {
      background: "bg-gradient-to-br from-blue-50 to-blue-100/50",
      icon: "text-blue-600",
      border: "border-blue-100",
      ring: "ring-blue-100",
      trend: "text-blue-600",
    },
    green: {
      background: "bg-gradient-to-br from-green-50 to-green-100/50",
      icon: "text-green-600",
      border: "border-green-100",
      ring: "ring-green-100",
      trend: "text-green-600",
    },
    red: {
      background: "bg-gradient-to-br from-red-50 to-red-100/50",
      icon: "text-red-600",
      border: "border-red-100",
      ring: "ring-red-100",
      trend: "text-red-600",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden rounded-2xl border ${colorClasses[color].border}
        ${colorClasses[color].background} p-6 shadow-sm transition-all duration-200
        hover:shadow-md hover:translate-y-[-2px] hover:ring-2 ${colorClasses[color].ring}`}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div
              className={`rounded-xl bg-white/80 p-2.5 backdrop-blur-sm ${colorClasses[color].icon}`}
            >
              <Icon className="h-6 w-6" />
            </div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
          </div>

          <div className="space-y-2">
            <motion.h2
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="text-3xl font-bold text-gray-800"
            >
              {value.toLocaleString()}
            </motion.h2>

            <div className="flex items-center space-x-2">
              {isIncreasing !== undefined && (
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: isIncreasing ? 0 : 180 }}
                  className={`flex items-center ${
                    isIncreasing ? "text-green-600" : "text-red-600"
                  }`}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </motion.div>
              )}
              <div className="flex items-baseline space-x-1">
                {trendValue && (
                  <span
                    className={`font-semibold ${colorClasses[color].trend}`}
                  >
                    {trendValue}%
                  </span>
                )}
                <span className="text-sm text-gray-500">{trend}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute right-2 top-2 h-24 w-24 opacity-10">
          <Icon className="h-full w-full" />
        </div>
      </div>

      <div className="mt-4 h-1 w-full rounded-full bg-gray-200">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, (value / 100) * 100)}%` }}
          className={`h-full rounded-full ${colorClasses[color].background}`}
        />
      </div>
    </motion.div>
  );
}
