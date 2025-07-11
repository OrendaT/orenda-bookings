import { NextRequest, NextResponse } from 'next/server';
import Mailchimp from '@mailchimp/mailchimp_transactional';
import { ORENDA_LOGO as logo } from '@/lib/constants';
import { isAxiosError } from 'axios';

// Initialize with server-side API key
const mailchimpClient = Mailchimp(process.env.MAILCHIMP_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { email, first_name, last_name, phone, state, date, time } = data;
    const name = `${first_name} ${last_name}`;

    const subject = 'Patient Booking Request';

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <!-- Logo -->
        <header style="text-align: center; margin-bottom: 30px;">
          <img src="${logo}" alt="Orenda Psychiatry" style="max-width: 180px;">
        </header>
  
        <!-- Content -->
        <main style="color: #333; line-height: 1.5; font-size: 14px;">
            <p>Hi Team,</p>
            <p>${name} as indicated interest in booking an intake at ${time} on ${date}, please follow up with them.</p>

            <br/>

            <p>Contact details:</p>
            <p>First Name: ${first_name}</p>
            <p>Last Name: ${last_name}</p>
            <p>Email: ${email}</p>
            <p>Phone Number: ${phone}</p>
            <p>State: ${state}</p>

            <br/>

            <p>Thank you!</p>
        </main>
  
  
        <!-- Footer -->
        <footer style="margin-top: 40px; text-align: center; color: #666; font-size: 12px;">
          <p>80 Fifth Avenue, Office #903-10, New York, NY 10011.</p>
          <p>Call: (347) 707-7735 | Email: <a href="mailto:admin@orendapsych.com" style="color: #2e0086;">admin@orendapsych.com</a></p>
          <div style="margin-top: 20px;">
            <img src="${logo}" alt="Orenda Psychiatry" style="max-width: 120px;">
          </div>
        </footer>
      </div>
    `;

    // Prepare message for Mailchimp
    const message = {
      from_email: 'admin@orendapsych.com',
      from_name: 'Orenda Psychiatry',
      subject,
      html,
      to: [
        {
          email: 'intake@orendapsych.com',
          name: 'Intake Team',
          type: 'to' as const,
        },
      ],
      track_opens: true,
      track_clicks: true,
    };

    // Send email via Mailchimp
    const response = await mailchimpClient.messages.send({ message });

    if (isAxiosError(response)) {
      throw response;
    }

    return NextResponse.json({
      success: !response[0].reject_reason,
      response,
    });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      {
        success: false,
        error,
      },
      { status: 500 },
    );
  }
}
