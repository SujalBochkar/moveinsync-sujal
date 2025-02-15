interface VisitorInviteTemplateProps {
  visitorName: string;
  hostName: string;
  date: string;
  time: string;
  location: string;
  qrCode: string;
}

interface HostNotificationTemplateProps {
  visitorName: string;
  purpose: string;
  checkInTime: string;
}

interface OverstayAlertTemplateProps {
  visitorName: string;
  hostName: string;
  checkInTime: string;
  expectedDuration: string;
}

export const emailTemplates = {
  visitorInvite: ({
    visitorName,
    hostName,
    date,
    time,
    location,
    qrCode,
  }: VisitorInviteTemplateProps) => `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Visitor Invitation</h2>
      <p>Dear ${visitorName},</p>
      <p>You have been invited to visit our office by ${hostName}.</p>

      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Visit Details</h3>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Location:</strong> ${location}</p>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <img src="${qrCode}" alt="QR Code" style="max-width: 200px;" />
        <p style="color: #666;">Show this QR code at reception for quick check-in</p>
      </div>

      <p style="color: #666; font-size: 14px;">
        Please arrive 10 minutes before your scheduled time and bring a valid ID.
      </p>
    </div>
  `,

  hostNotification: ({
    visitorName,
    purpose,
    checkInTime,
  }: HostNotificationTemplateProps) => `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Visitor Arrival Notification</h2>
      <p>Your visitor has arrived at the office.</p>

      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Visitor Details</h3>
        <p><strong>Name:</strong> ${visitorName}</p>
        <p><strong>Purpose:</strong> ${purpose}</p>
        <p><strong>Check-in Time:</strong> ${checkInTime}</p>
      </div>

      <p>Please proceed to the reception area to meet your visitor.</p>
    </div>
  `,

  overstayAlert: ({
    visitorName,
    hostName,
    checkInTime,
    expectedDuration,
  }: OverstayAlertTemplateProps) => `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #dc2626;">Visitor Overstay Alert</h2>
      <p>A visitor has exceeded their expected duration.</p>

      <div style="background-color: #fee2e2; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #dc2626;">Overstay Details</h3>
        <p><strong>Visitor:</strong> ${visitorName}</p>
        <p><strong>Host:</strong> ${hostName}</p>
        <p><strong>Check-in Time:</strong> ${checkInTime}</p>
        <p><strong>Expected Duration:</strong> ${expectedDuration}</p>
      </div>

      <p>Please ensure the visitor checks out at the reception.</p>
    </div>
  `,
};
