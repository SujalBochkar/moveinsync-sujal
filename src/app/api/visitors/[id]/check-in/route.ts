import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { notifications } from "@/lib/notifications";
import { VisitorStatus } from "@/types/enums";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const visitor = await prisma.visitor.update({
      where: { id: params.id },
      data: {
        checkInTime: new Date(),
        status: VisitorStatus.CHECKED_IN,
      },
      include: {
        host: true,
      },
    });

    // Send notification to host
    await notifications.sendHostNotification(visitor, visitor.host);

    return NextResponse.json({ visitor });
  } catch (error) {
    console.error("Failed to check in visitor:", error);
    return NextResponse.json(
      { error: "Failed to check in visitor" },
      { status: 500 }
    );
  }
}
