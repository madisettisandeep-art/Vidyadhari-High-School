import { NextRequest, NextResponse } from 'next/server';
import { getStore, updateSettings, updateCMSItem } from '@/lib/db/store';

export async function GET() {
  try {
    const store = getStore();
    return NextResponse.json({
      settings: store.settings,
      locations: store.locations,
      dayTimeline: store.dayTimeline,
      achievements: store.achievements,
      faculty: store.faculty,
      gallery: store.gallery
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      }
    });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch CMS content' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { collection, data } = body;

    if (collection === 'settings') {
      const updated = updateSettings(data);
      return NextResponse.json({ success: true, settings: updated });
    }

    if (['locations', 'achievements', 'faculty', 'gallery', 'dayTimeline'].includes(collection)) {
      const updated = updateCMSItem(collection as any, data);
      return NextResponse.json({ success: true, collection, data: updated });
    }

    return NextResponse.json({ error: 'Unknown CMS collection' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to save CMS updates' }, { status: 500 });
  }
}
