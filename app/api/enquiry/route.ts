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
      subject: `New Trip Enquiry: ${data.name} - ${data.tripType}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #f97316; margin-bottom: 20px;">New Trip Enquiry</h2>
          
          <h3 style="background-color: #f9fafb; padding: 10px; border-radius: 5px;">1. Trip Details</h3>
          <p><strong>Trip Type:</strong> ${data.tripType || "Not specified"}</p>
          <p><strong>Dates:</strong> ${data.dates || "Not specified"} ${data.flexible ? "(Dates are flexible)" : ""}</p>
          
          <h3 style="background-color: #f9fafb; padding: 10px; border-radius: 5px;">2. Traveler Info</h3>
          <p><strong>Travelers:</strong> ${data.travelers || "Not specified"}</p>
          <p><strong>Nationality:</strong> ${data.nationality || "Not specified"}</p>
          
          <h3 style="background-color: #f9fafb; padding: 10px; border-radius: 5px;">3. Preferences & Budget</h3>
          <p><strong>Budget:</strong> ${data.budget || "Not specified"}</p>
          <p><strong>Preferences:</strong> ${data.preferences || "Not specified"}</p>
          
          <h3 style="background-color: #f9fafb; padding: 10px; border-radius: 5px;">4. Contact Info</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone || "Not specified"}</p>
        </div>
      `,
    });

    return NextResponse.json(
      { message: "Enquiry sent successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Enquiry Error:", error);
    return NextResponse.json(
      { message: "Failed to send enquiry" },
      { status: 500 },
    );
  }
}
