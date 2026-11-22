/**
 * Site-wide settings. Change these in ONE place and run `npm run build`.
 */

/**
 * The domain we plan to use. Only used for local builds.
 * On Netlify the real address is picked up automatically (see SITE below),
 * so the free *.netlify.app address works before the domain is bought.
 */
export const PLANNED_DOMAIN = "https://www.thebalmhealthinitiative.org";

/**
 * The live web address, with no slash at the end. Order of preference:
 * 1. SITE_URL — set this yourself in Netlify if you ever need to force an address
 * 2. URL      — set by Netlify on every build: the custom domain once added, else *.netlify.app
 * 3. PLANNED_DOMAIN
 */
export const SITE = (process.env.SITE_URL || process.env.URL || PLANNED_DOMAIN).replace(/\/+$/, "");

export const ORG = "The Balm Health Initiative and Social Intervention";
export const EMAIL = "thebalmhealthinitiative@gmail.com";
export const PHONE = "+234 907 852 4319";
export const PHONE_TEL = "+2349078524319";

/**
 * WhatsApp number in international form, digits only (no + or spaces).
 * Currently the same as the phone line. Change it here if WhatsApp uses another number.
 */
export const WHATSAPP = "2349078524319";

/** Facebook page address. Leave empty ("") to hide the Facebook link everywhere. */
export const FACEBOOK = "https://www.facebook.com/profile.php?id=61584213399979";

/** The person who receives safeguarding reports. */
export const SAFEGUARDING_LEAD = {
  name: "Comfort Oluremilekun Samuel",
  role: "Founder & Executive Director",
} as const;

/** A WhatsApp chat link, optionally with a message already typed in for the visitor. */
export function whatsappLink(message = ""): string {
  return `https://wa.me/${WHATSAPP}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

/** Main menu, in order. `key` matches the `nav:` line at the top of a page. */
export interface NavItem {
  key: string;
  href: string;
  label: string;
}

export const NAV: readonly NavItem[] = [
  { key: "help", href: "get-help.html", label: "Get Help" },
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
  "get-help.html": "0.9",
  "contact.html": "0.7",
};

/** Date the security contact in /.well-known/security.txt stops being valid. Renew yearly. */
export const SECURITY_TXT_EXPIRES = "2027-10-03T00:00:00.000Z";
