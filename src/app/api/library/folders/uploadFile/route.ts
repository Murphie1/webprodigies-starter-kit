// app/api/uploadFile/route.ts

import { NextResponse } from 'next/server';
import { uploadFile } from '@/lib/actions/file.actions'; // Import your backend uploadFile function

export async function POST(req: Request) {
  try {
    const formData = await req.formData(); // Parse the FormData from the request
    const file = formData.get('file') as File; // Get the file
    const ownerId = formData.get('ownerId') as string;
    const folderId = formData.get('folderId') as string;
    const accountId = formData.get('accountId') as string;
    const clerkId = formData.get('clerkId') as string;
    const path = formData.get('path') as string;

    if (!file) {
      return NextResponse.json({ error: 'File is required.' }, { status: 400 });
    }

    // Call your upload function here
    const result = await uploadFile({
      file: file,
      folderId,
      ownerId,
      accountId,
      clerkId,
      path,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
}
