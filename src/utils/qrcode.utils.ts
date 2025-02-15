import QRCode from "qrcode";

export const generateQRCode = async (data: string): Promise<string> => {
  try {
    // Generate QR code as data URL
    const qrDataUrl = await QRCode.toDataURL(data, {
      width: 500, // Increased width for more pixels
      margin: 1, // Reduced margin
      scale: 4, // Increased scale for more detail
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
      errorCorrectionLevel: "H", // Highest error correction for better quality
    });
    return qrDataUrl;
  } catch (err) {
    console.error("Error generating QR code:", err);
    throw new Error("Failed to generate QR code");
  }
};
