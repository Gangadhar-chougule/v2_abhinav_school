import { NextResponse } from 'next/server';
import { storeUploadedImage } from '@/lib/localUploads';

export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section') || 'site';
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'Image file is required' }, { status: 400 });
    }

    const imagePath = await storeUploadedImage(file, section);
    return NextResponse.json({ success: true, imagePath }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 400 });
  }
}
