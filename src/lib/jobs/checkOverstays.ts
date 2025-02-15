import { differenceInHours } from "date-fns";
import prisma from "../prisma";
import { notifications } from "../notifications";
import { VisitorStatus } from "@/types/enums";

export async function checkOverstays() {
  try {
    // Find all checked-in visitors who haven't checked out
    const visitors = await prisma.visitor.findMany({
      where: {
        status: VisitorStatus.CHECKED_IN,
        checkOutTime: null,
        checkInTime: {
          // Visitors checked in more than 2 hours ago
          lt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        },
      },
      include: {
        host: true,
      },
    });

    // Send overstay alerts
    for (const visitor of visitors) {
      const hoursSinceCheckIn = differenceInHours(
        new Date(),
        new Date(visitor.checkInTime)
      );

      if (hoursSinceCheckIn >= 2) {
        // Update visitor status
        await prisma.visitor.update({
          where: { id: visitor.id },
          data: { status: VisitorStatus.OVERSTAY },
        });

        // Send notification
        await notifications.sendOverstayAlert(visitor, visitor.host);
      }
    }
  } catch (error) {
    console.error("Failed to check overstays:", error);
  }
}
