/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: NextRequest, context: any) {
  const id = Number(context.params.id);
  await prisma.partner.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest, context: any) {
  const id = Number(context.params.id);
  const form = await req.formData();
  const name = form.get("name")?.toString() || "";

  const updateData: { name: string; logo?: string } = { name };

  const file = form.get("logo") as File | null;
  if (file) {
    // handle file upload if needed
  }

  const partner = await prisma.partner.update({
    where: { id },
    data: updateData,
  });

  return NextResponse.json(partner);
}
