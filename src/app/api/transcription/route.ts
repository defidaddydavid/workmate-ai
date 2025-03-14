import { NextResponse } from 'next/server';

// Sample meeting transcriptions
const sampleTranscriptions = [
  {
    id: 'tr-1',
    meetingId: 'mt-001',
    title: 'Weekly Team Standup',
    date: '2025-03-10T10:00:00Z',
    duration: 1800, // 30 minutes in seconds
    participants: ['Sarah Johnson', 'Michael Chen', 'Alex Rodriguez', 'Jamie Taylor'],
    transcript: [
      {
        speaker: 'Sarah Johnson',
        timestamp: '00:00:10',
        text: 'Good morning everyone! Let\'s start with our weekly standup. Michael, can you start by sharing your updates?'
      },
      {
        speaker: 'Michael Chen',
        timestamp: '00:00:20',
        text: 'Sure thing. This week I completed the backend API for the user authentication system and started working on the data visualization dashboard. I\'m currently blocked by the data formatting issue we discussed last week.'
      },
      {
        speaker: 'Sarah Johnson',
        timestamp: '00:01:05',
        text: 'Thanks for the update. Alex, let\'s hear from you next.'
      },
      {
        speaker: 'Alex Rodriguez',
        timestamp: '00:01:12',
        text: 'I finished the user research study and compiled the results. We had some interesting findings that I\'ll share in our product meeting tomorrow. I\'ve also prepared the first draft of the Q2 roadmap for review.'
      },
      {
        speaker: 'Sarah Johnson',
        timestamp: '00:01:55',
        text: 'Great work, Alex. Jamie, how about your updates?'
      },
      {
        speaker: 'Jamie Taylor',
        timestamp: '00:02:05',
        text: 'I\'ve been working on the new onboarding flow designs. I should have mockups ready by Thursday for feedback. I\'m also coordinating with the marketing team on the new feature announcement materials.'
      }
    ],
    summary: 'Team discussed progress on various projects including backend API development, user research findings, Q2 roadmap draft, and new onboarding flow designs. Michael mentioned being blocked by a data formatting issue.',
    actionItems: [
      {
        text: 'Michael to resolve data formatting issue for the dashboard',
        assignee: 'Michael Chen',
        dueDate: '2025-03-17'
      },
      {
        text: 'Alex to present user research findings at product meeting',
        assignee: 'Alex Rodriguez',
        dueDate: '2025-03-11'
      },
      {
        text: 'Jamie to share onboarding flow mockups for feedback',
        assignee: 'Jamie Taylor',
        dueDate: '2025-03-13'
      }
    ]
  },
  {
    id: 'tr-2',
    meetingId: 'mt-002',
    title: 'Product Strategy Session',
    date: '2025-03-12T14:00:00Z',
    duration: 3600, // 60 minutes in seconds
    participants: ['Sarah Johnson', 'Alex Rodriguez', 'Jamie Taylor', 'David Lee', 'Emma Wilson'],
    transcript: [
      {
        speaker: 'Sarah Johnson',
        timestamp: '00:00:05',
        text: 'Welcome everyone to our product strategy session. Today we\'ll be discussing our priorities for Q3 and beyond.'
      },
      {
        speaker: 'Alex Rodriguez',
        timestamp: '00:01:10',
        text: 'Based on our recent user research, I think we should prioritize improving the analytics dashboard and adding the collaboration features that users have been requesting.'
      },
      {
        speaker: 'Emma Wilson',
        timestamp: '00:02:30',
        text: 'I agree with Alex. The user feedback has been consistent about the need for better collaboration features. Our competitors are also moving in this direction.'
      }
    ],
    summary: 'The team discussed Q3 priorities, focusing on analytics dashboard improvements and new collaboration features based on user research and competitive analysis.',
    actionItems: [
      {
        text: 'Create detailed spec for collaboration features',
        assignee: 'Alex Rodriguez',
        dueDate: '2025-03-19'
      },
      {
        text: 'Prepare analytics dashboard improvement proposal',
        assignee: 'Emma Wilson',
        dueDate: '2025-03-20'
      }
    ]
  }
];

export async function GET(req: Request) {
  // Get the meeting ID from the URL parameters
  const { searchParams } = new URL(req.url);
  const meetingId = searchParams.get('meetingId');

  if (meetingId) {
    // Return a specific meeting transcription
    const transcription = sampleTranscriptions.find(t => t.meetingId === meetingId);

    if (transcription) {
      return NextResponse.json(transcription);
    } else {
      return NextResponse.json(
        { error: 'Meeting transcription not found' },
        { status: 404 }
      );
    }
  }

  // Return all transcriptions (without the full transcript for brevity)
  const transcriptionSummaries = sampleTranscriptions.map(({ id, meetingId, title, date, duration, participants, summary, actionItems }) => ({
    id,
    meetingId,
    title,
    date,
    duration,
    participants,
    summary,
    actionItems,
  }));

  return NextResponse.json(transcriptionSummaries);
}

export async function POST(req: Request) {
  try {
    // In a real application, this would process an audio file or live stream
    // and return a transcription using a speech-to-text service
    const { meetingTitle, participants } = await req.json();

    if (!meetingTitle) {
      return NextResponse.json(
        { error: 'Meeting title is required' },
        { status: 400 }
      );
    }

    // Simulate creating a new transcription
    const newTranscription = {
      id: 'tr-' + Math.floor(Math.random() * 1000),
      meetingId: 'mt-' + Math.floor(Math.random() * 1000),
      title: meetingTitle,
      date: new Date().toISOString(),
      duration: 0, // would be calculated from actual recording
      participants: participants || ['Current User'],
      transcript: [
        {
          speaker: 'System',
          timestamp: '00:00:00',
          text: 'This is a simulated transcription. In a real application, this would be generated from audio input.'
        }
      ],
      summary: 'Simulated meeting summary.',
      actionItems: []
    };

    return NextResponse.json({
      message: 'Transcription started',
      transcription: newTranscription
    });
  } catch (error) {
    console.error('Transcription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
