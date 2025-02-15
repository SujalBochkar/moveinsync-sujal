import QRCode from "qrcode";

export async function generateQRCode(visitorId: string): Promise<string> {
  try {
    // Generate QR code as data URL
    const qrCodeDataUrl = await QRCode.toDataURL(visitorId);
    return qrCodeDataUrl;
  } catch (error) {
    console.error("Failed to generate QR code:", error);
    throw error;
  }
}
