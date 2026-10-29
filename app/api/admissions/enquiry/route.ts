import { NextRequest, NextResponse } from 'next/server';
import { addEnquiry } from '@/lib/db/store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      parentName,
      phone,
      email,
      studentName,
      currentClass,
      classSeeking,
      previousSchool,
      preferredContactTime,
      preferredVisitDate,
      notes,
      source
    } = body;

    if (!parentName || !phone || !studentName) {
      return NextResponse.json(
        { error: 'Parent Name, Mobile Phone, and Student Name are required.' },
        { status: 400 }
      );
    }

    const enquiry = addEnquiry({
      parentName,
      phone,
      email: email || '',
      studentName,
      currentClass: currentClass || 'Not specified',
      classSeeking: classSeeking || 'Class 1',
      previousSchool: previousSchool || '',
      preferredContactTime: preferredContactTime || 'Anytime',
      preferredVisitDate: preferredVisitDate || '',
      notes: notes || '',
      source: source || 'ADMISSION_PAGE'
    });

    return NextResponse.json({ success: true, enquiry }, { status: 201 });
  } catch (error) {
    console.error('Error creating admission enquiry:', error);
    return NextResponse.json({ error: 'Internal server error processing enquiry' }, { status: 500 });
  }
}
