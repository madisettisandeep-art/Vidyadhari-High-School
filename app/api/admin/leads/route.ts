import { NextRequest, NextResponse } from 'next/server';
import { getStore, getStoreMetrics, updateEnquiryStatus, updateVisitStatus } from '@/lib/db/store';

export async function GET() {
  try {
    const store = getStore();
    const metrics = getStoreMetrics();

    return NextResponse.json({
      metrics,
      enquiries: store.enquiries,
      visits: store.visits
    }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      }
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
