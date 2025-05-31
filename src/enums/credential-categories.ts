export const credentialCategories = {
  government: 'government',
  events: 'events',
  milestone: 'milestone',
} as const;

export type CredentialCategories =
  (typeof credentialCategories)[keyof typeof credentialCategories];
