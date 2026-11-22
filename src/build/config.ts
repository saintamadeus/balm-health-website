/**
 * Site-wide settings. Change these in ONE place and run `npm run build`.
 */

/** The live web address. Change this once the domain is bought. No slash at the end. */
export const SITE = "https://www.thebalmhealthinitiative.org";

export const ORG = "The Balm Health Initiative and Social Intervention";
export const EMAIL = "thebalmhealthinitiative@gmail.com";
export const PHONE = "+234 907 852 4319";
export const PHONE_TEL = "+2349078524319";

/** Main menu, in order. `key` matches the `nav:` line at the top of a page. */
export interface NavItem {
  key: string;
  href: string;
  label: string;
}

export const NAV: readonly NavItem[] = [
  { key: "about", href: "about.html", label: "About" },
  { key: "programs", href: "programs.html", label: "Programs" },
  { key: "stories", href: "stories.html", label: "Stories" },
  { key: "transparency", href: "financial-transparency.html", label: "Transparency" },
  { key: "involved", href: "get-involved.html", label: "Get Involved" },
  { key: "contact", href: "contact.html", label: "Contact" },
];

/** How important each page is to search engines (sitemap.xml). Pages not listed get 0.4. */
export const SITEMAP_PRIORITY: Readonly<Record<string, string>> = {
  "index.html": "1.0",
  "donate.html": "0.9",
  "programs.html": "0.9",
  "about.html": "0.9",
  "get-involved.html": "0.8",
  "stories.html": "0.8",
  "leadership.html": "0.8",
  "financial-transparency.html": "0.8",
  "contact.html": "0.7",
};

/** Date the security contact in /.well-known/security.txt stops being valid. Renew yearly. */
export const SECURITY_TXT_EXPIRES = "2027-10-03T00:00:00.000Z";
