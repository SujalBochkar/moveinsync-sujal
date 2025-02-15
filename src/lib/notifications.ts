import { format } from "date-fns";
import { sendEmail } from "./email";
import { emailTemplates } from "./emailTemplates";
import { generateQRCode } from "@/lib/qrCode";

export const notifications = {
  async sendVisitorInvite(visitor: any, host: any) {
    const qrCode = await generateQRCode(visitor.id);

    return sendEmail({
      to: visitor.email,
      subject: "Office Visit Invitation",
      html: emailTemplates.visitorInvite({
        visitorName: visitor.name,
        hostName: host.name,
        date: format(new Date(visitor.scheduledTime), "MMMM d, yyyy"),
        time: format(new Date(visitor.scheduledTime), "h:mm a"),
        location: visitor.office,
        qrCode,
      }),
    });
  },

  async sendHostNotification(visitor: any, host: any) {
    return sendEmail({
      to: host.email,
      subject: "Visitor Arrival Notification",
      html: emailTemplates.hostNotification({
        visitorName: visitor.name,
        purpose: visitor.purpose,
        checkInTime: format(new Date(visitor.checkInTime), "h:mm a"),
      }),
    });
  },

  async sendOverstayAlert(visitor: any, host: any) {
    return sendEmail({
      to: host.email,
      subject: "Visitor Overstay Alert",
      html: emailTemplates.overstayAlert({
        visitorName: visitor.name,
        hostName: host.name,
        checkInTime: format(new Date(visitor.checkInTime), "h:mm a"),
        expectedDuration: "2 hours", // You can calculate this based on your business logic
      }),
    });
  },
};
