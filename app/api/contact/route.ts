import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Delivering straight to your testing inbox
    const DELIVERY_EMAIL = "mysrms2021@gmail.com";

    await resend.emails.send({
      from: "Tuyeni Website <onboarding@resend.dev>",
      to: DELIVERY_EMAIL,
      subject: `New Contact Message from ${data.name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #f97316; margin-bottom: 20px;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <h3 style="background-color: #f9fafb; padding: 10px; border-radius: 5px; margin-top: 20px;">Message:</h3>
          <p style="white-space: pre-wrap; color: #333; line-height: 1.6;">${data.message}</p>
        </div>
      `,
    });

    return NextResponse.json(
      { message: "Message sent successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact Form Error:", error);
    return NextResponse.json(
      { message: "Failed to send message" },
      { status: 500 },
    );
  }
}
