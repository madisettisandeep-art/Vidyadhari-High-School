import { NextRequest, NextResponse } from 'next/server';
import { queryVidyadhariAI } from '@/lib/ai/knowledgeBase';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Valid question message is required.' }, { status: 400 });
    }

    const response = queryVidyadhariAI(message);
    return NextResponse.json(response);
  } catch (err) {
    return NextResponse.json({ error: 'AI knowledge query error' }, { status: 500 });
  }
}
