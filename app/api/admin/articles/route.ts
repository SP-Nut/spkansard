import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-api';
import { sanitizeHtml } from '@/lib/sanitize';

export async function POST(request: NextRequest) {
  const { error, supabaseAdmin } = await requireAdmin(request);
  if (error) return error;

  const body = await request.json();
  const { error: insertError } = await supabaseAdmin
    .from('articles')
    .insert([{
      title: body.title,
      slug: body.slug,
      content: sanitizeHtml(body.content || ''),
      excerpt: body.excerpt || body.summary || '',
      image_url: body.image_url || null,
      tags: Array.isArray(body.tags) ? body.tags : [],
      published: Boolean(body.published),
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
    return NextResponse.json({ error: 'Article id is required' }, { status: 400 });
  }

  const updates: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  for (const key of ['title', 'excerpt', 'image_url', 'tags', 'published'] as const) {
    if (key in body) updates[key] = body[key];
  }

  if ('summary' in body && !('excerpt' in body)) updates.excerpt = body.summary;
  if ('content' in body) updates.content = sanitizeHtml(body.content || '');
  if ('image_url' in body && !body.image_url) updates.image_url = null;
  if ('published' in body) updates.published = Boolean(body.published);

  const { error: updateError } = await supabaseAdmin
    .from('articles')
    .update(updates)
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
    return NextResponse.json({ error: 'Article id is required' }, { status: 400 });
  }

  const { error: deleteError } = await supabaseAdmin
    .from('articles')
    .delete()
    .eq('id', id);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
