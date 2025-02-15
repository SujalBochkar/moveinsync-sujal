"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Users } from "lucide-react";
import { Guest } from "@/types/type";

interface AddedGuestsProps {
  guests: Guest[];
  onRemoveGuest: (index: number) => void;
}

export function AddedGuests({ guests, onRemoveGuest }: AddedGuestsProps) {
  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-slate-400" />
          <h3 className="text-sm font-medium text-slate-900">Added Hosts</h3>
          <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-600">
            {guests.length}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {guests.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-lg border border-dashed border-slate-300 bg-slate-50/50 px-4 py-4"
            >
              <div className="text-center">
                <Users className="mx-auto h-6 w-6 text-slate-400" />
                <p className="mt-1 text-sm font-medium text-slate-900">
                  No hosts added yet
                </p>
                <p className="mt-0.5 text-sm text-slate-500">
                  Search and add hosts above
                </p>
              </div>
            </motion.div>
          ) : (
            guests.map((guest, index) => (
              <motion.div
                key={guest.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="group relative rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex min-w-0 flex-1 items-center space-x-3">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      <span className="text-sm font-medium">
                        {guest.initials}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-900">
                        {guest.name}
                      </p>
                      {guest.email && (
                        <p className="truncate text-sm text-slate-500">
                          {guest.email}
                        </p>
                      )}
                      {guest.department && (
                        <p className="mt-0.5 text-xs text-slate-400">
                          {guest.department}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveGuest(index)}
                    className="ml-4 flex-shrink-0 rounded-full p-1 text-slate-400 opacity-0 transition-opacity hover:bg-slate-50 hover:text-slate-500 group-hover:opacity-100"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
