'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ConditionalPreload() {
  const pathname = usePathname();

  useEffect(() => {
    // Only preload hero image on home page
    if (pathname === '/') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = '/herosection/กันสาดหรู โมเดิร์น.webp';
      link.as = 'image';
      link.type = 'image/webp';
      document.head.appendChild(link);

      return () => {
        // Clean up
        try {
          document.head.removeChild(link);
        } catch {
          // Link might already be removed
        }
      };
    }
  }, [pathname]);

  return null;
}