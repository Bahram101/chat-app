import type { Credentials } from "@/features/auth/auth.types";

const CREDENTIALS_KEY = "green_api_credentials";

export const credentialsStorage = {
  setCredentials(credentials: Credentials) {
    localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(credentials));
  },

  getCredentials(): Credentials | null {
    try {
      const creds = localStorage.getItem(CREDENTIALS_KEY);
      return creds ? JSON.parse(creds) : null;
    } catch {
      return null;
    }
  },

  clearCredentials() {
    localStorage.removeItem(CREDENTIALS_KEY);
  },
};
