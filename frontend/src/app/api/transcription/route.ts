import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function fetchFromBackend(endpoint: string, options: RequestInit = {}) {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Backend request failed: ${response.statusText}`);
  }

  return response;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const meetingId = searchParams.get('meetingId');
    const type = searchParams.get('type') || 'summary';

    if (!meetingId) {
      return NextResponse.json(
        { error: 'Meeting ID is required' },
        { status: 400 }
      );
    }

    let endpoint = '';
    switch (type) {
      case 'transcript':
        endpoint = `/api/v1/transcription/${meetingId}/transcript`;
        break;
      case 'analysis':
        endpoint = `/api/v1/transcription/${meetingId}/analysis`;
        break;
      case 'status':
        endpoint = `/api/v1/transcription/${meetingId}/status`;
        break;
      case 'documents':
        endpoint = `/api/v1/transcription/${meetingId}/documents`;
        break;
      default:
        endpoint = `/api/v1/transcription/${meetingId}`;
    }

    const response = await fetchFromBackend(endpoint);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching transcription:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transcription data' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const meetingId = formData.get('meetingId');
    const audioFile = formData.get('audioFile');
    const tier = formData.get('tier') || 'basic';

    if (!meetingId || !audioFile) {
      return NextResponse.json(
        { error: 'Meeting ID and audio file are required' },
        { status: 400 }
      );
    }

    const response = await fetchFromBackend(
      `/api/v1/transcription/upload/${meetingId}`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error uploading audio:', error);
    return NextResponse.json(
      { error: 'Failed to upload audio file' },
      { status: 500 }
    );
  }
}

// WebSocket upgrade handler for live transcription
export async function GET_UPGRADE(req: Request) {
  const { searchParams } = new URL(req.url);
  const meetingId = searchParams.get('meetingId');
  const tier = searchParams.get('tier');

  if (!meetingId || tier !== 'enterprise') {
    return new Response('Invalid request', { status: 400 });
  }

  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  const upgradeHeader = req.headers.get('Upgrade');
  if (!upgradeHeader || upgradeHeader.toLowerCase() !== 'websocket') {
    return new Response('Expected Upgrade: websocket', { status: 426 });
  }

  try {
    const wsUrl = `${API_BASE_URL.replace('http', 'ws')}/api/v1/transcription/live/${meetingId}?tier=enterprise`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      ws.send(JSON.stringify({ token }));
    };

    return new Response(null, {
      status: 101,
      webSocket: ws,
    });
  } catch (error) {
    console.error('WebSocket connection failed:', error);
    return new Response('WebSocket connection failed', { status: 500 });
  }
}
