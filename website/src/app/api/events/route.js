import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
import { deleteLocalUpload, isManagedUploadPath } from "@/lib/localUploads";

export async function GET() {
  try {
    await dbConnect();
    const events = await Event.find({}).sort({ date: 1 }).lean();
    return NextResponse.json({ success: true, data: events }, { status: 200 });
  } catch (error) {
    console.error("Fetch events error:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, description, date, location, image } = body;

    if (!title || !date) {
      return NextResponse.json({ error: "Title and date are required" }, { status: 400 });
    }

    await dbConnect();
    const event = await Event.create({ title, description, date, location, image });

    return NextResponse.json({ success: true, data: event }, { status: 201 });
  } catch (error) {
    console.error("Create event error:", error);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, title, description, date, location, image, isActive } = body;

    if (!id) {
      return NextResponse.json({ error: "Event ID is required" }, { status: 400 });
    }

    await dbConnect();
    const existing = await Event.findById(id).lean();
    if (!existing) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const event = await Event.findByIdAndUpdate(
      id,
      { title, description, date, location, image, isActive },
      { new: true }
    );

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    if (image && existing.image && image !== existing.image && isManagedUploadPath(existing.image)) {
      await deleteLocalUpload(existing.image);
    }

    return NextResponse.json({ success: true, data: event }, { status: 200 });
  } catch (error) {
    console.error("Update event error:", error);
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Event ID is required" }, { status: 400 });
    }

    await dbConnect();
    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    if (event?.image && isManagedUploadPath(event.image)) {
      await deleteLocalUpload(event.image);
    }

    return NextResponse.json({ success: true, message: "Event deleted" }, { status: 200 });
  } catch (error) {
    console.error("Delete event error:", error);
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}
