import { supabase } from '../lib/supabase';
import { validateEmail, validatePassword } from '../utils/validation';

const logAuthError = (context, error) => {
  console.error(`Auth Error (${context}):`, {
    message: error.message,
    name: error.name,
    status: error?.status,
    code: error?.code,
    details: error?.details,
    hint: error?.hint
  });
};

export const authService = {
  signUp: async (email, password) => {
    console.log('Starting signup process...');
    
    // Validate inputs first
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    
    if (emailError) throw new Error(emailError);
    if (passwordError) throw new Error(passwordError);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: {
            email_confirmed: true // Since email confirmation is disabled
          }
        }
      });

      if (error) {
        logAuthError('SignUp Error', error);
        throw new Error(error.message || 'Unable to create account. Please try again later.');
      }

      console.log('Signup successful');
      return data;
    } catch (error) {
      logAuthError('SignUp Exception', error);
      throw new Error(error.message || 'Unable to create account. Please try again later.');
    }
  },

  signIn: async (email, password) => {
    console.log('Starting signin process...');
    
    // Validate inputs
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    
    if (emailError) throw new Error(emailError);
    if (passwordError) throw new Error(passwordError);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        logAuthError('SignIn Error', error);
        throw new Error('Invalid email or password');
      }

      console.log('Signin successful');
      return data;
    } catch (error) {
      logAuthError('SignIn Exception', error);
      throw new Error('Unable to sign in. Please try again.');
    }
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      logAuthError('SignOut Exception', error);
      throw new Error('Unable to sign out. Please try again.');
    }
  }
};