import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-api';

export async function POST(request: NextRequest) {
  const { error, supabaseAdmin } = await requireAdmin(request);
  if (error) return error;

  const body = await request.json();
  const { error: insertError } = await supabaseAdmin
    .from('materials')
    .insert([{
      name: body.name,
      description: body.description,
      image_url: body.image_url || null,
      features: Array.isArray(body.features) ? body.features : [],
      price_range: body.price_range || '',
      category: body.category,
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
  if (!body.id) {
    return NextResponse.json({ error: 'Material id is required' }, { status: 400 });
  }

  const { error: updateError } = await supabaseAdmin
    .from('materials')
    .update({
      name: body.name,
      description: body.description,
      image_url: body.image_url || null,
      features: Array.isArray(body.features) ? body.features : [],
      price_range: body.price_range || '',
      category: body.category,
      updated_at: new Date().toISOString(),
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
    return NextResponse.json({ error: 'Material id is required' }, { status: 400 });
  }

  const { error: deleteError } = await supabaseAdmin
    .from('materials')
    .delete()
    .eq('id', id);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
