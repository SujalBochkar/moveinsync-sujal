"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  User,
  Building2,
  AlertCircle,
  Calendar,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { format } from "date-fns";
import { Visitor } from "@/types/type";

interface VisitorListProps {
  date: Date;
  searchQuery: string;
  onSelectVisitor: (visitor: Visitor) => void;
}

export function VisitorList({
  date,
  searchQuery,
  onSelectVisitor,
}: VisitorListProps) {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        setIsLoading(true);
        const formattedDate = format(date, "yyyy-MM-dd");
        const response = await fetch(
          `/api/visitors?date=${formattedDate}&search=${searchQuery}`
        );
        const data = await response.json();
        setVisitors(data.visitors || []);
      } catch (error) {
        console.error("Failed to fetch visitors:", error);
        setVisitors([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVisitors();
  }, [date, searchQuery]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600"></div>
          <p className="mt-4 text-sm text-slate-600">Loading visitors...</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    const colors = {
      CHECKED_IN: {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        dot: "bg-emerald-500",
      },
      OVERSTAY: { bg: "bg-rose-50", text: "text-rose-700", dot: "bg-rose-500" },
      PENDING: {
        bg: "bg-amber-50",
        text: "text-amber-700",
        dot: "bg-amber-500",
      },
      default: {
        bg: "bg-slate-50",
        text: "text-slate-700",
        dot: "bg-slate-500",
      },
    };
    return colors[status as keyof typeof colors] || colors.default;
  };

  return (
    <div className="divide-y divide-slate-200">
      <AnimatePresence mode="popLayout">
        {visitors.map((visitor, index) => {
          const statusColor = getStatusColor(visitor.status);

          return (
            <motion.div
              key={visitor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              onClick={() => onSelectVisitor(visitor)}
              className="group relative flex items-center gap-4 bg-white px-6 py-4 transition-all hover:bg-slate-50"
            >
              {/* Visitor Avatar */}
              <div className="relative shrink-0">
                <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gradient-to-br from-slate-100 to-slate-200">
                  <div className="absolute inset-0 flex items-center justify-center text-lg font-medium text-slate-600">
                    {visitor.name.charAt(0).toUpperCase()}
                  </div>
                </div>
                <span
                  className={`absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white ${statusColor.dot}`}
                />
              </div>

              {/* Visitor Info */}
              <div className="flex flex-1 items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-slate-900">
                      {visitor.name}
                    </h3>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor.bg} ${statusColor.text}`}
                    >
                      {visitor.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    {visitor.checkInTime && (
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        <span>
                          {format(new Date(visitor.checkInTime), "hh:mm a")}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      <span>{visitor.office}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="h-4 w-4" />
                      <span>{visitor.host?.name}</span>
                    </div>
                  </div>
                </div>

                {/* Purpose Tag & Action */}
                <div className="flex items-center gap-4">
                  {visitor.purpose && (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      {visitor.purpose}
                    </span>
                  )}
                  <ChevronRight className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {visitors.length === 0 && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center px-6 py-16"
        >
          <div className="rounded-full bg-slate-100 p-3">
            <User className="h-6 w-6 text-slate-400" />
          </div>
          <h3 className="mt-4 font-medium text-slate-900">No visitors found</h3>
          <p className="mt-1 text-center text-sm text-slate-500">
            Try adjusting your search criteria or date range
          </p>
        </motion.div>
      )}
    </div>
  );
}
