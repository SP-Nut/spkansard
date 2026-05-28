export interface AdminTokenPayload {
  admin: true;
  role: 'admin';
  iat: number;
  exp: number;
}

const encoder = new TextEncoder();

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('JWT_SECRET must be set and at least 32 characters long.');
  }
  return secret;
}

function base64UrlEncode(input: string | Uint8Array): string {
  const bytes = typeof input === 'string' ? encoder.encode(input) : input;
  let binary = '';

  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlDecode(input: string): string {
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(input.length / 4) * 4, '=');
  return atob(base64);
}

async function sign(data: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  return base64UrlEncode(new Uint8Array(signature));
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;

  let result = 0;
  for (let i = 0; i < a.length; i += 1) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export async function createAdminToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload: AdminTokenPayload = {
    admin: true,
    role: 'admin',
    iat: now,
    exp: now + 24 * 60 * 60,
  };

  const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = base64UrlEncode(JSON.stringify(payload));
  const unsignedToken = `${header}.${body}`;
  const signature = await sign(unsignedToken, getJwtSecret());

  return `${unsignedToken}.${signature}`;
}

export async function verifyAdminToken(token: string | undefined | null): Promise<AdminTokenPayload | null> {
  if (!token) return null;

  try {
    const [header, body, signature] = token.split('.');
    if (!header || !body || !signature) return null;

    const expectedSignature = await sign(`${header}.${body}`, getJwtSecret());
    if (!safeEqual(signature, expectedSignature)) return null;

    const payload = JSON.parse(base64UrlDecode(body)) as Partial<AdminTokenPayload>;
    if (!payload.admin || payload.role !== 'admin' || typeof payload.exp !== 'number') return null;
    if (payload.exp <= Math.floor(Date.now() / 1000)) return null;

    return payload as AdminTokenPayload;
  } catch {
    return null;
  }
}

export function getBearerToken(authorization: string | null): string | null {
  if (!authorization?.startsWith('Bearer ')) return null;
  return authorization.slice('Bearer '.length);
}
