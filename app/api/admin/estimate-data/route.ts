import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-api';

const productFields = (body: Record<string, unknown>, includeUpdatedAt = true) => ({
  type: body.type,
  name: body.name,
  image_url: body.image_url || null,
  image_alt: body.image_alt || null,
  prices: body.prices && typeof body.prices === 'object' ? body.prices : {},
  display_order: Number(body.display_order) || 0,
  is_active: body.is_active !== false,
  ...(includeUpdatedAt ? { updated_at: new Date().toISOString() } : {}),
});

const serviceFields = (body: Record<string, unknown>, includeUpdatedAt = true) => ({
  service_type: body.service_type,
  service_group: body.service_group,
  name: body.name,
  price: Number(body.price) || 0,
  unit: body.unit,
  only_size: body.only_size || null,
  display_order: Number(body.display_order) || 0,
  is_active: body.is_active !== false,
  ...(includeUpdatedAt ? { updated_at: new Date().toISOString() } : {}),
});

const getTable = (kind: string | null) => {
  if (kind === 'products') return 'estimate_products';
  if (kind === 'services') return 'estimate_services';
  return null;
};

export async function GET(request: NextRequest) {
  const { error, supabaseAdmin } = await requireAdmin(request);
  if (error) return error;

  const [productsResult, servicesResult] = await Promise.all([
    supabaseAdmin
      .from('estimate_products')
      .select('id,type,name,image_url,image_alt,prices,display_order,is_active')
      .order('display_order', { ascending: true }),
    supabaseAdmin
      .from('estimate_services')
      .select('id,service_type,service_group,name,price,unit,only_size,display_order,is_active')
      .order('display_order', { ascending: true }),
  ]);

  if (productsResult.error) {
    return NextResponse.json({ error: productsResult.error.message }, { status: 500 });
  }

  if (servicesResult.error) {
    return NextResponse.json({ error: servicesResult.error.message }, { status: 500 });
  }

  return NextResponse.json({
    products: productsResult.data || [],
    services: servicesResult.data || [],
  });
}

export async function POST(request: NextRequest) {
  const { error, supabaseAdmin } = await requireAdmin(request);
  if (error) return error;

  const body = await request.json();
  const kind = String(body.kind || '');
  const table = getTable(kind);
  if (!table) return NextResponse.json({ error: 'Invalid estimate data kind' }, { status: 400 });

  const insertPayload = kind === 'products' ? productFields(body, false) : serviceFields(body, false);
  const { error: insertError } = await supabaseAdmin
    .from(table)
    .insert([insertPayload]);

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function PATCH(request: NextRequest) {
  const { error, supabaseAdmin } = await requireAdmin(request);
  if (error) return error;

  const body = await request.json();
  const kind = String(body.kind || '');
  const table = getTable(kind);
  if (!table) return NextResponse.json({ error: 'Invalid estimate data kind' }, { status: 400 });
  if (!body.id) return NextResponse.json({ error: 'Estimate data id is required' }, { status: 400 });

  const payload = kind === 'products' ? productFields(body) : serviceFields(body);
  const { error: updateError } = await supabaseAdmin
    .from(table)
    .update(payload)
    .eq('id', body.id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const { error, supabaseAdmin } = await requireAdmin(request);
  if (error) return error;

  const kind = request.nextUrl.searchParams.get('kind');
  const id = request.nextUrl.searchParams.get('id');
  const table = getTable(kind);

  if (!table) return NextResponse.json({ error: 'Invalid estimate data kind' }, { status: 400 });
  if (!id) return NextResponse.json({ error: 'Estimate data id is required' }, { status: 400 });

  const { error: deleteError } = await supabaseAdmin
    .from(table)
    .delete()
    .eq('id', id);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
