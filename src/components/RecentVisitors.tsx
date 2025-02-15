"use client";

import { useEffect, useState, useCallback } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { User, Clock, ArrowRight } from "lucide-react";

interface RecentVisitor {
  id: string;
  name: string;
  purpose: string;
  checkInTime: string;
  status: string;
  host?: {
    name: string;
  };
}

export function RecentVisitors() {
  const [visitors, setVisitors] = useState<RecentVisitor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRecentVisitors = useCallback(async () => {
    try {
      const response = await fetch("/api/dashboard/recent-visitors");
      const data = await response.json();
      setVisitors(data.visitors);
    } catch (error) {
      console.error("Failed to fetch recent visitors:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecentVisitors();
  }, [fetchRecentVisitors]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {visitors.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <User className="w-12 h-12 mb-2 stroke-1" />
          <p className="text-sm">No recent visitors</p>
        </div>
      ) : (
        visitors.map((visitor, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            key={visitor.id}
            className="group relative flex items-center gap-4 rounded-xl bg-gray-50/50 p-4 transition-all hover:bg-gray-50"
          >
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <span className="text-lg font-semibold">
                    {visitor.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span
                  className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                    visitor.status === "CHECKED_IN"
                      ? "bg-green-500"
                      : "bg-gray-400"
                  }`}
                />
              </div>
            </div>

            <div className="flex flex-1 flex-col">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">{visitor.name}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="mr-1 h-4 w-4" />
                  {format(new Date(visitor.checkInTime), "h:mm a")}
                </div>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {visitor.purpose}
                  </span>
                  {visitor.host && (
                    <>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm text-gray-500">
                        Host: {visitor.host.name}
                      </span>
                    </>
                  )}
                </div>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    visitor.status === "CHECKED_IN"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {visitor.status}
                </span>
              </div>
            </div>

            <div className="absolute right-2 top-1/2 -translate-y-1/2 transform opacity-0 transition-opacity group-hover:opacity-100">
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
}
