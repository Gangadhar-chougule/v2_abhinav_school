import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import AdminUser from "@/models/AdminUser";

export async function POST(request) {
  let useDbAuth = false;

  try {
    const body = await request.json();
    const { username, password } = body;

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    // Try to connect to MongoDB
    try {
      await dbConnect();
      useDbAuth = true;
    } catch (dbError) {
      console.log("MongoDB connection failed, using fallback credentials");
    }

    let adminUser = null;
    let role = "admin";

    if (useDbAuth) {
      // Find admin user in database
      adminUser = await AdminUser.findOne({
        username: username,
        isActive: true,
      });

      if (!adminUser) {
        // Try fallback credentials
        const fallbackUsername = process.env.ADMIN_USERNAME;
        const fallbackPassword = process.env.ADMIN_PASSWORD;
        if (username === fallbackUsername && password === fallbackPassword) {
          role = "superadmin";
        } else {
          return NextResponse.json(
            { error: "Invalid username or password" },
            { status: 401 }
          );
        }
      } else {
        // Verify password
        if (password !== adminUser.password) {
          return NextResponse.json(
            { error: "Invalid username or password" },
            { status: 401 }
          );
        }
        role = adminUser.role;
        // Update last login time
        adminUser.lastLogin = new Date();
        await adminUser.save();
      }
    } else {
      // Use fallback credentials from environment
      const fallbackUsername = process.env.ADMIN_USERNAME;
      const fallbackPassword = process.env.ADMIN_PASSWORD;

      if (username === fallbackUsername && password === fallbackPassword) {
        role = "superadmin";
      } else {
        return NextResponse.json(
          { error: "Invalid username or password" },
          { status: 401 }
        );
      }
    }

    // Generate a simple token (base64 encoded timestamp + random)
    const token = Buffer.from(
      `${Date.now()}-${Math.random().toString(36).substring(2)}`
    ).toString("base64");

    return NextResponse.json({
      success: true,
      token,
      user: {
        username: username,
        name: "Admin",
        role: role,
      },
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);

    // Try fallback credentials on any error
    try {
      const body = await request.json();
      const { username, password } = body;
      const fallbackUsername = process.env.ADMIN_USERNAME;
      const fallbackPassword = process.env.ADMIN_PASSWORD;

      if (username === fallbackUsername && password === fallbackPassword) {
        const token = Buffer.from(
          `${Date.now()}-${Math.random().toString(36).substring(2)}`
        ).toString("base64");

        return NextResponse.json({
          success: true,
          token,
          user: {
            username: username,
            name: "Admin",
            role: "superadmin",
          },
          message: "Login successful",
        });
      }
    } catch (innerError) {
      console.error("Fallback also failed:", innerError);
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
