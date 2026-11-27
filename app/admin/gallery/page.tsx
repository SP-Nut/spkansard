'use client';

import { AdminHeading, adminPrimary, adminSecondary } from '@/app/admin/AdminHeading';
import Image from 'next/image';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

type Category = { id: string; name: string };
type GalleryItem = {
  id: string;
  title: string | null;
  alt: string | null;
  image_url: string;
  category_id: string | null;
  display_order: number;
  is_active: boolean;
};
type SelectedImage = { id: string; file: File; image_url?: string };

const newItem: Omit<GalleryItem, 'id'> & { id?: string } = {
  title: '', alt: '', image_url: '', category_id: null, display_order: 0, is_active: true,
};
const field = 'mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2';
const galleryImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

function validateImage(file: File) {
  if (!galleryImageTypes.includes(file.type)) throw new Error(`ไฟล์ ${file.name} ต้องเป็น JPEG, PNG, GIF หรือ WebP`);
  if (file.size > 4 * 1024 * 1024) throw new Error(`ไฟล์ ${file.name} มีขนาดเกิน 4 MB`);
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  if (response.status === 401) {
    window.location.assign('/admin/login');
    throw new Error('กรุณาเข้าสู่ระบบอีกครั้ง');
  }
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'ไม่สามารถดำเนินการได้');
  return result;
}

const endpoint = '/api/admin/gallery';

function save<T>(data: object) {
  return request<T>(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

async function uploadImage(file: File) {
  const form = new FormData();
  form.append('file', file);
  form.append('folder', 'gallery');
  return (await request<{ url: string }>('/api/upload', { method: 'POST', body: form })).url;
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [item, setItem] = useState(newItem);
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [category, setCategory] = useState<{ id?: string; name: string }>({ name: '' });
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);
  const itemForm = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    request<{ items: GalleryItem[]; categories: Category[] }>(endpoint, { signal: controller.signal })
      .then((data) => {
        setItems(data.items);
        setCategories(data.categories);
        setReady(true);
      })
      .catch((error) => { if (!controller.signal.aborted) setError(error.message); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, []);

  async function perform(action: () => Promise<void>) {
    if (pending || !ready) return;
    setPending(true);
    setError('');
    setNotice('');
    try {
      await action();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'ไม่สามารถดำเนินการได้');
    } finally {
      setPending(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>, action: () => Promise<void>) {
    event.preventDefault();
    void perform(action);
  }

  function editItem(selected = newItem) {
    setItem(selected);
    setSelectedImages([]);
    if (fileInput.current) fileInput.current.value = '';
  }

  function updateItems(saved: GalleryItem[]) {
    const savedIds = new Set(saved.map(({ id }) => id));
    setItems((previous) => [...saved, ...previous.filter(({ id }) => !savedIds.has(id))]
      .sort((a, b) => a.display_order - b.display_order));
  }

  async function addItems() {
    if (!selectedImages.length) throw new Error('กรุณาเลือกอย่างน้อย 1 รูป');
    if (item.display_order + selectedImages.length - 1 > 2147483647) {
      throw new Error('ลำดับเริ่มต้นสูงเกินไปสำหรับจำนวนรูปที่เลือก');
    }
    for (const { file } of selectedImages) validateImage(file);
    const images = [];
    setUploadingImages(true);
    try {
      for (const selected of selectedImages) {
        const url = selected.image_url ?? await uploadImage(selected.file);
        images.push({ id: selected.id, image_url: url });
        if (!selected.image_url) {
          setSelectedImages((previous) => previous.map((entry) => entry.id === selected.id
            ? { ...entry, image_url: url } : entry));
        }
      }
      const result = await save<{ items: GalleryItem[] }>({ ...item, images, type: 'items' });
      updateItems(result.items);
      editItem();
      setNotice(`เพิ่มผลงานแล้ว ${result.items.length} รูป`);
    } finally {
      setUploadingImages(false);
    }
  }

  async function saveItem() {
    if (!item.id) return addItems();
    const file = fileInput.current?.files?.[0];
    let imageUrl = item.image_url;
    if (file) {
      validateImage(file);
      imageUrl = await uploadImage(file);
      setItem({ ...item, image_url: imageUrl });
      if (fileInput.current) fileInput.current.value = '';
    }
    const result = await save<{ item: GalleryItem }>({ ...item, image_url: imageUrl, type: 'item' });
    updateItems([result.item]);
    editItem();
    setNotice('บันทึกผลงานแล้ว');
  }

  async function saveCategory() {
    const result = await save<{ category: Category }>({ ...category, type: 'category' });
    setCategories((previous) => [
      ...previous.filter(({ id }) => id !== result.category.id), result.category,
    ].sort((a, b) => a.name.localeCompare(b.name, 'th')));
    if (!category.id) setItem((previous) => ({ ...previous, category_id: result.category.id }));
    setCategory({ name: '' });
    setNotice('บันทึกหมวดหมู่แล้ว');
  }

  function removeItem(entry: GalleryItem) {
    const name = entry.title || entry.alt || 'ผลงานไม่มีชื่อ';
    if (!window.confirm(`ลบ “${name}” และไฟล์รูปจาก Storage ถาวรหรือไม่? หากต้องการเก็บรูปไว้ ให้ซ่อนผลงานแทน`)) return;
    void perform(async () => {
      const query = new URLSearchParams({ type: 'item', id: entry.id });
      await request(`${endpoint}?${query}`, { method: 'DELETE' });
      setItems((previous) => previous.filter(({ id }) => id !== entry.id));
      if (item.id === entry.id) editItem();
      setNotice('ลบผลงานและไฟล์รูปถาวรแล้ว');
    });
  }

  function removeCategory(entry: Category) {
    if (!window.confirm(`ลบหมวดหมู่ “${entry.name}” หรือไม่?`)) return;
    void perform(async () => {
      const query = new URLSearchParams({ type: 'category', id: entry.id });
      await request(`${endpoint}?${query}`, { method: 'DELETE' });
      setCategories((previous) => previous.filter(({ id }) => id !== entry.id));
      setItem((previous) => previous.category_id === entry.id ? { ...previous, category_id: null } : previous);
      if (category.id === entry.id) setCategory({ name: '' });
      setNotice('ลบหมวดหมู่แล้ว');
    });
  }

  const categoryUsage = new Map<string, number>();
  for (const { category_id } of items) {
    if (category_id) categoryUsage.set(category_id, (categoryUsage.get(category_id) ?? 0) + 1);
  }

  return (
    <div>
      <AdminHeading title="จัดการผลงาน" />
      <div className="space-y-3">
        {loading && <p role="status">กำลังโหลดข้อมูล…</p>}
        {error && <p role="alert" className="rounded-md bg-red-50 p-3 text-red-800">{error}</p>}
        {notice && <p role="status" className="rounded-md bg-green-50 p-3 text-green-800">{notice}</p>}
        {ready && (
          <>
            <div className="grid items-start gap-3 lg:grid-cols-[minmax(0,2fr)_minmax(240px,1fr)]">
              <form ref={itemForm} onSubmit={(event) => submit(event, saveItem)}
                className="rounded-lg bg-white p-3 sm:p-4 shadow-sm">
                <h2 className="mb-3 text-base font-semibold">{item.id ? 'แก้ไขผลงาน' : 'เพิ่มผลงาน'}</h2>
                <fieldset disabled={pending} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <label className="block">ชื่อผลงาน
                    <input className={field} value={item.title ?? ''}
                      onChange={(event) => setItem({ ...item, title: event.target.value })} />
                  </label>
                  <label className="block">ข้อความอธิบายรูปภาพ
                    <input className={field} value={item.alt ?? ''}
                      onChange={(event) => setItem({ ...item, alt: event.target.value })} />
                  </label>
                  <label className="block">หมวดหมู่
                    <select className={field} value={item.category_id ?? ''}
                      onChange={(event) => setItem({ ...item, category_id: event.target.value || null })}>
                      <option value="">ไม่มีหมวดหมู่</option>
                      {categories.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
                    </select>
                  </label>
                  <label className="block">{item.id ? 'เปลี่ยนรูปผลงาน' : 'รูปผลงาน'} (สูงสุด 4 MB ต่อรูป)
                    <input ref={fileInput} className={field} type="file" multiple={!item.id}
                      accept={galleryImageTypes.join(',')}
                      onChange={(event) => {
                        if (!item.id) setSelectedImages(Array.from(event.target.files ?? [], (file) => ({
                          id: crypto.randomUUID(), file,
                        })));
                      }} />
                    {!item.id && (
                      <span className="mt-1 block text-xs text-slate-600" aria-live="polite">
                        {uploadingImages
                          ? `อัปโหลดแล้ว ${selectedImages.filter((entry) => entry.image_url).length} จาก ${selectedImages.length} รูป`
                          : selectedImages.length
                            ? `เลือกแล้ว ${selectedImages.length} รูป ใช้ชื่อและหมวดหมู่เดียวกัน`
                            : 'เลือกหลายรูปได้ ชื่อผลงานซ้ำกันได้'}
                      </span>
                    )}
                  </label>
                  <label className="block">{item.id ? 'ลำดับการแสดง' : 'ลำดับการแสดงเริ่มต้น'}
                    <input className={field} type="number" min="0" max="2147483647" required
                      value={Number.isNaN(item.display_order) ? '' : item.display_order}
                      onChange={(event) => setItem({ ...item, display_order: event.target.valueAsNumber })} />
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={item.is_active}
                      onChange={(event) => setItem({ ...item, is_active: event.target.checked })} />
                    แสดงบนหน้าแกลเลอรี
                  </label>
                  <div className="flex gap-2 sm:col-span-2">
                    <button className={adminPrimary} type="submit" disabled={pending}>
                      {uploadingImages ? 'กำลังอัปโหลดและบันทึก…' : 'บันทึกผลงาน'}
                    </button>
                    {item.id && <button className={adminSecondary} type="button" onClick={() => editItem()}>ยกเลิก</button>}
                  </div>
                </fieldset>
              </form>
              <section className="rounded-lg bg-white p-3 sm:p-4 shadow-sm">
                <h2 className="mb-3 text-base font-semibold">จัดการหมวดหมู่ผลงาน</h2>
                <form onSubmit={(event) => submit(event, saveCategory)}>
                  <fieldset disabled={pending} className="space-y-3">
                    <label className="block">ชื่อหมวดหมู่
                      <input className={field} required maxLength={100} value={category.name}
                        onChange={(event) => setCategory({ ...category, name: event.target.value })} />
                    </label>
                    <div className="flex gap-2">
                      <button className={adminPrimary} type="submit">{category.id ? 'บันทึกชื่อหมวดหมู่' : 'เพิ่มหมวดหมู่'}</button>
                      {category.id && <button className={adminSecondary} type="button"
                        onClick={() => setCategory({ name: '' })}>ยกเลิก</button>}
                    </div>
                  </fieldset>
                </form>
                <ul className="mt-4 divide-y divide-gray-100">
                  {categories.map((entry) => {
                    const count = categoryUsage.get(entry.id) ?? 0;
                    return (
                      <li key={entry.id} className="flex items-center justify-between gap-2 py-2">
                        <div className="min-w-0">
                          <p className="break-words font-medium">{entry.name}</p>
                          <p className="text-xs text-slate-500">{count ? `ใช้กับ ${count} ผลงาน` : 'ยังไม่ได้ใช้'}</p>
                        </div>
                        <div className="flex shrink-0 gap-1">
                          <button className="admin-icon-action text-slate-600" type="button" disabled={pending}
                            aria-label={`เปลี่ยนชื่อหมวดหมู่ ${entry.name}`} title="เปลี่ยนชื่อหมวดหมู่"
                            onClick={() => setCategory(entry)}><FiEdit2 aria-hidden /></button>
                          <button className="admin-icon-action text-red-700 disabled:opacity-35" type="button" disabled={pending || count > 0}
                            aria-label={`ลบหมวดหมู่ ${entry.name}`} title={count ? 'ยังมีผลงานใช้หมวดนี้' : 'ลบหมวดหมู่'}
                            onClick={() => removeCategory(entry)}><FiTrash2 aria-hidden /></button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            </div>
            <section className="rounded-lg bg-white p-3 sm:p-4 shadow-sm">
              <h2 className="text-base font-semibold">ผลงานทั้งหมด</h2>
              {items.length === 0 && <p className="mt-2 text-gray-600">ยังไม่มีผลงาน</p>}
              <ul className="mt-2 divide-y divide-gray-100">
                {items.map((entry) => (
                  <li key={entry.id} className="flex items-center justify-between gap-3 py-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <Image src={entry.image_url} alt="" width={64} height={48} unoptimized
                        className="h-12 w-16 shrink-0 rounded object-cover" />
                      <div className="min-w-0">
                        <p className="break-words font-medium">{entry.title || entry.alt || 'ผลงานไม่มีชื่อ'}</p>
                        <p className="text-sm text-gray-600">
                          {categories.find(({ id }) => id === entry.category_id)?.name ?? 'ไม่มีหมวดหมู่'}
                          {' · '}{entry.is_active ? 'แสดงบนเว็บ' : 'ซ่อนอยู่'}
                        </p>
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <button className="admin-icon-action text-slate-600" type="button" disabled={pending}
                        aria-label={`แก้ไขผลงาน ${entry.title || entry.alt || 'ไม่มีชื่อ'}`} title="แก้ไขผลงาน" onClick={() => {
                          editItem(entry);
                          itemForm.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}><FiEdit2 aria-hidden /></button>
                      <button className="admin-icon-action text-red-700" type="button" disabled={pending}
                        aria-label={`ลบผลงาน ${entry.title || entry.alt || 'ไม่มีชื่อ'}`} title="ลบผลงาน"
                        onClick={() => removeItem(entry)}><FiTrash2 aria-hidden /></button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
