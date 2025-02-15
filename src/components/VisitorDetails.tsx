"use client";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  X,
  User,
  Mail,
  Clock,
  CheckCircle,
  LogOut,
  MapPin,
  Briefcase,
  Phone,
  Calendar,
} from "lucide-react";
import type { Visitor } from "@/types/type";

interface VisitorDetailsProps {
  visitor: Visitor;
  onClose: () => void;
}

export function VisitorDetails({ visitor, onClose }: VisitorDetailsProps) {
  const handleCheckOut = async () => {
    try {
      await fetch(`/api/visitors/${visitor.id}/check-out`, {
        method: "POST",
      });
    } catch (error) {
      console.error("Failed to check out visitor:", error);
    }
  };

  const getStatusConfig = (status: string) => {
    const config = {
      CHECKED_IN: {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        icon: CheckCircle,
      },
      PENDING: {
        bg: "bg-amber-50",
        text: "text-amber-700",
        icon: Clock,
      },
      OVERSTAY: {
        bg: "bg-rose-50",
        text: "text-rose-700",
        icon: Clock,
      },
    };
    return config[status as keyof typeof config];
  };

  const statusConfig = getStatusConfig(visitor.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5"
    >
      {/* Header */}
      <div className="relative px-6 pt-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200">
              <div className="absolute inset-0 flex items-center justify-center text-2xl font-semibold text-slate-600">
                {visitor.name.charAt(0).toUpperCase()}
              </div>
            </div>
            <div
              className={`absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white ${statusConfig?.bg}`}
            >
              {statusConfig?.icon && (
                <statusConfig.icon
                  className={`h-3.5 w-3.5 ${statusConfig.text}`}
                />
              )}
            </div>
          </div>

          <div className="mt-4 space-y-1">
            <h2 className="text-xl font-semibold text-slate-900">
              {visitor.name}
            </h2>
            <div className="flex items-center justify-center gap-2">
              <span
                className={`rounded-full px-3 py-0.5 text-sm font-medium ${statusConfig?.bg} ${statusConfig?.text}`}
              >
                {visitor.status}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-0.5 text-sm font-medium text-slate-600">
                {visitor.type}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-6 space-y-6 px-6 pb-6">
        {/* Time Section */}
        <div className="grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-slate-400" />
              <span className="text-sm text-slate-600">Check In</span>
            </div>
            <p className="text-sm font-medium text-slate-900">
              {visitor.checkInTime
                ? format(new Date(visitor.checkInTime), "hh:mm a")
                : "Not checked in"}
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-slate-400" />
              <span className="text-sm text-slate-600">Expected Out</span>
            </div>
            <p className="text-sm font-medium text-slate-900">
              {visitor.expectedCheckOut
                ? format(new Date(visitor.expectedCheckOut), "hh:mm a")
                : "Not set"}
            </p>
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-4">
          <div className="grid gap-3">
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition-colors hover:bg-slate-50">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50">
                <Briefcase className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-slate-900">
                  {visitor.purpose}
                </div>
                <div className="text-sm text-slate-500">Visit Purpose</div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition-colors hover:bg-slate-50">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50">
                <MapPin className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-slate-900">
                  {visitor.office}
                </div>
                <div className="text-sm text-slate-500">Office Location</div>
              </div>
            </div>
          </div>
        </div>

        {/* Host Section */}
        {visitor.host && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-slate-900">Host Details</h3>
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-indigo-50">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="text-sm font-medium text-slate-900">
                    {visitor.host.name}
                  </div>
                  {visitor.host.email && (
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Mail className="h-4 w-4" />
                      <span>{visitor.host.email}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        {visitor.status === "CHECKED_IN" && (
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleCheckOut}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600
                     px-4 py-3 text-sm font-medium text-white shadow-lg shadow-blue-600/10 transition-all
                     hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-blue-600/20"
          >
            <LogOut className="h-4 w-4" />
            Check Out Visitor
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
