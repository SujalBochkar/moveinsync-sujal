import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { startOfDay, endOfDay } from "date-fns";
import { VisitorStatus } from "@/types/enums";

export async function GET() {
  try {
    await prisma.$connect();

    const now = new Date();
    const today = startOfDay(now);
    const tomorrow = endOfDay(now);

    if (!(today instanceof Date) || !(tomorrow instanceof Date)) {
      throw new Error("Invalid date parameters");
    }

    const recentVisitors = await prisma.visitor.findMany({
      where: {
        AND: [
          {
            createdAt: {
            //   gte: today,
              lte: tomorrow,
            },
          },
          {
            status: {
              in: [VisitorStatus.CHECKED_IN, VisitorStatus.CHECKED_OUT],
            },
          },
        ],
      },
      include: {
        host: {
          select: {
            id: true,
            name: true,
            email: true,
            office: true,
          },
        },
      },
      orderBy: {
        checkInTime: "desc",
      },
      take: 5,
    });

    return NextResponse.json({
      success: true,
      visitors: recentVisitors,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    console.error("Failed to fetch recent visitors:", errorMessage);

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
