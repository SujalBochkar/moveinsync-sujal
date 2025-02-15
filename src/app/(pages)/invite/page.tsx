"use client";

import { useState } from "react";
import { SearchEmployees } from "@/components/SearchEmployees";
import { AddedGuests } from "@/components/AddedGuests";
import {
  Calendar,
  Clock,
  Building2,
  Users,
  Send,
  Camera,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { Guest } from "@/types/type";
import toast, { Toaster } from "react-hot-toast";
import { PhotoCapture } from "@/components/PhotoCapture";
import Image from "next/image";

export default function InvitePage() {
  const [isInviteSent, setIsInviteSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [showPhotoCapture, setShowPhotoCapture] = useState(false);
  const [photoData, setPhotoData] = useState<string | null>(null);

  const [visitorName, setVisitorName] = useState<string | null>(null);
  const [visitorEmail, setVisitorEmail] = useState<string | null>(null);
  const [visitorCompany, setVisitorCompany] = useState<string | null>(null);
  const [visitType, setVisitType] = useState("Business Guests");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [addedGuests, setAddedGuests] = useState<Guest[]>([]);

  const [eventTitle, setEventTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [endTime, setEndTime] = useState("");
  const [office, setOffice] = useState("Mumbai Goregaon");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const postData = {
      visitorName: visitorName,
      visitorEmail: visitorEmail,
      visitorCompany: visitorCompany,
      purpose: visitType,
      visitDate: date,
      visitTime: startTime,
      hostName: addedGuests[0]?.name,
      hostEmail: addedGuests[0]?.email,
    };

    const response = await fetch("/api/emails", {
      method: "POST",
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex w-full items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <Send className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Success!</p>
                <p className="text-sm text-gray-500">Invitation sent to Host</p>
              </div>
            </div>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="rounded-lg px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-50"
            >
              Close
            </button>
          </div>
        </div>
      ));
      setIsInviteSent(true);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  Invite Visitors
                </h1>
                <p className="mt-2 text-sm text-slate-600">
                  Create a new visitor invitation and manage guest details
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="mt-8 text-center">
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Processing Your Invitation</h3>
            <div className="flex flex-col items-center gap-2">
              <p className="text-slate-600">Please wait while we set everything up</p>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></span>
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: "0.4s"}}></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  Invite Visitors
                </h1>
                <p className="mt-2 text-sm text-slate-600">
                  Create a new visitor invitation and manage guest details
                </p>
              </div>
            </div>
          </div>
        </div>

        {isInviteSent && (
          <div className="mb-8 flex justify-center items-center">
            <div className="text-center max-w-2xl p-8 rounded-2xl border border-green-100">
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-green-100 p-4 rounded-full">
                  <Send className="h-12 w-12 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  Invitation Sent Successfully!
                </h1>
                <p className="text-lg text-slate-600">
                  Your guests will receive an email with visit details
                </p>
                <div className="w-24 h-1 bg-green-200 rounded-full mt-4"></div>
              </div>
            </div>
          </div>
        )}

        {!isInviteSent && (
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-100"
              >
                <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
                  <h2 className="text-base font-semibold text-slate-800">
                    Visit Details
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    All fields marked with{" "}
                    <span className="text-red-500">*</span> are required
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="space-y-6 p-6">
                    <div className="flex flex-row gap-6">
                      <div className="flex-1 space-y-3">
                        <label className="block text-sm font-medium text-slate-700">
                          Visitor Name
                          <span className="ml-1 text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={visitorName || ""}
                          onChange={(e) => setVisitorName(e.target.value)}
                          className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-700 placeholder-slate-400
                                 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-slate-300"
                          placeholder="Enter visitor's full name"
                          required
                        />
                      </div>

                      <div className="flex-1 space-y-3">
                        <label className="block text-sm font-medium text-slate-700">
                          Visitor Email
                          <span className="ml-1 text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={visitorEmail || ""}
                          onChange={(e) => setVisitorEmail(e.target.value)}
                          className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-700 placeholder-slate-400
                                 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-slate-300"
                          placeholder="Enter visitor's email address"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex flex-row gap-6">
                      <div className="flex-1 space-y-3">
                        <label className="block text-sm font-medium text-slate-700">
                          Visitor Company
                          <span className="ml-1 text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={visitorCompany || ""}
                          onChange={(e) => setVisitorCompany(e.target.value)}
                          className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-700 placeholder-slate-400
                                 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-slate-300"
                          placeholder="Enter visitor's company name"
                          required
                        />
                      </div>

                      <div className="flex-1 space-y-3">
                        <label className="block text-sm font-medium text-slate-700">
                          Event Title
                          <span className="ml-1 text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={eventTitle}
                          onChange={(e) => setEventTitle(e.target.value)}
                          className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-700 placeholder-slate-400
                               transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-slate-300"
                          placeholder="Enter a descriptive title for the visit"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex flex-row gap-6">
                      <div className="flex-1 space-y-3">
                        <label className="block text-sm font-medium text-slate-700">
                          Type of Visit
                          <span className="ml-1 text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Users className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                          <select
                            value={visitType}
                            onChange={(e) => setVisitType(e.target.value)}
                            className="w-full appearance-none rounded-lg border border-slate-200 bg-white pl-10 pr-4 py-3
                                   text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-slate-300"
                          >
                            <option>Business Guests</option>
                            <option>Interview</option>
                            <option>Vendor</option>
                            <option>Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex-1 space-y-3">
                        <label className="block text-sm font-medium text-slate-700">
                          Office Location
                          <span className="ml-1 text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                          <select
                            value={office}
                            onChange={(e) => setOffice(e.target.value)}
                            className="w-full appearance-none rounded-lg border border-slate-200 bg-white pl-10 pr-4 py-3
                                   text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-slate-300"
                          >
                            <option>Mumbai Goregaon</option>
                            <option>Bangalore</option>
                            <option>Delhi</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-slate-700">
                          Start Time
                          <span className="ml-1 text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                          <input
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-3 text-slate-700
                                   focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-slate-300"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-slate-700">
                          End Time
                          <span className="ml-1 text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                          <input
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-3 text-slate-700
                                   focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-slate-300"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-slate-700">
                          Date
                          <span className="ml-1 text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                          <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-3 text-slate-700
                                   focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-slate-300"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium text-slate-700">
                          Personal note to guests
                        </label>
                        <span className="text-xs text-slate-500">
                          (Optional)
                        </span>
                      </div>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-700 placeholder-slate-400
                               transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-slate-300 min-h-[120px]"
                        placeholder="Add any special instructions or notes for your guests..."
                      />
                    </div>
                  </div>
                </form>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="flex flex-col gap-6">
                <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-100">
                  <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-base font-semibold text-slate-800">
                          Host List
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                          Add hosts to your invite
                        </p>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                        {addedGuests.length} Selected
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="space-y-4">
                      <SearchEmployees
                        onAddGuest={(guest) =>
                          setAddedGuests([...addedGuests, guest])
                        }
                      />
                      <AddedGuests
                        guests={addedGuests}
                        onRemoveGuest={(index) => {
                          const newGuests = [...addedGuests];
                          newGuests.splice(index, 1);
                          setAddedGuests(newGuests);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-100">
                  <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-base font-semibold text-slate-800">
                          Visitor Photo
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                          Take a photo of the visitor
                        </p>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                        Optional
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {photoData ? (
                          <div className="relative group">
                            <div className="overflow-hidden rounded-lg border-2 border-blue-100 shadow-sm">
                              <Image
                                src={photoData}
                                alt="Captured photo"
                                width={160}
                                height={160}
                                className="h-40 w-40 object-cover transition-transform group-hover:scale-105"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => setPhotoData(null)}
                              className="absolute -right-2 -top-2 rounded-full bg-white p-1.5 text-slate-400 shadow-md
                                       transition-all hover:bg-red-50 hover:text-red-500 focus:outline-none focus:ring-2
                                       focus:ring-red-500 focus:ring-offset-2"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setShowPhotoCapture(true)}
                            className="flex h-40 w-40 flex-col items-center justify-center gap-2 rounded-lg border-2
                                     border-dashed border-slate-200 bg-slate-50/50 text-slate-400 transition-all
                                     hover:border-blue-200 hover:bg-blue-50/50 hover:text-blue-500"
                          >
                            <div className="rounded-full bg-slate-100 p-3 transition-all group-hover:bg-blue-100">
                              <Camera className="h-6 w-6" />
                            </div>
                            <span className="text-sm font-medium">
                              Add Photo
                            </span>
                          </button>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="rounded-lg bg-blue-50/50 p-4">
                          <h3 className="text-sm font-medium text-blue-900 mb-2">
                            Quick Guidelines
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100/50 px-2.5 py-1 text-xs text-blue-700">
                              <div className="h-1 w-1 rounded-full bg-blue-500" />
                              Good lighting
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100/50 px-2.5 py-1 text-xs text-blue-700">
                              <div className="h-1 w-1 rounded-full bg-blue-500" />
                              Front-facing view
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100/50 px-2.5 py-1 text-xs text-blue-700">
                              <div className="h-1 w-1 rounded-full bg-blue-500" />
                              Neutral background
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 rounded-xl border border-slate-200 bg-white p-4">
                  <button
                    type="button"
                    className="rounded-lg px-5 py-2 text-sm font-medium text-slate-600 transition-colors
                               hover:bg-slate-100 hover:text-slate-800 focus:outline-none focus:ring-2
                               focus:ring-slate-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handleSubmit}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2
                               text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <Send className="h-4 w-4" />
                    Send Invite
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      <Toaster />

      {showPhotoCapture && (
        <PhotoCapture
          onPhotoCapture={setPhotoData}
          onClose={() => setShowPhotoCapture(false)}
        />
      )}
    </motion.div>
  );
}
