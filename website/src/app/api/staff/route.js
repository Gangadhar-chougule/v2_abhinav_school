import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Staff from "@/models/Staff";
import { deleteLocalUpload, isManagedUploadPath } from "@/lib/localUploads";

export async function GET() {
  try {
    await dbConnect();
    const staff = await Staff.find({}).sort({ order: 1, createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: staff }, { status: 200 });
  } catch (error) {
    console.error("Fetch staff error:", error);
    return NextResponse.json({ error: "Failed to fetch staff" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, role, phone, image, order } = body;

    if (!name || !role) {
      return NextResponse.json({ error: "Name and role are required" }, { status: 400 });
    }

    await dbConnect();
    const staff = await Staff.create({ name, role, phone, image, order: order || 0 });

    return NextResponse.json({ success: true, data: staff }, { status: 201 });
  } catch (error) {
    console.error("Create staff error:", error);
    return NextResponse.json({ error: "Failed to create staff member" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, name, role, phone, image, order, isActive } = body;

    if (!id) {
      return NextResponse.json({ error: "Staff ID is required" }, { status: 400 });
    }

    await dbConnect();
    const existing = await Staff.findById(id).lean();
    if (!existing) {
      return NextResponse.json({ error: "Staff member not found" }, { status: 404 });
    }

    const staff = await Staff.findByIdAndUpdate(
      id,
      { name, role, phone, image, order, isActive },
      { new: true }
    );

    if (!staff) {
      return NextResponse.json({ error: "Staff member not found" }, { status: 404 });
    }

    if (image && existing.image && image !== existing.image && isManagedUploadPath(existing.image)) {
      await deleteLocalUpload(existing.image);
    }

    return NextResponse.json({ success: true, data: staff }, { status: 200 });
  } catch (error) {
    console.error("Update staff error:", error);
    return NextResponse.json({ error: "Failed to update staff member" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Staff ID is required" }, { status: 400 });
    }

    await dbConnect();
    const staff = await Staff.findByIdAndDelete(id);

    if (!staff) {
      return NextResponse.json({ error: "Staff member not found" }, { status: 404 });
    }

    if (staff?.image && isManagedUploadPath(staff.image)) {
      await deleteLocalUpload(staff.image);
    }

    return NextResponse.json({ success: true, message: "Staff member deleted" }, { status: 200 });
  } catch (error) {
    console.error("Delete staff error:", error);
    return NextResponse.json({ error: "Failed to delete staff member" }, { status: 500 });
  }
}
