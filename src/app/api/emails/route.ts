import { sendEmail } from "@/utils/mail.utils";
import { generateQRCode } from "@/utils/qrcode.utils";

type VisitorRequest = {
  visitorName: string;
  visitorEmail: string;
  visitorCompany: string;
  purpose: string;
  visitDate: string;
  visitTime: string;
  hostName: string;
  hostEmail: string;
  photo?: string;
};

export async function POST(request: Request) {
  const visitorData: VisitorRequest = await request.json();
  const visitorToken = `${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 9)}`;

  const sender = {
    name: "Visitor Management System",
    address: process.env.EMAIL_USER || "vms@company.com",
  };

  // First email - Send approval request to host
  const hostEmailTemplate = `
<div style="
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background: #f8fafc;
  padding: 48px 12px;
  color: #1e293b;
">
  <div style="
    max-width: 520px;
    margin: 0 auto;
    background: white;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
  ">
    <!-- Top Wave Pattern -->
    <div style="
      background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
      height: 8px;
    "></div>

    <!-- Main Content -->
    <div style="padding: 32px;">
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 32px;">
        <div style="
          width: 96px;
          height: 96px;
          margin: 0 auto;
          border-radius: 20px;
          background: linear-gradient(135deg, #eff6ff 0%, #eef2ff 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        ">
          <img
            src="https://lh3.googleusercontent.com/d/1vGxYOVyXsIV1rl-jQr92V8hJKEr96sE6"
            alt="${visitorData.visitorName}"
            style="
              width: 96px;
              height: 96px;
              border-radius: 20px;
              object-fit: cover;
              object-position: center;
            "
          />
        </div>
        <h1 style="
          font-size: 24px;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 8px;
        ">New Visitor Request</h1>
        <p style="
          font-size: 16px;
          color: #64748b;
          margin: 0;
        ">${visitorData.visitorName} would like to meet you</p>
      </div>

      <!-- Visitor Info Card -->
      <div style="
        background: #f8fafc;
        border-radius: 16px;
        padding: 24px;
        margin-bottom: 24px;
      ">
        <!-- Visitor Name & Company -->
        <div style="
          display: flex;
          align-items: center;
          gap: 12px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e2e8f0;
          margin-bottom: 16px;
        ">
          <div style="
            width: 40px;
            height: 40px;
            border-radius: 12px;
            background: #3b82f6;
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <span style="color: white; font-size: 18px; font-weight: 600;">
              ${visitorData.visitorName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p style="
              font-weight: 600;
              color: #1e293b;
              margin: 0 0 4px;
            ">${visitorData.visitorName}</p>
            <span style="
              font-size: 14px;
              color: #64748b;
            ">${visitorData.visitorCompany}</span>
          </div>
        </div>

        <!-- Visit Details Grid -->
        <div style="display: grid; gap: 16px;">
          <!-- Purpose -->
          <div style="display: flex; gap: 12px;">
            <div style="
              width: 32px;
              height: 32px;
              background: #dbeafe;
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <span style="color: #2563eb;">🎯</span>
            </div>
            <div>
              <p style="
                font-size: 13px;
                color: #64748b;
                margin: 0 0 2px;
              ">Purpose of Visit</p>
              <p style="
                font-size: 14px;
                font-weight: 500;
                color: #1e293b;
                margin: 0;
              ">${visitorData.purpose}</p>
            </div>
          </div>

          <!-- Date & Time -->
          <div style="
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          ">
            <div style="display: flex; gap: 12px;">
              <div style="
                width: 32px;
                height: 32px;
                background: #f0fdf4;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <span style="color: #16a34a;">📅</span>
              </div>
              <div>
                <p style="
                  font-size: 13px;
                  color: #64748b;
                  margin: 0 0 2px;
                ">Date</p>
                <p style="
                  font-size: 14px;
                  font-weight: 500;
                  color: #1e293b;
                  margin: 0;
                ">${visitorData.visitDate}</p>
              </div>
            </div>
            <div style="display: flex; gap: 12px;">
              <div style="
                width: 32px;
                height: 32px;
                background: #f0fdf4;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <span style="color: #16a34a;">⏰</span>
              </div>
              <div>
                <p style="
                  font-size: 13px;
                  color: #64748b;
                  margin: 0 0 2px;
                ">Time</p>
                <p style="
                  font-size: 14px;
                  font-weight: 500;
                  color: #1e293b;
                  margin: 0;
                ">${visitorData.visitTime}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div style="text-align: center;">
        <p style="
          color: #64748b;
          font-size: 14px;
          margin-bottom: 20px;
        ">Please respond to this visit request:</p>

        <div style="
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        ">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/approve/${visitorToken}"
            style="
              background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
              color: white;
              padding: 12px 24px;
              border-radius: 12px;
              text-decoration: none;
              font-weight: 500;
              font-size: 14px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              box-shadow: 0 2px 4px rgba(22, 163, 74, 0.2);
            "
          >
            <span style="font-size: 18px;">✓</span>
            Approve
          </a>

          <a href="${process.env.NEXT_PUBLIC_APP_URL}/reject/${visitorToken}"
            style="
              background: #f1f5f9;
              color: #475569;
              padding: 12px 24px;
              border-radius: 12px;
              text-decoration: none;
              font-weight: 500;
              font-size: 14px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
            "
          >
            <span style="font-size: 18px;">×</span>
            Decline
          </a>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div style="
      border-top: 1px solid #e2e8f0;
      margin-top: 32px;
      padding: 24px;
      text-align: center;
      background: #f8fafc;
    ">
      <p style="
        color: #64748b;
        font-size: 13px;
        margin: 0;
      ">
        This request will expire in 24 hours<br>
        Powered by ${process.env.NEXT_PUBLIC_APP_NAME} Security
      </p>
    </div>
  </div>
</div>
`;

  try {
    // Send approval request to host
    await sendEmail({
      sender,
      recipients: [
        { name: visitorData.hostName, address: visitorData.hostEmail },
      ],
      subject: `New Visitor Request: ${visitorData.visitorName}`,
      message: hostEmailTemplate,
    });

    return Response.json({
      success: true,
      message: "Approval request sent to host",
      token: visitorToken,
    });
  } catch (error) {
    console.error("Email sending failed:", error);
    return Response.json(
      {
        success: false,
        message: "Failed to send approval request",
      },
      { status: 500 }
    );
  }
}

// New endpoint for sending visitor notification after approval/rejection
export async function PUT(request: Request) {
  const { visitorData, status, token } = await request.json();

  const sender = {
    name: "Visitor Management System",
    address: process.env.EMAIL_USER || "vms@company.com",
  };

  try {
    let visitorEmailTemplate;

    if (status === "approved") {
      const qrData = JSON.stringify({
        token,
        name: visitorData.visitorName,
        email: visitorData.visitorEmail,
        visitDate: visitorData.visitDate,
        visitTime: visitorData.visitTime,
      });

      const qrCodeDataUrl = await generateQRCode(qrData);

      visitorEmailTemplate = `
        <div style="
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        background: #f8fafc;
        padding: 48px 12px;
        color: #1e293b;
        ">
        <div style="
            max-width: 520px;
            margin: 0 auto;
            background: white;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
        ">
            <!-- Success Indicator -->
            <div style="
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            padding: 32px 24px;
            text-align: center;
            color: white;
            ">
            <div style="
                width: 64px;
                height: 64px;
                margin: 0 auto;
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(8px);
                border-radius: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 32px;
                margin-bottom: 16px;
            ">✓</div>
            <h1 style="
                font-size: 24px;
                font-weight: 600;
                margin: 0 0 8px;
            ">Visit Approved!</h1>
            <p style="
                font-size: 16px;
                opacity: 0.9;
                margin: 0;
            ">Your visit has been confirmed by the host</p>
            </div>

            <!-- Visit Details -->
            <div style="padding: 32px 24px;">
            <div style="
                background: #f8fafc;
                border-radius: 16px;
                padding: 24px;
                margin-bottom: 24px;
            ">
                <div style="display: grid; gap: 20px;">
                <!-- Date & Time -->
                <div style="
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px;
                ">
                    <div style="
                    background: white;
                    padding: 16px;
                    border-radius: 12px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
                    ">
                    <div style="
                        display: flex;
                        align-items: center;
                        gap: 12px;
                        margin-bottom: 8px;
                    ">
                    <div style="
                        width: 32px;
                        height: 32px;
                        background: #f0fdf4;
                        border-radius: 8px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #16a34a;
                    ">📅</div>
                    <span style="font-size: 13px; color: #64748b;">Date</span>
                    </div>
                    <p style="margin: 0; font-weight: 500; color: #1e293b;">${visitorData.visitDate}</p>
                    </div>

                    <div style="
                    background: white;
                    padding: 16px;
                    border-radius: 12px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
                    ">
                    <div style="
                        display: flex;
                        align-items: center;
                        gap: 12px;
                        margin-bottom: 8px;
                    ">
                    <div style="
                        width: 32px;
                        height: 32px;
                        background: #f0fdf4;
                        border-radius: 8px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #16a34a;
                    ">⏰</div>
                    <span style="font-size: 13px; color: #64748b;">Time</span>
                    </div>
                    <p style="margin: 0; font-weight: 500; color: #1e293b;">${visitorData.visitTime}</p>
                    </div>
                </div>

                <!-- Host Info -->
                <div style="
                    background: white;
                    padding: 16px;
                    border-radius: 12px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
                ">
                    <div style="
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 8px;
                    ">
                    <div style="
                        width: 32px;
                        height: 32px;
                        background: #eff6ff;
                        border-radius: 8px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #2563eb;
                    ">👤</div>
                    <span style="font-size: 13px; color: #64748b;">Host</span>
                    </div>
                    <p style="margin: 0; font-weight: 500; color: #1e293b;">${visitorData.hostName}</p>
                </div>
                </div>
            </div>

            <!-- QR Code Section -->
            <div style="text-align: center;">
            <div style="
                background: white;
                border-radius: 16px;
                padding: 24px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
                display: inline-block;
            ">
                <div style="
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 16px;
                justify-content: center;
                ">
                <span style="font-size: 24px;">🎟️</span>
                <span style="font-weight: 600; color: #1e293b;">Entry Pass</span>
                </div>

                <div style="
                background: white;
                padding: 8px;
                border-radius: 12px;
                border: 2px solid #f1f5f9;
                ">
                <img src="${qrCodeDataUrl}"
                    alt="Entry QR Code"
                    style="
                    width: 180px;
                    height: 180px;
                    display: block;
                    ">
                </div>

                <p style="
                color: #64748b;
                font-size: 13px;
                margin: 16px 0 0;
                max-width: 240px;
                ">
                Present this QR code at the reception for seamless entry
                </p>
            </div>
            </div>
            </div>

            <!-- Footer -->
            <div style="
            border-top: 1px solid #e2e8f0;
            margin-top: 32px;
            padding: 24px;
            text-align: center;
            background: #f8fafc;
            ">
            <p style="
                color: #64748b;
                font-size: 13px;
                margin: 0;
            ">
            Powered by ${process.env.NEXT_PUBLIC_APP_NAME}<br>
            <span style="color: #94a3b8">QR code expires 2 hours after scheduled visit time</span>
            </p>
            </div>
        </div>
        </div>
        `;
    } else {
      visitorEmailTemplate = `
        <div style="
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          background: #f8fafc;
          padding: 48px 12px;
          color: #1e293b;
        ">
          <div style="
            max-width: 520px;
            margin: 0 auto;
            background: white;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
          ">
            <!-- Status Header -->
            <div style="
              background: linear-gradient(135deg, #475569 0%, #334155 100%);
              padding: 32px 24px;
              text-align: center;
              color: white;
            ">
              <div style="
                width: 64px;
                height: 64px;
                margin: 0 auto;
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(8px);
                border-radius: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 32px;
                margin-bottom: 16px;
              ">📋</div>
              <h1 style="
                font-size: 24px;
                font-weight: 600;
                margin: 0 0 8px;
              ">Visit Update</h1>
              <p style="
                font-size: 16px;
                opacity: 0.9;
                margin: 0;
              ">There's been an update to your visit request</p>
            </div>

            <!-- Content -->
            <div style="padding: 32px 24px;">
              <!-- Host Message -->
              <div style="
                background: #f8fafc;
                border-radius: 16px;
                padding: 24px;
                margin-bottom: 24px;
              ">
                <div style="
                  display: flex;
                  align-items: flex-start;
                  gap: 16px;
                ">
                  <div style="
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, #475569 0%, #334155 100%);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                  ">
                    <span style="color: white; font-size: 18px;">
                      ${visitorData.hostName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p style="
                      font-weight: 500;
                      color: #475569;
                      margin: 0 0 8px;
                      font-size: 14px;
                    ">Message from ${visitorData.hostName}</p>
                    <div style="
                      background: white;
                      padding: 16px;
                      border-radius: 12px;
                      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
                    ">
                      <p style="
                        color: #1e293b;
                        margin: 0;
                        font-size: 14px;
                        line-height: 1.5;
                      ">I could not meet you at this time.</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Next Steps Card -->
              <div style="
                background: white;
                border-radius: 16px;
                padding: 24px;
                text-align: center;
                border: 1px solid #e2e8f0;
              ">
                <div style="
                  width: 48px;
                  height: 48px;
                  margin: 0 auto 16px;
                  background: #f1f5f9;
                  border-radius: 12px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 24px;
                ">📅</div>
                <h2 style="
                  font-size: 16px;
                  font-weight: 600;
                  color: #1e293b;
                  margin: 0 0 8px;
                ">Would you like to reschedule?</h2>
                <p style="
                  color: #64748b;
                  font-size: 14px;
                  margin: 0 0 20px;
                  line-height: 1.5;
                ">Choose a new time that works better for both parties</p>

                <a href="${process.env.NEXT_PUBLIC_APP_URL}"
                  style="
                    display: inline-block;
                    background: linear-gradient(135deg, #475569 0%, #334155 100%);
                    color: white;
                    padding: 12px 24px;
                    border-radius: 12px;
                    text-decoration: none;
                    font-weight: 500;
                    font-size: 14px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                  "
                >Schedule New Visit</a>
              </div>
            </div>

            <!-- Footer -->
            <div style="
              border-top: 1px solid #e2e8f0;
              padding: 24px;
              text-align: center;
              background: #f8fafc;
            ">
              <p style="
                color: #64748b;
                font-size: 13px;
                margin: 0;
              ">
                Powered by ${process.env.NEXT_PUBLIC_APP_NAME}<br>
                <a href="mailto:support@${process.env.NEXT_PUBLIC_APP_NAME?.toLowerCase()}.com"
                  style="color: #475569; text-decoration: none; margin-top: 4px; display: inline-block;">
                  Need help? Contact Support
                </a>
              </p>
            </div>
          </div>
        </div>
      `;
    }

    await sendEmail({
      sender,
      recipients: [
        {
          name: visitorData.visitorName,
          address: visitorData.visitorEmail,
        },
      ],
      subject:
        status === "approved"
          ? "Visit Approved - QR Code Attached"
          : "Visit Request Update",
      message: visitorEmailTemplate,
    });

    return Response.json({
      success: true,
      message: `Notification sent to visitor (${status})`,
    });
  } catch (error) {
    console.error("Email sending failed:", error);
    return Response.json(
      {
        success: false,
        message: "Failed to send visitor notification",
      },
      { status: 500 }
    );
  }
}
