import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    // Simple validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Password strength validation
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // In a real application, you would:
    // 1. Check if the email already exists in the database
    // 2. Hash the password before storing
    // 3. Store the user in the database

    // Simulate successful registration
    const newUser = {
      id: Math.random().toString(36).substring(2),
      email,
      name,
      role: 'user',
      createdAt: new Date().toISOString(),
    };

    // In a real app, you'd create a JWT token here
    const token = 'mock-jwt-token-' + Math.random().toString(36).substring(2);

    return NextResponse.json({
      user: newUser,
      token,
      message: 'Registration successful',
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
