import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-api';

function databaseError(error: { code: string; message: string }) {
  if (['42P01', '42703', 'PGRST204', 'PGRST205'].includes(error.code)) {
    return NextResponse.json({ error: 'กรุณาตั้งค่าฐานข้อมูลผลงานด้วยไฟล์ supabase-gallery.sql' }, { status: 503 });
  }
  if (error.code === '23505') {
    return NextResponse.json({ error: 'มีหมวดหมู่ชื่อนี้แล้ว' }, { status: 409 });
  }
  if (error.code === '23503') {
    return NextResponse.json({ error: 'ไม่พบหมวดหมู่ที่เลือก' }, { status: 409 });
  }
  console.error('Gallery database error:', error.message);
  return NextResponse.json({ error: 'ไม่สามารถจัดการข้อมูลผลงานได้' }, { status: 500 });
}

export async function GET(request: NextRequest) {
  const { error, supabaseAdmin } = await requireAdmin(request);
  if (error) return error;

  const [items, categories] = await Promise.all([
    supabaseAdmin.from('gallery_items')
      .select('id,title,alt,image_url,category_id,is_active,display_order')
      .order('display_order').order('created_at', { ascending: false }),
    supabaseAdmin.from('gallery_categories').select('id,name').order('name'),
  ]);
  if (items.error) return databaseError(items.error);
  if (categories.error) return databaseError(categories.error);
  return NextResponse.json({ items: items.data, categories: categories.data });
}

const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const validId = (value: unknown): value is string => typeof value === 'string' && uuid.test(value);
const cleanText = (value: unknown) => typeof value === 'string' ? value.trim() : '';
const invalid = (error: string) => NextResponse.json({ error }, { status: 400 });
const itemColumns = 'id,title,alt,image_url,category_id,is_active,display_order';
const maxDisplayOrder = 2147483647;

function galleryImagePath(imageUrl: string) {
  const directory = new URL('/storage/v1/object/public/images/gallery/', process.env.NEXT_PUBLIC_SUPABASE_URL).href;
  if (!imageUrl.startsWith(directory)) return null;
  const name = imageUrl.slice(directory.length);
  return /^[\w-]+\.(?:jpe?g|png|gif|webp)$/i.test(name) ? `gallery/${name}` : null;
}

export async function POST(request: NextRequest) {
  const { error, supabaseAdmin } = await requireAdmin(request);
  if (error) return error;

  const body = await request.json().catch(() => null);
  if (!body || (body.id != null && !validId(body.id))) return invalid('ข้อมูลไม่ถูกต้อง');

  if (body.type === 'category') {
    const name = cleanText(body.name);
    if (!name || name.length > 100) return invalid('ระบุชื่อหมวดหมู่ไม่เกิน 100 ตัวอักษร');
    const table = supabaseAdmin.from('gallery_categories');
    const result = await (body.id ? table.update({ name }).eq('id', body.id) : table.insert({ name }))
      .select('id,name').maybeSingle();
    if (result.error) return databaseError(result.error);
    if (!result.data) return NextResponse.json({ error: 'ไม่พบหมวดหมู่' }, { status: 404 });
    return NextResponse.json({ category: result.data });
  }

  if (body.type !== 'item' && body.type !== 'items') return invalid('ประเภทข้อมูลไม่ถูกต้อง');
  if (body.category_id != null && !validId(body.category_id)) return invalid('หมวดหมู่ไม่ถูกต้อง');
  if (!Number.isInteger(body.display_order) || body.display_order < 0 || body.display_order > maxDisplayOrder) {
    return invalid('ลำดับต้องเป็นจำนวนเต็มตั้งแต่ 0 ถึง 2,147,483,647');
  }
  const item = {
    title: cleanText(body.title) || null,
    alt: cleanText(body.alt) || null,
    category_id: body.category_id ?? null,
    is_active: body.is_active === true,
    display_order: body.display_order,
    updated_at: new Date().toISOString(),
  };
  const table = supabaseAdmin.from('gallery_items');

  if (body.type === 'items') {
    const images: unknown = body.images;
    if (!Array.isArray(images) || !images.length) return invalid('กรุณาเลือกอย่างน้อย 1 รูป');
    if (item.display_order + images.length - 1 > maxDisplayOrder) return invalid('ลำดับเริ่มต้นสูงเกินไปสำหรับจำนวนรูปที่เลือก');
    const rows = [];
    const ids = new Set<string>();
    for (const [index, image] of images.entries()) {
      const imageUrl = cleanText(image?.image_url);
      if (!validId(image?.id) || ids.has(image.id) || !galleryImagePath(imageUrl)) {
        return invalid('ข้อมูลรูปผลงานไม่ถูกต้อง');
      }
      ids.add(image.id);
      rows.push({ ...item, id: image.id, image_url: imageUrl, display_order: item.display_order + index });
    }
    // Keep the same IDs when retrying an upload whose save response did not reach the browser.
    const result = await table.upsert(rows, { onConflict: 'id', ignoreDuplicates: true });
    if (result.error) return databaseError(result.error);
    const saved = await supabaseAdmin.from('gallery_items').select(itemColumns).in('id', [...ids]).order('display_order');
    if (saved.error) return databaseError(saved.error);
    return NextResponse.json({ items: saved.data });
  }

  const imageUrl = cleanText(body.image_url);
  if (!galleryImagePath(imageUrl)) {
    // Existing entries may already point to a different image location.
    if (!body.id) return invalid('กรุณาอัปโหลดรูปผลงาน');
    const previous = await supabaseAdmin.from('gallery_items').select('image_url').eq('id', body.id).maybeSingle();
    if (previous.error) return databaseError(previous.error);
    if (previous.data?.image_url !== imageUrl) return invalid('กรุณาอัปโหลดรูปผลงาน');
  }
  const row = { ...item, image_url: imageUrl };
  const result = await (body.id ? table.update(row).eq('id', body.id) : table.insert(row))
    .select(itemColumns).maybeSingle();
  if (result.error) return databaseError(result.error);
  if (!result.data) return NextResponse.json({ error: 'ไม่พบผลงาน' }, { status: 404 });
  return NextResponse.json({ item: result.data });
}

export async function DELETE(request: NextRequest) {
  const { error, supabaseAdmin } = await requireAdmin(request);
  if (error) return error;

  const { searchParams } = request.nextUrl;
  const id = searchParams.get('id');
  const type = searchParams.get('type');
  if (!validId(id) || (type !== 'item' && type !== 'category')) return invalid('ข้อมูลไม่ถูกต้อง');

  if (type === 'category') {
    const result = await supabaseAdmin.from('gallery_categories').delete().eq('id', id);
    if (result.error?.code === '23503') {
      return NextResponse.json({ error: 'ลบหมวดหมู่นี้ไม่ได้ เพราะยังมีผลงานใช้อยู่' }, { status: 409 });
    }
    if (result.error) return databaseError(result.error);
    return NextResponse.json({ success: true });
  }

  const removed = await supabaseAdmin.from('gallery_items').delete().eq('id', id).select('image_url').maybeSingle();
  if (removed.error) return databaseError(removed.error);
  if (!removed.data) return NextResponse.json({ success: true, image: 'unchanged' });

  const path = galleryImagePath(removed.data.image_url);
  if (!path) return NextResponse.json({ success: true, image: 'kept' });

  const references = await supabaseAdmin.from('gallery_items')
    .select('id', { count: 'exact', head: true }).eq('image_url', removed.data.image_url);
  if (references.error) {
    console.error('Gallery image reference check failed:', references.error.message);
    return NextResponse.json({ success: true, image: 'failed' });
  }
  if (references.count) return NextResponse.json({ success: true, image: 'kept' });

  const storage = await supabaseAdmin.storage.from('images').remove([path]);
  if (storage.error) {
    console.error('Gallery image removal failed:', storage.error.message);
    return NextResponse.json({ success: true, image: 'failed' });
  }
  return NextResponse.json({ success: true, image: 'removed' });
}
