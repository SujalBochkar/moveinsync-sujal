"use client";

import { useState } from "react";
import { Search, Calendar, Building2, Users, Filter, Plus } from "lucide-react";
import { VisitorList } from "@/components/VisitorList";
import { VisitorDetails } from "@/components/VisitorDetails";
import { motion, AnimatePresence } from "framer-motion";
import { Visitor } from "@/types/type";
import { format } from "date-fns";

export default function FrontDeskPage() {
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState(new Date());

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 pt-24">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        {/* Top Stats Section */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:shadow-md">
              <Calendar className="h-5 w-5 text-slate-400" />
              <input
                type="date"
                value={format(date, "yyyy-MM-dd")}
                onChange={(e) => setDate(new Date(e.target.value))}
                className="border-0 bg-transparent p-0 text-sm font-medium text-slate-900 focus:outline-none focus:ring-0"
              />
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 px-4 py-3 backdrop-blur-sm">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">
                24 Visitors Today
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm font-medium text-slate-600 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:shadow-md">
              <Filter className="h-4 w-4" />
              Filter
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md hover:from-blue-700 hover:to-indigo-700">
              <Plus className="h-4 w-4" />
              New Visitor
            </button>
          </div>
        </div>

        {/* Search Section */}
        <div className="mb-6">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search visitors by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white/80 py-3 pl-11 pr-4 text-sm text-slate-900
                       placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-8">
          <div className="flex-1">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur-sm">
              <div className="border-b border-slate-200 bg-white px-6 py-4">
                <h2 className="text-lg font-semibold text-slate-900">
                  Today&apos;s Visitors
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  View and manage visitor check-ins and check-outs
                </p>
              </div>
              <VisitorList
                date={date}
                searchQuery={searchQuery}
                onSelectVisitor={setSelectedVisitor}
              />
            </div>
          </div>

          <div className="hidden w-[440px] shrink-0 lg:block">
            <div className="sticky top-24">
              <AnimatePresence mode="wait">
                {selectedVisitor && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <VisitorDetails
                      visitor={selectedVisitor}
                      onClose={() => setSelectedVisitor(null)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
