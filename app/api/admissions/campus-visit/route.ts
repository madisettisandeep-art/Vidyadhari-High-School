import { NextRequest, NextResponse } from 'next/server';
import { addCampusVisit } from '@/lib/db/store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      parentName,
      phone,
      email,
      studentName,
      classSeeking,
      visitDate,
      visitTimeSlot,
      message
    } = body;

    if (!parentName || !phone || !visitDate) {
      return NextResponse.json(
        { error: 'Parent Name, Contact Phone, and Visit Date are required.' },
        { status: 400 }
      );
    }

    const visit = addCampusVisit({
      parentName,
      phone,
      email: email || '',
      studentName: studentName || '',
      classSeeking: classSeeking || 'Class 1',
      visitDate,
      visitTimeSlot: visitTimeSlot || '10:00 AM – 11:00 AM',
      message: message || ''
    });

    return NextResponse.json({ success: true, visit }, { status: 201 });
  } catch (error) {
    console.error('Error creating campus visit booking:', error);
    return NextResponse.json({ error: 'Internal server error scheduling visit' }, { status: 500 });
  }
}
