import { NextResponse } from "next/server";
import { getMongoClientPromise } from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = (body?.name ?? "").toString().trim();
    const email = (body?.email ?? "").toString().trim();
    const message = (body?.message ?? "").toString().trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const client = await getMongoClientPromise();
    const dbName = process.env.MONGODB_DB_NAME || "portfolio";
    const db = client.db(dbName);

    await db.collection("contact_messages").insertOne({
      name,
      email,
      message,
      createdAt: new Date(),
      source: "hire-me-form",
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Unable to send message right now. Please try again." },
      { status: 500 }
    );
  }
}
