import { NextResponse } from "next/server";

export async function POST(request) {
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

    // Check credentials against environment variables
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminUsername || !adminPassword) {
      console.error("Admin credentials not configured");
      return NextResponse.json(
        { error: "Authentication service not configured" },
        { status: 500 }
      );
    }

    // Verify credentials
    if (username === adminUsername && password === adminPassword) {
      // Generate a simple token (base64 encoded timestamp + random)
      const token = Buffer.from(
        `${Date.now()}-${Math.random().toString(36).substring(2)}`
      ).toString("base64");

      return NextResponse.json({
        success: true,
        token,
        message: "Login successful",
      });
    } else {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
