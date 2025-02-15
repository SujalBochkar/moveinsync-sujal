"use client";

import { useCallback, useRef, useState } from "react";
import { Camera, X } from "lucide-react";
import { motion } from "framer-motion";
import Webcam from "react-webcam";
import toast from "react-hot-toast";
import Image from "next/image";

interface PhotoCaptureProps {
  onPhotoCapture: (photoData: string) => void;
  onClose: () => void;
}

export function PhotoCapture({ onPhotoCapture, onClose }: PhotoCaptureProps) {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setImgSrc(imageSrc);
        onPhotoCapture(imageSrc);
      }
    }
  }, [onPhotoCapture]);

  const retake = () => {
    setImgSrc(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-900">Take Photo</h3>
          <p className="mt-1 text-sm text-slate-500">
            Position yourself in the frame and take a clear photo
          </p>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-100">
          {imgSrc ? (
            <Image
              src={imgSrc}
              alt="Captured"
              className="h-full w-full object-cover"
              width={1280}
              height={720}
            />
          ) : (
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="h-full w-full object-cover"
              mirrored={true}
              onUserMediaError={() => {
                toast.error(
                  "Unable to access camera. Please check permissions."
                );
              }}
            />
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600
                     hover:border-slate-300 hover:bg-slate-50"
          >
            Cancel
          </button>

          {imgSrc ? (
            <>
              <button
                type="button"
                onClick={retake}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white
                         hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Retake Photo
              </button>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white
                         hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Continue
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={capture}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white
                       hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Camera className="h-4 w-4" />
              Capture Photo
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
