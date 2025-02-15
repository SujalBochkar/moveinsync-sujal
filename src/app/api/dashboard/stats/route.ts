import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { startOfDay, endOfDay } from "date-fns";

export async function GET() {
  try {
    const now = new Date();
    const today = startOfDay(now);
    const tomorrow = endOfDay(now);

    const [totalVisitors, checkedIn, expected, overstay] = await Promise.all([
      // Total visitors today
      prisma.visitor.count({
        where: {
          createdAt: {
            gte: today,
            lte: tomorrow,
          },
        },
      }),
      // Currently checked in
      prisma.visitor.count({
        where: {
          status: "CHECKED_IN",
          checkOutTime: null,
        },
      }),
      // Expected today
      prisma.visitor.count({
        where: {
          createdAt: {
            gte: today,
            lte: tomorrow,
          },
          status: "PENDING",
        },
      }),
      // Overstay
      prisma.visitor.count({
        where: {
          status: "OVERSTAY",
        },
      }),
    ]);

    return NextResponse.json({
      totalVisitors,
      checkedIn,
      expected,
      overstay,
    });
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}
