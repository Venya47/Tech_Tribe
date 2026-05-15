// Thin abstraction to keep UI close to a future Spring Boot backend.
// For now, everything is handled in React state / context.

export const Api = {
  // Example placeholder for future integration
  async signUp(payload) {
    // This would POST to /api/auth/signup
    return Promise.resolve({ ok: true, data: payload });
  },

  async signIn(payload) {
    // This would POST to /api/auth/signin
    return Promise.resolve({ ok: true, data: payload });
  },

  async fetchDomain(domainSlug) {
    // This would GET /api/domains/{domainSlug}
    return Promise.resolve({ ok: true, data: { slug: domainSlug } });
  }
};

