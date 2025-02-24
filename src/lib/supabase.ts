import { createClient } from '@supabase/supabase-js';

// Validate environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client with enhanced configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'x-application-name': 'mari-batista',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
    },
  },
  realtime: {
    params: {
      eventsPerSecond: 2,
    },
  },
  db: {
    schema: 'public',
  },
});

// Add error logging
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT') {
    console.log('User signed out');
  } else if (event === 'SIGNED_IN') {
    console.log('User signed in');
  } else if (event === 'TOKEN_REFRESHED') {
    console.log('Token refreshed');
  }
});

// Add custom error handler
const handleError = (error: any) => {
  console.error('Supabase operation failed:', error.message);
  // You can add additional error handling here
  return Promise.reject(error);
};

// Add global error handling for all Supabase operations
const originalFrom = supabase.from.bind(supabase);
supabase.from = (table: string) => {
  const query = originalFrom(table);
  
  // Store original methods
  const methods = {
    select: query.select.bind(query),
    insert: query.insert.bind(query),
    update: query.update.bind(query),
    delete: query.delete.bind(query),
    upsert: query.upsert.bind(query),
  };

  // Wrap each method with error handling
  return {
    ...query,
    select: (...args: any[]) => {
      try {
        return methods.select(...args);
      } catch (error) {
        return handleError(error);
      }
    },
    insert: (...args: any[]) => {
      try {
        return methods.insert(...args);
      } catch (error) {
        return handleError(error);
      }
    },
    update: (...args: any[]) => {
      try {
        return methods.update(...args);
      } catch (error) {
        return handleError(error);
      }
    },
    delete: (...args: any[]) => {
      try {
        return methods.delete(...args);
      } catch (error) {
        return handleError(error);
      }
    },
    upsert: (...args: any[]) => {
      try {
        return methods.upsert(...args);
      } catch (error) {
        return handleError(error);
      }
    },
  };
};