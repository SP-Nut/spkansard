import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-api';

export async function POST(request: NextRequest) {
  const { error, supabaseAdmin } = await requireAdmin(request);
  if (error) return error;

  const body = await request.json();
  const { error: insertError } = await supabaseAdmin
    .from('categories')
    .insert([{
      name: String(body.name || '').trim(),
      description: String(body.description || '').trim() || null,
      display_order: Number(body.display_order || 0),
      is_active: Boolean(body.is_active),
    }]);

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function PATCH(request: NextRequest) {
  const { error, supabaseAdmin } = await requireAdmin(request);
  if (error) return error;

  const body = await request.json();
  const updates = Array.isArray(body.updates) ? body.updates : null;

  if (updates) {
    for (const update of updates) {
      const { error: updateError } = await supabaseAdmin
        .from('categories')
        .update({ display_order: Number(update.display_order || 0) })
        .eq('id', update.id);

      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  }

  if (!body.id) {
    return NextResponse.json({ error: 'Category id is required' }, { status: 400 });
  }

  const { error: updateError } = await supabaseAdmin
    .from('categories')
    .update({
      name: String(body.name || '').trim(),
      description: String(body.description || '').trim() || null,
      display_order: Number(body.display_order || 0),
      is_active: Boolean(body.is_active),
    })
    .eq('id', body.id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const { error, supabaseAdmin } = await requireAdmin(request);
  if (error) return error;

  const id = request.nextUrl.searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Category id is required' }, { status: 400 });
  }

  const { error: deleteError } = await supabaseAdmin
    .from('categories')
    .delete()
    .eq('id', id);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
