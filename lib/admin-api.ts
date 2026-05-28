import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getBearerToken, verifyAdminToken } from './admin-token';

export function adminSupabaseErrorResponse(message: string) {
  if (message.toLowerCase().includes('invalid api key')) {
    return NextResponse.json(
      { error: 'Invalid Supabase service role key. Update SUPABASE_SERVICE_ROLE_KEY in the server environment.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ error: message }, { status: 500 });
}

export async function requireAdmin(request: NextRequest) {
  const token = getBearerToken(request.headers.get('authorization')) || request.cookies.get('adminToken')?.value;
  const admin = await verifyAdminToken(token);

  if (!admin) {
    return {
      error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
      supabaseAdmin: null,
    };
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return {
      error: NextResponse.json({ error: 'Server configuration error' }, { status: 500 }),
      supabaseAdmin: null,
    };
  }

  return {
    error: null,
    supabaseAdmin: createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }),
  };
}
