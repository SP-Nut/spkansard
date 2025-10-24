// Helper functions for admin authentication
export const AdminAuth = {
  // ตรวจสอบว่ามี token หรือไม่
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    
    const localToken = localStorage.getItem('adminToken');
    const cookieToken = document.cookie
      .split(';')
      .find(row => row.trim().startsWith('adminToken='))
      ?.split('=')[1];
    
    return !!(localToken && cookieToken);
  },

  // เก็บ token
  setToken(token: string): void {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem('adminToken', token);
    document.cookie = `adminToken=${token}; path=/; max-age=${24 * 60 * 60}`; // 24 hours
  },

  // ลบ token
  clearToken(): void {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem('adminToken');
    document.cookie = 'adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
  },

  // ดึง token
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    
    return localStorage.getItem('adminToken');
  }
};