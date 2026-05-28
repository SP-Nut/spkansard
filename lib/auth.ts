// Helper functions for admin authentication
export const AdminAuth = {
  // ตรวจสอบว่ามี token หรือไม่
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    
    return !!localStorage.getItem('adminToken');
  },

  // เก็บ token
  setToken(token: string): void {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem('adminToken', token);
  },

  // ลบ token
  clearToken(): void {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem('adminToken');
  },

  // ดึง token
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    
    return localStorage.getItem('adminToken');
  }
};
