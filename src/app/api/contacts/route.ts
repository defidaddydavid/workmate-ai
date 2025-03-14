import { NextResponse } from 'next/server';

// Sample team member/contact data
const contacts = [
  {
    id: 'c-001',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'Product Manager',
    department: 'Product',
    avatar: null,
    meetings: ['mt-001', 'mt-002'],
    recentActionItems: [
      {
        id: 'ai-001',
        text: 'Schedule product roadmap review',
        dueDate: '2025-03-20',
        completed: false,
        meetingId: 'mt-002'
      }
    ]
  },
  {
    id: 'c-002',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    role: 'Senior Developer',
    department: 'Engineering',
    avatar: null,
    meetings: ['mt-001'],
    recentActionItems: [
      {
        id: 'ai-002',
        text: 'Fix data formatting issue for dashboard',
        dueDate: '2025-03-17',
        completed: false,
        meetingId: 'mt-001'
      }
    ]
  },
  {
    id: 'c-003',
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@company.com',
    role: 'UX Researcher',
    department: 'Design',
    avatar: null,
    meetings: ['mt-001', 'mt-002'],
    recentActionItems: [
      {
        id: 'ai-003',
        text: 'Present user research findings',
        dueDate: '2025-03-11',
        completed: true,
        meetingId: 'mt-001'
      },
      {
        id: 'ai-004',
        text: 'Create detailed spec for collaboration features',
        dueDate: '2025-03-19',
        completed: false,
        meetingId: 'mt-002'
      }
    ]
  },
  {
    id: 'c-004',
    name: 'Jamie Taylor',
    email: 'jamie.taylor@company.com',
    role: 'UI Designer',
    department: 'Design',
    avatar: null,
    meetings: ['mt-001', 'mt-002'],
    recentActionItems: [
      {
        id: 'ai-005',
        text: 'Share onboarding flow mockups',
        dueDate: '2025-03-13',
        completed: false,
        meetingId: 'mt-001'
      }
    ]
  },
  {
    id: 'c-005',
    name: 'Emma Wilson',
    email: 'emma.wilson@company.com',
    role: 'Data Analyst',
    department: 'Analytics',
    avatar: null,
    meetings: ['mt-002'],
    recentActionItems: [
      {
        id: 'ai-006',
        text: 'Prepare analytics dashboard improvement proposal',
        dueDate: '2025-03-20',
        completed: false,
        meetingId: 'mt-002'
      }
    ]
  },
  {
    id: 'c-006',
    name: 'David Lee',
    email: 'david.lee@company.com',
    role: 'Marketing Manager',
    department: 'Marketing',
    avatar: null,
    meetings: ['mt-002'],
    recentActionItems: []
  }
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const contactId = searchParams.get('id');
  const department = searchParams.get('department');

  if (contactId) {
    // Return a specific contact
    const contact = contacts.find(c => c.id === contactId);

    if (contact) {
      return NextResponse.json(contact);
    } else {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }
  }

  let filteredContacts = [...contacts];

  // Filter by department if specified
  if (department) {
    filteredContacts = filteredContacts.filter(c =>
      c.department.toLowerCase() === department.toLowerCase()
    );
  }

  return NextResponse.json(filteredContacts);
}

export async function POST(req: Request) {
  try {
    const { name, email, role, department } = await req.json();

    // Simple validation
    if (!name || !email || !role || !department) {
      return NextResponse.json(
        { error: 'Name, email, role, and department are required' },
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

    // In a real application, you would check if the email already exists

    // Create a new contact
    const newContact = {
      id: 'c-' + (contacts.length + 1).toString().padStart(3, '0'),
      name,
      email,
      role,
      department,
      avatar: null,
      meetings: [],
      recentActionItems: []
    };

    // In a real application, you would save this to a database

    return NextResponse.json({
      message: 'Contact created successfully',
      contact: newContact
    });
  } catch (error) {
    console.error('Contact creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
