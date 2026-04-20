import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { Resend } from "resend";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 },
      );
    }

    const writeClient = client.withConfig({
      token: process.env.SANITY_API_WRITE_TOKEN,
    });

    // 1. Check if they are already subscribed
    const existingSubscriber = await writeClient.fetch(
      `*[_type == "subscriber" && email == $email][0]`,
      { email },
    );

    if (existingSubscriber) {
      return NextResponse.json(
        { message: "Already subscribed!" },
        { status: 200 },
      );
    }

    // 2. Save new subscriber to Sanity WITH AUTOMATIC TIMESTAMP
    await writeClient.create({
      _type: "subscriber",
      email: email,
      subscribedAt: new Date().toISOString(), // Automatically captures the exact second they subscribe
    });

    // 3. SEND THE WELCOME EMAIL!
    // IMPORTANT: Kept the 'to' address as your personal email until your Resend domain is verified
    await resend.emails.send({
      from: "Tuyeni Travel <onboarding@resend.dev>",
      to: "mysrms2021@gmail.com",
      subject: "Welcome to Tuyeni Journals! 🌍",
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #f3f4f6; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
          <div style="background-color: #111827; padding: 40px 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Welcome to the Journey!</h1>
          </div>
          <div style="padding: 40px 30px;">
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Hi there,<br><br>
              Thank you for joining the <strong>Tuyeni Travel</strong> newsletter! We are thrilled to have you with us.
            </p>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
              From the towering red dunes of Sossusvlei to the hidden wildlife gems of Etosha, you will now be the first to receive our latest travel guides, expert tips, and exclusive safari inspiration directly in your inbox.
            </p>
            <a href="http://localhost:3000/blog" style="display: inline-block; background-color: #f97316; color: white; padding: 14px 28px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px;">Read Latest Journals &rarr;</a>
          </div>
          <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #f3f4f6;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">Get ready for an unforgettable adventure. 🇳🇦</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ message: "Success!" }, { status: 201 });
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
