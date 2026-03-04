import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, role, message } = body;

    if (!name || !email || !company || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // TODO: Insert into Supabase demo_requests table when configured
    // For now, log the request
    console.log('Demo request received:', { name, email, company, role, message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
