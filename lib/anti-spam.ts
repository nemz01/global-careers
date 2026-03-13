/**
 * Anti-Spam Utilities for Public Forms
 * Honeypot, Turnstile CAPTCHA, and disposable email detection
 */

// Known disposable email domains (subset — expand as needed)
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'mailinator.com', 'guerrillamail.com', 'tempmail.com', 'throwaway.email',
  'yopmail.com', 'sharklasers.com', 'guerrillamailblock.com', 'grr.la',
  'guerrillamail.info', 'guerrillamail.net', 'trash-mail.com', 'dispostable.com',
  'maildrop.cc', 'temp-mail.org', '10minutemail.com', 'mailnesia.com',
]);

export function isHoneypotFilled(value: unknown): boolean {
  if (!value) return false;
  if (typeof value === 'string' && value.trim() === '') return false;
  return true;
}

export function getHoneypotValue(body: Record<string, unknown>): unknown {
  return body.website ?? body.company_url ?? null;
}

// Cloudflare Turnstile verification
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

interface TurnstileResult {
  success: boolean;
  error?: string;
}

export async function verifyTurnstile(
  token: string | null | undefined,
  ip?: string
): Promise<TurnstileResult> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) return { success: true };

  if (!token) {
    return { success: false, error: 'Security verification required.' };
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token);
    if (ip) formData.append('remoteip', ip);

    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString(),
    });

    const result = await response.json();

    if (!result.success) {
      return { success: false, error: 'Security verification failed. Please try again.' };
    }

    return { success: true };
  } catch {
    return { success: true }; // Allow through on network error
  }
}

export function isDisposableEmail(email: string): boolean {
  if (!email) return false;
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return false;
  return DISPOSABLE_EMAIL_DOMAINS.has(domain);
}

interface AntiSpamResult {
  blocked: boolean;
  reason?: string;
  status?: number;
}

export async function checkAntiSpam(
  body: Record<string, unknown>,
  options: {
    ip?: string;
    checkEmail?: string;
    turnstileToken?: string | null;
  } = {}
): Promise<AntiSpamResult> {
  const honeypotValue = getHoneypotValue(body);
  if (isHoneypotFilled(honeypotValue)) {
    return { blocked: true, reason: 'honeypot', status: 200 };
  }

  const turnstile = await verifyTurnstile(options.turnstileToken, options.ip);
  if (!turnstile.success) {
    return { blocked: true, reason: turnstile.error, status: 400 };
  }

  if (options.checkEmail && isDisposableEmail(options.checkEmail)) {
    return {
      blocked: true,
      reason: 'Please use a permanent email address.',
      status: 400,
    };
  }

  return { blocked: false };
}
