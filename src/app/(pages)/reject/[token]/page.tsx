"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  AlertTriangle,
  Loader2,
  ArrowLeft,
  Building2,
  Send,
  MessageSquare,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface RejectVisitProps {
  params: Promise<{ token: string }>;
}

export default function RejectVisit({ params }: RejectVisitProps) {
  const { token } = use(params);
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const rejectVisit = async () => {
      try {
        const response = await fetch(`/api/visitors/reject/${token}`, {
          method: "POST",
        });

        if (response.ok) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error("Error rejecting visit:", error);
        setStatus("error");
      }
    };

    rejectVisit();
  }, [token]);

  const handleSendMessage = async () => {
    try {
      toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
        loading: "Sending message...",
        success: "Message sent successfully",
        error: "Failed to send message",
      });
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push("/");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="mx-auto max-w-lg px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 p-2.5">
              <Building2 className="h-full w-full text-slate-600" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-slate-900">
            Visit Response
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
                    <div className="h-16 w-16 animate-pulse rounded-full bg-slate-100" />
                    <Loader2 className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-spin text-slate-600" />
                  </div>
                  <h3 className="mt-6 text-lg font-medium text-slate-900">
                    Processing Your Request
                  </h3>
                  <p className="mt-2 text-center text-sm text-slate-600">
                    Please wait while we verify and process your response...
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
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 px-8 py-6">
                  <div className="flex items-center justify-center">
                    <div className="rounded-full bg-white p-2 shadow-sm">
                      <div className="rounded-full bg-slate-700 p-2">
                        <X className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-8 py-6">
                  <h3 className="text-center text-xl font-semibold text-slate-900">
                    Visit Declined
                  </h3>
                  <p className="mt-2 text-center text-sm text-slate-600">
                    Would you like to send a message to the visitor?
                  </p>

                  <div className="mt-6 space-y-4">
                    <div className="relative rounded-xl border border-slate-200 focus-within:border-slate-300 focus-within:ring-1 focus-within:ring-slate-300">
                      <div className="absolute left-3 top-3">
                        <MessageSquare className="h-5 w-5 text-slate-400" />
                      </div>
                      <textarea
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter a message (optional)"
                        className="block w-full resize-none rounded-xl border-0 py-3 pl-11 pr-4 text-slate-900
                                 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>

                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={handleSendMessage}
                        className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r
                                 from-slate-600 to-slate-700 px-4 py-3 text-sm font-semibold text-white shadow-lg
                                 transition-all hover:shadow-xl"
                      >
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        Send & Return
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => router.push("/")}
                        className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3
                                 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200"
                      >
                        Skip
                      </motion.button>
                    </div>
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
                    Process Failed
                  </h3>
                  <p className="mt-2 text-center text-sm text-slate-600">
                    We couldn&apos;t process your response. The link might be
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
      <Toaster position="top-center" />
    </div>
  );
}
