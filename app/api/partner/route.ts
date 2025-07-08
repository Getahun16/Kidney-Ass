import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const partners = await prisma.partner.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(partners);
  } catch (error) {
    console.error("GET partners error:", error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name")?.toString();
    const file = formData.get("image") as File;

    if (!name || !file) {
      return NextResponse.json(
        { error: "Missing name or image" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${file.name}`;
    const filePath = path.join(process.cwd(), "public/uploads", filename);

    await writeFile(filePath, buffer);

    const imageUrl = `/uploads/${filename}`;

    const partner = await prisma.partner.create({
      data: { name, logo: imageUrl },
    });

    return NextResponse.json(partner);
  } catch (error) {
    console.error("POST partner error:", error);
    return NextResponse.json(
      { error: "Failed to create partner" },
      { status: 500 }
    );
  }
}
