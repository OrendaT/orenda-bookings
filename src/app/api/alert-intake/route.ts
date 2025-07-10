import { NextRequest, NextResponse } from 'next/server';
import mailchimp from '@mailchimp/mailchimp_transactional';
import { INTAKE_FORM_URL as url, ORENDA_LOGO as logo } from '@/lib/constants';

// Initialize with server-side API key
const mailchimpClient = mailchimp(process.env.MAILCHIMP_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { email, name, state, date, time } = data;

    const subject = 'Patient Booking Request';

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <!-- Logo -->
        <header style="text-align: center; margin-bottom: 30px;">
          <img src="${logo}" alt="Orenda Psychiatry" style="max-width: 180px;">
        </header>
  
        <!-- Content -->
        <main style="color: #333; line-height: 1.5; font-size: 14px;">
            <p>Hello Orenda,</p>
            
            <p>${name} has booked an appointment with Orenda Psychiatry.</p>

            <p>Here are the details:</p>

            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>State of Residence: ${state}</p>
            <p>Appointment Date: ${date}</p>
            <p>Appointment Time: ${time}</p>
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
          email,
          name: 'Intake Team',
          type: 'to' as const,
        },
      ],
      track_opens: true,
      track_clicks: true,
    };

    // Send email via Mailchimp
    const response = await mailchimpClient.messages.send({ message });

    return NextResponse.json({ success: true, response });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
