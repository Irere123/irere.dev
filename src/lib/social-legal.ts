/**
 * Legal operator details for the Irere Social deployment.
 *
 * The product name and the domain these pages are served from must both belong to us —
 * platform reviewers (TikTok in particular) reject apps whose website carries a
 * third-party brand. Keep this file free of upstream vendor names.
 */
export const socialLegalConfig = {
  /** Product these pages describe */
  productName: 'Irere Social',
  /** Brand shown in the page header */
  operatorShortName: 'Revoks',
  /** Legal entity: contracting party and data controller */
  operatorLegalName: 'Revoks, Inc.',
  /** Public site these pages are served from */
  publicWebsiteUrl: 'https://irere.dev',
  /** Terms, security, and general legal notices */
  legalContactEmail: 'legal@revoks.dev',
  /** Privacy and data-protection inquiries */
  privacyContactEmail: 'privacy@revoks.dev',
  /** Governing law */
  governingLawRegion: 'the State of Delaware, United States',
  /** Courts with exclusive jurisdiction (sentence subject; followed by "have exclusive jurisdiction …") */
  exclusiveJurisdictionCourts: 'The state and federal courts located in Delaware, United States',
  /** Shown at the top of each document */
  lastUpdated: 'September 19, 2026',
} as const

export type SocialLegalConfig = typeof socialLegalConfig
