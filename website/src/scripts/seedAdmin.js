/**
 * Seed script to create initial admin user
 * Run with: node src/scripts/seedAdmin.js
 */
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI not found in .env.local");
  process.exit(1);
}

const AdminUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    enum: ["superadmin", "admin", "editor"],
    default: "admin",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  lastLogin: {
    type: Date,
  },
}, {
  timestamps: true,
});

const AdminUser = mongoose.models.AdminUser || mongoose.model("AdminUser", AdminUserSchema);

async function seedAdmin() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await AdminUser.findOne({ username: "admin123" });
    
    if (existingAdmin) {
      console.log("Admin user 'admin123' already exists. Skipping seed.");
      process.exit(0);
    }

    // Create admin user
    const adminUser = await AdminUser.create({
      username: "admin123",
      password: "Admin@1234",
      name: "Super Admin",
      role: "superadmin",
      isActive: true,
    });

    console.log("✅ Admin user created successfully!");
    console.log("Username: admin123");
    console.log("Password: Admin@1234");
    
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("❌ Error seeding admin user:", error.message);
    process.exit(1);
  }
}

seedAdmin();
