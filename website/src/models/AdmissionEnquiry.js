import mongoose from "mongoose";

const AdmissionEnquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    emailAddress: {
      type: String,
      required: [true, "Email address is required"],
      trim: true,
      lowercase: true,
    },
    mobileNumber: {
      type: String,
      required: [true, "Mobile number is required"],
      trim: true,
    },
    relation: {
      type: String,
      required: [true, "Relation to school is required"],
      enum: ["parent", "visitor", "other"],
    },
    subject: {
      type: String,
      trim: true,
      maxlength: [200, "Subject cannot exceed 200 characters"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [2000, "Message cannot exceed 2000 characters"],
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "responded", "closed"],
      default: "pending",
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [1000, "Notes cannot exceed 1000 characters"],
    },
  },
  {
    timestamps: true,
  }
);

const AdmissionEnquiry =
  mongoose.models.AdmissionEnquiry ||
  mongoose.model("AdmissionEnquiry", AdmissionEnquirySchema);

export default AdmissionEnquiry;
