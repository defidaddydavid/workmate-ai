import { NextResponse } from 'next/server';

// Simulated user database for demo purposes
const users = [
  {
    id: '1',
    email: 'demo@workmate.ai',
    password: 'demo1234', // In a real app, this would be hashed
    name: 'Demo User',
    role: 'admin',
  },
  {
    id: '2',
    email: 'test@workmate.ai',
    password: 'test1234',
    name: 'Test User',
    role: 'user',
  },
];

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Simple validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user
    const user = users.find(user => user.email === email);

    // Validate credentials
    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // In a real app, you'd create a JWT token here
    const token = 'mock-jwt-token-' + Math.random().toString(36).substring(2);

    // Return user info (excluding password) and token
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
