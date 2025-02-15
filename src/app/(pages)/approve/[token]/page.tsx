"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  AlertTriangle,
  Loader2,
  ArrowLeft,
  Building2,
} from "lucide-react";

interface ApproveVisitProps {
  params: Promise<{ token: string }>;
}

export default function ApproveVisit({ params }: ApproveVisitProps) {
  const { token } = use(params);
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const router = useRouter();

  useEffect(() => {
    const approveVisit = async () => {
      try {
        const response = await fetch(`/api/visitors/approve/${token}`, {
          method: "POST",
        });

        if (response.ok) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error("Error approving visit:", error);
        setStatus("error");
      }
    };

    approveVisit();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="mx-auto max-w-lg px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 p-2.5">
              <Building2 className="h-full w-full text-blue-600" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-slate-900">
            Visit Approval
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Please wait while we process your response
          </p>
        </div>

        <div className="mt-8">
          <AnimatePresence mode="wait">
            {status === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="rounded-2xl bg-white p-8 shadow-xl ring-1 ring-black/5"
              >
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="h-16 w-16 animate-pulse rounded-full bg-blue-100" />
                    <Loader2 className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-spin text-blue-600" />
                  </div>
                  <h3 className="mt-6 text-lg font-medium text-slate-900">
                    Processing Your Request
                  </h3>
                  <p className="mt-2 text-center text-sm text-slate-600">
                    Please wait while we verify and process your approval...
                  </p>
                </div>
              </motion.div>
            )}

            {status === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5"
              >
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 px-8 py-6">
                  <div className="flex items-center justify-center">
                    <div className="rounded-full bg-white p-2 shadow-sm">
                      <div className="rounded-full bg-emerald-500 p-2">
                        <Check className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-8 py-6">
                  <h3 className="text-center text-xl font-semibold text-slate-900">
                    Visit Successfully Approved
                  </h3>
                  <p className="mt-2 text-center text-sm text-slate-600">
                    The visitor has been notified and will receive their entry
                    pass via email.
                  </p>

                  <div className="mt-6">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => router.push("/")}
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r
                               from-blue-500 to-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-lg
                               shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/35"
                    >
                      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                      Return to Dashboard
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5"
              >
                <div className="bg-gradient-to-br from-rose-50 to-rose-100 px-8 py-6">
                  <div className="flex items-center justify-center">
                    <div className="rounded-full bg-white p-2 shadow-sm">
                      <div className="rounded-full bg-rose-500 p-2">
                        <AlertTriangle className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-8 py-6">
                  <h3 className="text-center text-xl font-semibold text-slate-900">
                    Approval Failed
                  </h3>
                  <p className="mt-2 text-center text-sm text-slate-600">
                    We couldn&apos;t process your approval. The link might be
                    expired or invalid.
                  </p>

                  <div className="mt-6">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => router.push("/")}
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800
                               px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-slate-900"
                    >
                      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                      Return to Dashboard
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
