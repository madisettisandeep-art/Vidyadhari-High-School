import { NextRequest, NextResponse } from 'next/server';
import { getStore, updateEnquiryStatus, updateVisitStatus } from '@/lib/db/store';

export async function GET() {
  try {
    const store = getStore();

    // Calculate conversion metrics
    const totalEnquiries = store.enquiries.length;
    const newEnquiries = store.enquiries.filter(e => e.status === 'NEW').length;
    const contacted = store.enquiries.filter(e => e.status === 'CONTACTED').length;
    const followUp = store.enquiries.filter(e => e.status === 'FOLLOW-UP').length;
    const campusVisits = store.enquiries.filter(e => e.status === 'CAMPUS VISIT').length + store.visits.length;
    const converted = store.enquiries.filter(e => e.status === 'CONVERTED').length;

    const conversionRate = totalEnquiries > 0
      ? ((converted / totalEnquiries) * 100).toFixed(1)
      : '0.0';

    return NextResponse.json({
      metrics: {
        totalEnquiries,
        newEnquiries,
        contacted,
        followUp,
        campusVisits,
        converted,
        conversionRate: `${conversionRate}%`,
        totalVisitsBooked: store.visits.length
      },
      enquiries: store.enquiries,
      visits: store.visits
    });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, id, status, adminNotes } = body;

    if (type === 'enquiry') {
      const updated = updateEnquiryStatus(id, status, adminNotes);
      if (!updated) {
        return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, item: updated });
    } else if (type === 'visit') {
      const updated = updateVisitStatus(id, status, adminNotes);
      if (!updated) {
        return NextResponse.json({ error: 'Visit booking not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, item: updated });
    }

    return NextResponse.json({ error: 'Invalid lead type' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}
