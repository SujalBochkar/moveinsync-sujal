"use client";

import { useState, useCallback } from "react";
import { Search, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Guest } from "@/types/type";

interface User {
  id: string;
  name: string;
  email: string;
  department?: string;
}

interface SearchEmployeesProps {
  onAddGuest: (guest: Guest) => void;
}

export function SearchEmployees({ onAddGuest }: SearchEmployeesProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/users/search?q=${query}`);
      const data = await response.json();
      setSearchResults(data.users);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAddGuest = (user: User) => {
    const guest: Guest = {
      id: user.id,
      name: user.name,
      email: user.email,
      department: user.department,
      initials: user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
    };
    onAddGuest(guest);
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <div className="relative">
      <div
        className={`relative flex items-center rounded-lg border bg-white transition-all duration-200
          ${
            isFocused
              ? "border-blue-500 ring-2 ring-blue-100"
              : "border-slate-200 hover:border-slate-300"
          }`}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
          ) : (
            <Search className="h-5 w-5 text-slate-400" />
          )}
        </div>
        <input
          type="text"
          placeholder="Search by name, email or department"
          className="w-full rounded-lg border-0 py-3 pl-10 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            handleSearch(e.target.value);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>

      <AnimatePresence>
        {searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 mt-2 w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg"
          >
            <div className="max-h-64 overflow-y-auto py-1">
              {searchResults.map((user) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="group cursor-pointer px-4 py-2 transition-colors hover:bg-slate-50"
                  onClick={() => handleAddGuest(user)}
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-sm font-medium text-slate-900">
                        {user.name}
                      </h4>
                      <p className="truncate text-sm text-slate-500">
                        {user.email}
                      </p>
                      {user.department && (
                        <p className="mt-1 text-xs text-slate-400">
                          {user.department}
                        </p>
                      )}
                    </div>
                    <div className="ml-3 flex-shrink-0">
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 opacity-0 transition-opacity group-hover:opacity-100">
                        Add
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
