// Security utility functions

// Sanitize user input to prevent XSS
export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

// Validate phone number format
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\(\d{2}\) \d \d{4}-\d{4}$/;
  return phoneRegex.test(phone);
}

// Rate limiting helper
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private maxAttempts: number;
  private timeWindow: number;

  constructor(maxAttempts = 5, timeWindow = 60000) {
    this.maxAttempts = maxAttempts;
    this.timeWindow = timeWindow;
  }

  isRateLimited(key: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];
    
    // Remove old attempts
    const recentAttempts = attempts.filter(timestamp => now - timestamp < this.timeWindow);
    
    if (recentAttempts.length >= this.maxAttempts) {
      return true;
    }
    
    recentAttempts.push(now);
    this.attempts.set(key, recentAttempts);
    return false;
  }

  reset(key: string): void {
    this.attempts.delete(key);
  }
}

// Password strength checker
export function checkPasswordStrength(password: string): {
  isStrong: boolean;
  message: string;
} {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const isStrong = 
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChar;

  if (!isStrong) {
    let message = 'A senha deve conter:';
    if (password.length < minLength) message += '\n- Mínimo de 8 caracteres';
    if (!hasUpperCase) message += '\n- Letra maiúscula';
    if (!hasLowerCase) message += '\n- Letra minúscula';
    if (!hasNumbers) message += '\n- Número';
    if (!hasSpecialChar) message += '\n- Caractere especial';
    return { isStrong, message };
  }

  return { isStrong, message: 'Senha forte' };
}

// Session token encryption
export function encryptToken(token: string): string {
  // Simple XOR encryption for demo - use a proper encryption library in production
  const key = 'your-secret-key';
  return token
    .split('')
    .map((char, i) => String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i % key.length)))
    .join('');
}

// CSRF token generator
export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}
