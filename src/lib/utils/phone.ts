export function normalizePhone(input: string): string {
  return input.replace(/\D/g, "");
}

export function isValidPhone(input: string): boolean {
  return /^\d{10,15}$/.test(normalizePhone(input));
}

export function formatPhone(phone: string): string {
  return `+${normalizePhone(phone)}`;
}
