"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Mail,
  Building,
  User,
  Clock,
  CheckCircle,
  XCircle,
  Briefcase,
  ArrowRight,
} from "lucide-react";

const mockVisitors = [
  {
    id: "1",
    visitorName: "John Doe",
    visitorEmail: "john@example.com",
    visitorCompany: "ABC Corp",
    purpose: "Business Meeting",
    visitDate: "2025-02-15",
    visitTime: "10:00",
    hostName: "Jane Smith",
    hostEmail: "jane@company.com",
  },
  {
    id: "2",
    visitorName: "Alice Johnson",
    visitorEmail: "alice@example.com",
    visitorCompany: "XYZ Ltd",
    purpose: "Interview",
    visitDate: "2025-02-14",
    visitTime: "14:30",
    hostName: "Bob Wilson",
    hostEmail: "bob@company.com",
  },
  {
    id: "3", // Fixed duplicate ID
    visitorName: "Shiva",
    visitorEmail: "Shiva@example.com",
    visitorCompany: "XYZ Ltd",
    purpose: "Interview",
    visitDate: "2025-02-14",
    visitTime: "7:30",
    hostName: "Sujal Bochkar",
    hostEmail: "sujalbochkar@gmail.com",
  },
];

export default function SendEmail() {
  const [selectedVisitor, setSelectedVisitor] = useState(mockVisitors[0]);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSendEmail = async (visitorId: string) => {
    setStatus("loading");
    try {
      const visitor = mockVisitors.find((v) => v.id === visitorId);
      if (!visitor) throw new Error("Visitor not found");

      const response = await fetch("/api/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(visitor),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("Approval request sent to host successfully!");
      } else {
        throw new Error(data.message || "Failed to send email");
      }
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Failed to send email"
      );
    }
  };

  const handleTestApprovalFlow = async (approved: boolean) => {
    try {
      setStatus("loading"); // Add loading state
      const response = await fetch("/api/emails", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorData: selectedVisitor,
          status: approved ? "approved" : "rejected",
          token: "test-token-123",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(
          `Test ${approved ? "approval" : "rejection"} email sent to visitor!`
        );
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Failed to send test email"
      );
    } finally {
      setTimeout(() => {
        setStatus("idle"); // Reset status after 3 seconds
        setMessage("");
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 pt-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Email Testing
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Test visitor approval flow and email notifications
            </p>
          </div>
        </div>

        {/* Visitor Selection */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {mockVisitors.map((visitor) => (
            <motion.div
              key={visitor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2 }}
              onClick={() => setSelectedVisitor(visitor)}
              className={`cursor-pointer overflow-hidden rounded-2xl border bg-white transition-all ${
                selectedVisitor.id === visitor.id
                  ? "border-blue-200 bg-blue-50/50 shadow-md ring-1 ring-blue-200"
                  : "border-slate-200 shadow-sm hover:shadow-md"
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-slate-100 to-slate-200">
                      <User className="h-6 w-6 text-slate-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">
                        {visitor.visitorName}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {visitor.visitorEmail}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    {visitor.visitorCompany}
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar className="h-4 w-4" />
                    <span>{visitor.visitDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="h-4 w-4" />
                    <span>{visitor.visitTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Building className="h-4 w-4" />
                    <span>{visitor.hostName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Briefcase className="h-4 w-4" />
                    <span>{visitor.purpose}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Cards */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Host Approval Request */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-900">
                  Host Approval Request
                </h3>
                <p className="text-sm text-slate-500">
                  Send approval request to host
                </p>
              </div>
            </div>
            <button
              onClick={() => handleSendEmail(selectedVisitor.id)}
              disabled={status === "loading"}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md disabled:opacity-50"
            >
              {status === "loading" ? "Sending..." : "Send Request"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Test Response */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50">
                <CheckCircle className="h-6 w-6 text-slate-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-900">
                  Test Host Response
                </h3>
                <p className="text-sm text-slate-500">
                  Simulate host approval/rejection
                </p>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => handleTestApprovalFlow(true)}
                disabled={status === "loading"}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 shadow-sm transition-all hover:bg-emerald-100 disabled:opacity-50"
              >
                <CheckCircle className="h-4 w-4" />
                {status === "loading" ? "Processing..." : "Approve"}
              </button>
              <button
                onClick={() => handleTestApprovalFlow(false)}
                disabled={status === "loading"}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 shadow-sm transition-all hover:bg-rose-100 disabled:opacity-50"
              >
                <XCircle className="h-4 w-4" />
                {status === "loading" ? "Processing..." : "Reject"}
              </button>
            </div>
          </div>
        </div>

        {/* Status Message */}
        <AnimatePresence mode="wait">
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mt-6 rounded-xl p-4 ${
                status === "success"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-rose-50 text-rose-700"
              }`}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
