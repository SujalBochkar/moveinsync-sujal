import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { startOfDay, endOfDay } from "date-fns";
import { notifications } from "@/lib/notifications";
import { VisitorStatus } from "@/types/enums";
import { Prisma } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const dateParam = url.searchParams.get("date");
    const searchQuery = url.searchParams.get("search");

    const where: any = {};

    if (dateParam) {
      const startDate = startOfDay(new Date(dateParam));
      const endDate = endOfDay(new Date(dateParam));
      where.checkInTime = {
        // gte: startDate,
        lte: endDate,
      };
    }

    if (searchQuery) {
      where.OR = [
        { name: { contains: searchQuery, mode: Prisma.QueryMode.insensitive } },
        {
          email: { contains: searchQuery, mode: Prisma.QueryMode.insensitive },
        },
        {
          phone: { contains: searchQuery, mode: Prisma.QueryMode.insensitive },
        },
      ];
    }

    const visitors = await prisma.visitor.findMany({
      where,
      include: { host: true },
    });

    // const visitors = await prisma.visitor.findMany({});

    console.log("visitors", visitors);
    return NextResponse.json({ visitors });
  } catch (error) {
    console.error("Failed to fetch visitors:", error);
    return NextResponse.json(
      { error: "Failed to fetch visitors" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const visitor = await prisma.visitor.create({
      data: {
        ...body,
        status: VisitorStatus.PENDING,
      },
      include: { host: true },
    });

    if (visitor.email) {
      await notifications.sendVisitorInvite(visitor, visitor.host);
    }

    return NextResponse.json({ visitor });
  } catch (error) {
    console.error("Failed to create visitor:", error);
    return NextResponse.json(
      { error: "Failed to create visitor" },
      { status: 500 }
    );
  }
}
