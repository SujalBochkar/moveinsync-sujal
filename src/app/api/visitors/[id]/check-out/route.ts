import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const visitor = await prisma.visitor.update({
      where: { id: params.id },
      data: {
        checkOutTime: new Date(),
        status: "CHECKED_OUT",
      },
    });

    return NextResponse.json({ visitor });
  } catch (error) {
    console.error("Failed to check out visitor:", error);
    return NextResponse.json(
      { error: "Failed to check out visitor" },
      { status: 500 }
    );
  }
}
