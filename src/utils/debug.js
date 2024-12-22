import { supabase } from '../lib/supabase';

// Enhanced debug logging utility
export const debugLog = (context, message, data = null) => {
  const timestamp = new Date().toISOString();
  console.group(`[${timestamp}] [${context}]`);
  console.log(message);
  if (data) {
    console.log('Data:', JSON.stringify(data, null, 2));
  }
  console.trace('Stack trace:'); // Add stack trace
  console.groupEnd();
};

// Enhanced auth debugging
export const debugAuth = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const { data: { user } } = await supabase.auth.getUser();
    
    debugLog('Auth Debug', 'Current auth state', {
      sessionExists: !!session,
      sessionExpiry: session?.expires_at,
      userExists: !!user,
      userId: user?.id,
      userEmail: user?.email,
      userRole: user?.role,
      userAauthProvider: user?.app_metadata?.provider,
      url: window.location.href,
      timestamp: new Date().toISOString()
    });

    // Check environment variables
    debugLog('Environment', 'Supabase Configuration', {
      supabaseUrlSet: !!process.env.REACT_APP_SUPABASE_URL,
      supabaseKeySet: !!process.env.REACT_APP_SUPABASE_ANON_KEY,
      nodeEnv: process.env.NODE_ENV
    });

  } catch (error) {
    debugLog('Auth Debug Error', 'Error checking auth state', {
      error: error.message,
      stack: error.stack
    });
  }
};

// Network request debugging
export const debugRequest = async (url, options = {}) => {
  debugLog('Network Request', `Making request to ${url}`, {
    method: options.method || 'GET',
    headers: options.headers,
    body: options.body
  });
};

// Error debugging
export const debugError = (error, context = 'General') => {
  debugLog('Error', `Error in ${context}`, {
    message: error.message,
    stack: error.stack,
    code: error.code,
    details: error.details
  });
};