import { icon } from "./icons.js";

/** The colours an art panel can use. Each maps to a CSS class `art-<colour>`. */
const ART_COLOURS = ["green", "coral", "ochre", "forest"] as const;
type ArtColour = (typeof ART_COLOURS)[number];

function isArtColour(c: string): c is ArtColour {
  return (ART_COLOURS as readonly string[]).includes(c);
}

const ART_BG =
  '<svg class="art-bg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
  '<circle cx="330" cy="40" r="120" fill="#fff" fill-opacity=".18"/>' +
  '<circle cx="40" cy="280" r="150" fill="#fff" fill-opacity=".14"/>' +
  '<circle cx="200" cy="150" r="200" fill="none" stroke="#fff" stroke-opacity=".22" stroke-width="1.5"/>' +
  '<circle cx="200" cy="150" r="140" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="1.5"/>' +
  "</svg>";

/** A coloured placeholder panel with a big icon. Swap for a real <img> when photos exist. */
export function art(colour: string, iconName: string, label = ""): string {
  if (!isArtColour(colour)) {
    throw new Error(`Unknown art colour "${colour}". Use one of: ${ART_COLOURS.join(", ")}.`);
  }
  const lab = label ? `<span class="frame-label">${label}</span>` : "";
  return `<div class="art art-${colour}">${ART_BG}<span class="art-icon">${icon(iconName)}</span></div>${lab}`;
}

/**
 * Expands shortcodes in a page body:
 *   {{icon:NAME}}               an inline icon
 *   {{art:COLOUR:ICON:Label}}   a placeholder art panel (label optional)
 */
export function expandShortcodes(body: string): string {
  return body
    .replace(/\{\{icon:(\w+)\}\}/g, (_m, name: string) => icon(name))
    .replace(/\{\{art:(\w+):(\w+):?([^}]*)\}\}/g, (_m, colour: string, name: string, label: string) =>
      art(colour, name, label),
    );
}
