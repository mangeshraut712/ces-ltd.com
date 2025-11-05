import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: NextRequest) {
  try {
    const { name, email, company, region, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Insert into database
    const result = await sql`
      INSERT INTO contact_submissions (name, email, company, region, message, created_at)
      VALUES (${name}, ${email}, ${company || null}, ${region}, ${message}, NOW())
      RETURNING id
    `;

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      id: result.rows[0].id
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get all contact submissions (for admin purposes)
    const result = await sql`
      SELECT id, name, email, company, region, message, created_at
      FROM contact_submissions
      ORDER BY created_at DESC
      LIMIT 100
    `;

    return NextResponse.json({
      submissions: result.rows,
      count: result.rows.length
    });

  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}
