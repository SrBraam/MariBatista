import { supabase } from '../lib/supabase';
import { RateLimiter } from '../utils/security';

// Create rate limiter instance
const loginRateLimiter = new RateLimiter(5, 300000); // 5 attempts per 5 minutes

export async function handleLogin(email: string, password: string) {
  try {
    // Check rate limiting
    if (loginRateLimiter.isRateLimited(email)) {
      throw new Error('Too many login attempts. Please try again later.');
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    // Reset rate limiter on successful login
    loginRateLimiter.reset(email);
    return data;

  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function checkAuthStatus() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
  } catch (error) {
    console.error('Auth status check error:', error);
    return false;
  }
}

export async function handleLogout() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
}

// Session refresh handler
export async function refreshSession() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;

    const { data, error } = await supabase.auth.refreshSession();
    if (error) throw error;

    return data.session;
  } catch (error) {
    console.error('Session refresh error:', error);
    return null;
  }
}

// Role-based access control
export function checkPermission(requiredRole: string) {
  return async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return false;

    const userRole = session.user?.user_metadata?.role;
    return userRole === requiredRole;
  };
}
