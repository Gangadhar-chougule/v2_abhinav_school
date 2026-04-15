import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import AdmissionEnquiry from "@/models/AdmissionEnquiry";

export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, emailAddress, mobileNumber, relation, subject, message } = body;

    if (!fullName || !emailAddress || !mobileNumber || !relation || !message) {
      return NextResponse.json(
        { error: "All required fields must be provided" },
        { status: 400 }
      );
    }

    await dbConnect();

    const enquiry = await AdmissionEnquiry.create({
      fullName,
      emailAddress,
      mobileNumber,
      relation,
      subject: subject || "",
      message,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully",
        data: {
          id: enquiry._id,
          fullName: enquiry.fullName,
          emailAddress: enquiry.emailAddress,
          submittedAt: enquiry.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Admission enquiry error:", error);
    return NextResponse.json(
      { error: "Failed to submit application. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();

    const enquiries = await AdmissionEnquiry.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        data: enquiries,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch enquiries error:", error);
    return NextResponse.json(
      { error: "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}
