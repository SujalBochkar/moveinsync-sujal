import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { startOfDay, subDays, format } from "date-fns";
import { VisitorStatus } from "@/types/enums";

export async function GET() {
  try {
    const today = startOfDay(new Date());
    const trends = [];

    // Get data for last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = subDays(today, i);
      const nextDay = subDays(today, i - 1);

      const visitorCount = await prisma.visitor.count({
        where: {
          AND: [
            {
              createdAt: {
                gte: date,
                lt: nextDay,
              },
            },
            {
              status: {
                in: [
                  VisitorStatus.CHECKED_IN,
                  VisitorStatus.CHECKED_OUT,
                  VisitorStatus.OVERSTAY,
                ],
              },
            },
          ],
        },
      });

      trends.push({
        date: format(date, "MMM dd"),
        visitors: visitorCount,
      });
    }

    return NextResponse.json({ trends });
  } catch (error) {
    console.error("Failed to fetch visitor trends:", error);
    return NextResponse.json(
      { error: "Failed to fetch visitor trends" },
      { status: 500 }
    );
  }
}
