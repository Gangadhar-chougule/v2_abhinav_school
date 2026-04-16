import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import AdmissionEnquiry from "@/models/AdmissionEnquiry";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_APP_PASSWORD,
  },
});

const formatDate = (date) => {
  return new Date(date).toLocaleString("mr-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getRelationLabel = (relation) => {
  const labels = {
    parent: "पालक (Parent)",
    visitor: "विजिटर (Visitor)",
    other: "इतर (Other)",
  };
  return labels[relation] || relation;
};

const sendEnquiryEmail = async (enquiry) => {
  const mailOptions = {
    from: `"Abhinav School - Admissions" <${process.env.SENDER_EMAIL}>`,
    to: process.env.RECEIVER_EMAIL,
    subject: `नवीन प्रवेश विचारणा - ${enquiry.fullName}`,
    html: `
      <div style="font-family: 'Noto Sans Devanagari', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
        <div style="background: linear-gradient(135deg, #2e7d32 0%, #4caf50 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">🕌 अभिनव विशेष शाळा</h1>
          <p style="color: #e8f5e9; margin: 10px 0 0 0;">नवीन प्रवेश विचारणा सबमिट झाली! 🎉</p>
        </div>

        <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 15px 10px; color: #6b7280; font-size: 14px;">📛 नाव</td>
              <td style="padding: 15px 10px; font-weight: 600; color: #1f2937;">${enquiry.fullName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 15px 10px; color: #6b7280; font-size: 14px;">📧 ईमेल</td>
              <td style="padding: 15px 10px;">
                <a href="mailto:${enquiry.emailAddress}" style="color: #2563eb; text-decoration: none;">${enquiry.emailAddress}</a>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 15px 10px; color: #6b7280; font-size: 14px;">📱 फोन नंबर</td>
              <td style="padding: 15px 10px;">
                <a href="tel:${enquiry.mobileNumber}" style="color: #2563eb; text-decoration: none;">${enquiry.mobileNumber}</a>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 15px 10px; color: #6b7280; font-size: 14px;">👤 संबंध</td>
              <td style="padding: 15px 10px; font-weight: 600; color: #059669;">${getRelationLabel(enquiry.relation)}</td>
            </tr>
            ${enquiry.subject ? `
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 15px 10px; color: #6b7280; font-size: 14px;">📌 विषय</td>
              <td style="padding: 15px 10px; color: #1f2937;">${enquiry.subject}</td>
            </tr>
            ` : ""}
            <tr>
              <td style="padding: 15px 10px; color: #6b7280; font-size: 14px; vertical-align: top;">💬 संदेश</td>
              <td style="padding: 15px 10px; color: #1f2937; line-height: 1.6;">${enquiry.message.replace(/\n/g, "<br>")}</td>
            </tr>
          </table>

          <div style="margin-top: 25px; padding: 15px; background: #f3f4f6; border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: #6b7280; font-size: 13px;">
              ⏰ सबमिट केले: <strong>${formatDate(enquiry.createdAt)}</strong>
            </p>
          </div>

          <div style="margin-top: 20px; text-align: center;">
            <a href="mailto:${enquiry.emailAddress}?subject=Re: आपल्या विचारण्याचे उत्तर" style="display: inline-block; background: #2e7d32; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
              📧 यांना उत्तर द्या
            </a>
          </div>
        </div>

        <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 12px;">
          <p>ही ईमेल अभिनव विशेष शाळा वेबसाइटद्वारे स्वयंचलितपणे पाठवण्यात आली आहे.</p>
        </div>
      </div>
    `,
    text: `
नवीन प्रवेश विचारणा - ${enquiry.fullName}

नाव: ${enquiry.fullName}
ईमेल: ${enquiry.emailAddress}
फोन नंबर: ${enquiry.mobileNumber}
संबंध: ${getRelationLabel(enquiry.relation)}
${enquiry.subject ? `विषय: ${enquiry.subject}` : ""}
संदेश: ${enquiry.message}

सबमिट केले: ${formatDate(enquiry.createdAt)}
    `,
  };

  return transporter.sendMail(mailOptions);
};

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

    try {
      await sendEnquiryEmail(enquiry);
      console.log("Email sent successfully");
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
    }

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
