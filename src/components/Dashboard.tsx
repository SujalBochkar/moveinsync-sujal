"use client";

import React, { useState, useEffect } from "react";
import { StatCard } from "./StatCard";
import { Users, UserCheck, Clock, AlertTriangle } from "lucide-react";
import { VisitorChart } from "./VisitorChart";
import { RecentVisitors } from "./RecentVisitors";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalVisitors: 0,
    checkedIn: 0,
    expected: 0,
    overstay: 0,
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await fetch("/api/dashboard/stats");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
    };
    setIsLoading(true);
    fetchDashboardStats();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex flex-col space-y-2">
            <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-200" />
            <div className="h-4 w-96 animate-pulse rounded-lg bg-slate-200" />
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 animate-pulse rounded-lg bg-slate-200" />
                <div className="h-4 w-16 animate-pulse rounded-lg bg-slate-200" />
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-7 w-24 animate-pulse rounded-lg bg-slate-200" />
                <div className="h-4 w-32 animate-pulse rounded-lg bg-slate-200" />
              </div>
            </div>
          ))}
        </div>

        <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 h-6 w-48 animate-pulse rounded-lg bg-slate-200" />
          <div className="h-[300px] animate-pulse rounded-lg bg-slate-200" />
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 h-6 w-48 animate-pulse rounded-lg bg-slate-200" />
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="h-10 w-10 animate-pulse rounded-full bg-slate-200" />
                <div className="space-y-2">
                  <div className="h-4 w-48 animate-pulse rounded-lg bg-slate-200" />
                  <div className="h-3 w-32 animate-pulse rounded-lg bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome Back 👋
          </h1>
          <p className="text-base text-gray-600">
            Here&apos;s what&apos;s happening with your visitors today.
          </p>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Visitors"
          value={stats.totalVisitors + 12}
          icon={Users}
          trend="from last week"
          trendValue={12}
          isIncreasing={true}
          color="blue"
        />
        <StatCard
          title="Currently Checked In"
          value={stats.checkedIn + 8}
          icon={UserCheck}
          trend="Active now"
          trendValue={5}
          isIncreasing={true}
          color="green"
        />
        <StatCard
          title="Expected Today"
          value={stats.expected + 1}
          icon={Clock}
          trend="Upcoming"
          trendValue={8}
          isIncreasing={true}
          color="blue"
        />
        <StatCard
          title="Overstay"
          value={stats.overstay }
          icon={AlertTriangle}
          trend="Needs attention"
          trendValue={3}
          isIncreasing={false}
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-5">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Visitor Trends
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Visitor activity over time
              </p>
            </div>
          </div>
          <div className="mt-6">
            <VisitorChart />
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-5">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Visitors
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Latest visitor activity
              </p>
            </div>
          </div>
          <div className="mt-6">
            <RecentVisitors />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
