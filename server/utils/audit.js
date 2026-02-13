export const auditLog = (event, meta = {}) => {
  // In real bank: write to SIEM or immutable store
  console.log(`[AUDIT] ${new Date().toISOString()} ${event}`, meta);
};
