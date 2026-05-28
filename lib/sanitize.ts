const dangerousTags = /<\/?(script|style|iframe|object|embed|form|input|button|textarea|select|meta|link|base)[^>]*>/gi;
const eventAttributes = /\s+on[a-z]+\s*=\s*(".*?"|'.*?'|[^\s>]+)/gi;
const dangerousUrls = /\s+(href|src)\s*=\s*(['"])\s*(javascript:|data:text\/html|vbscript:).*?\2/gi;

export function sanitizeHtml(html: string): string {
  return html
    .replace(dangerousTags, '')
    .replace(eventAttributes, '')
    .replace(dangerousUrls, '');
}

export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
