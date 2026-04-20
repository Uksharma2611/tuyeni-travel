import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("1. Webhook triggered! Payload received:", body);

    if (body._type !== 'post' || !body.title || !body.slug?.current) {
      console.log("2. Ignored: Not a valid published post payload.");
      return NextResponse.json({ message: 'Ignored' }, { status: 200 });
    }

    const subscribers = await client.fetch(`*[_type == "subscriber"].email`);
    console.log("3. Subscribers found in Sanity:", subscribers);

    if (!subscribers || subscribers.length === 0) {
      console.log("4. Exiting: No subscribers found to send to.");
      return NextResponse.json({ message: 'No subscribers found' }, { status: 200 });
    }

    const postUrl = `http://localhost:3000/blog/${body.slug.current}`;
    
    // We conditionally create an image tag only if an image was uploaded
    const imageHtml = body.imageUrl 
      ? `<img src="${body.imageUrl}" alt="${body.title}" style="width: 100%; max-height: 400px; object-fit: cover; display: block;" />` 
      : '';
    
    for (const email of subscribers) {
      console.log(`5. Attempting to send email to: ${email}`);
      const resendResponse = await resend.emails.send({
        from: 'Tuyeni Travel <onboarding@resend.dev>',
        to: email, 
        subject: `New Post: ${body.title}`,
        // Upgraded Premium HTML Template
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #f3f4f6; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
            ${imageHtml}
            <div style="padding: 40px 30px;">
              <p style="color: #f97316; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-top: 0; margin-bottom: 10px;">Tuyeni Journals</p>
              <h2 style="font-size: 28px; color: #111827; margin-top: 0; margin-bottom: 16px; line-height: 1.2;">${body.title}</h2>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                ${body.excerpt || 'We just published a new travel guide! Discover the latest tips, highlights, and stories from the heart of Namibia.'}
              </p>
              <a href="${postUrl}" style="display: inline-block; background-color: #f97316; color: white; padding: 14px 28px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px;">Read the Full Story &rarr;</a>
            </div>
            <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #f3f4f6;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">You are receiving this because you subscribed to Tuyeni Travel.</p>
            </div>
          </div>
        `
      });
      console.log("6. Resend API Response:", resendResponse);
    }

    return NextResponse.json({ message: 'Emails sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('7. Webhook Error Crash:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}