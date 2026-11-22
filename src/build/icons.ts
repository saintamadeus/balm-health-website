/** SVG paths for every icon used with {{icon:NAME}} or {{art:COLOUR:NAME}}. */
export const ICON_PATHS = {
  heart: '<path d="M20.8 8.6c0-2.6-2.1-4.6-4.6-4.6-1.6 0-3.1.9-3.9 2.2-.8-1.3-2.3-2.2-3.9-2.2-2.6 0-4.6 2.1-4.6 4.6 0 5.4 8.5 10.4 8.5 10.4s8.5-5 8.5-10.4Z"/>',
  pulse: '<path d="M20.8 8.6c0-2.6-2.1-4.6-4.6-4.6-1.6 0-3.1.9-3.9 2.2-.8-1.3-2.3-2.2-3.9-2.2-2.6 0-4.6 2.1-4.6 4.6 0 5.4 8.5 10.4 8.5 10.4s8.5-5 8.5-10.4Z"/><path d="M2.5 12h3l2-3 3 6 2-3h9"/>',
  cross: '<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6Z"/>',
  brain: '<path d="M9.5 3a3.5 3.5 0 0 0-3.5 3.5 3 3 0 0 0-2 5.2 3.5 3.5 0 0 0 2.4 6 3.5 3.5 0 0 0 3.1 2.3V3Z"/><path d="M14.5 3a3.5 3.5 0 0 1 3.5 3.5 3 3 0 0 1 2 5.2 3.5 3.5 0 0 1-2.4 6 3.5 3.5 0 0 1-3.1 2.3V3Z"/>',
  people: '<circle cx="8.5" cy="8" r="3"/><path d="M2.5 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.5"/><path d="M14.7 13a5 5 0 0 1 6.8 4.6"/>',
  sprout: '<path d="M12 21V10"/><path d="M12 10C12 6 8 5 4 5c0 4 1 8 8 8Z"/><path d="M12 10c0-4 4-5 8-5 0 4-1 8-8 8Z"/>',
  chart: '<path d="M3 3v18h18"/><path d="M7 16v-4"/><path d="M12 16V8"/><path d="M17 16v-7"/>',
  handshake: '<path d="M2.5 12.5 6 9l4 3.5 4-4 3.5 3-2.8 3a2 2 0 0 1-2.8 0l-.4-.4"/><path d="m9.8 12.7 2.7 2.7a2 2 0 0 0 2.8 0l.2-.2"/><path d="m14 8.5 3-3 4 4-3 3"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18Z"/>',
  shield: '<path d="M12 3 4.5 5.7v5.6c0 5 3.2 8.4 7.5 9.7 4.3-1.3 7.5-4.7 7.5-9.7V5.7Z"/><path d="m8.7 12.2 2.4 2.4 4.4-4.9"/>',
  lock: '<rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/>',
  check: '<circle cx="12" cy="12" r="9.3"/><path d="m8 12.3 2.6 2.6 5.4-6"/>',
  arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
  pin: '<path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.3"/>',
  phone: '<path d="M4 4.5c0 8.6 6.9 15.5 15.5 15.5.6 0 1-.4 1-1v-3.2c0-.5-.4-1-1-1l-3.3-.4c-.4 0-.8.1-1 .4l-1.3 1.3a12 12 0 0 1-5.5-5.5l1.3-1.3c.3-.3.4-.7.4-1L9.7 5c0-.6-.4-1-1-1H5.5c-.8 0-1.5.7-1.5 1.5Z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6 8.5 7 8.5-7"/>',
  basket: '<path d="M3 9h18l-1.6 10.2a2 2 0 0 1-2 1.8H6.6a2 2 0 0 1-2-1.8Z"/><path d="m8 9 2.6-5"/><path d="m16 9-2.6-5"/><path d="M9.5 13.5v3.5"/><path d="M14.5 13.5v3.5"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4"/><path d="M16 3v4"/><path d="M3 11h18"/><path d="m9.5 16 1.8 1.8 3.4-3.6"/>',
  file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5"/><path d="M9 13h6"/><path d="M9 17h4"/>',
  scales: '<path d="M12 3v18"/><path d="M7 7h10"/><path d="m5 11 2.5-4L10 11a2.5 2.5 0 0 1-5 0Z"/><path d="m14 11 2.5-4L19 11a2.5 2.5 0 0 1-5 0Z"/><path d="M8 21h8"/>',
  bed: '<path d="M3 18V6"/><path d="M3 14h18v4"/><path d="M21 14v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="11" r="2"/>',
  handheart: '<path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16"/><path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.8-2.9l-4.2 3.9"/><path d="m2 15 6 6"/><path d="M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.7 2.7 0 0 0 16 4a2.8 2.8 0 0 0-4.9 1.8c0 1.2.8 2 1.5 2.7L16 11Z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  steth: '<path d="M5 3v5a5 5 0 0 0 10 0V3"/><path d="M10 13v2a5 5 0 0 0 10 0v-2"/><circle cx="20" cy="11" r="2"/>',
  refresh: '<path d="M3 12a9 9 0 0 1 15.5-6.3L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15.5 6.3L3 16"/><path d="M3 21v-5h5"/>',
  book: '<path d="M4 19.5V5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2"/><path d="M8 7h8"/><path d="M8 11h6"/>',
  briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/>',
  copy: '<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
  bank: '<path d="M3 10 12 4l9 6"/><path d="M5 10v8"/><path d="M9.5 10v8"/><path d="M14.5 10v8"/><path d="M19 10v8"/><path d="M3 21h18"/>',
  news: '<path d="M4 4h13v15a2 2 0 0 0 2 2H6a2 2 0 0 1-2-2Z"/><path d="M17 8h3v11a2 2 0 0 1-2 2"/><path d="M8 8h5"/><path d="M8 12h5"/><path d="M8 16h3"/>',
  camera: '<path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13.5" r="3.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  zoom: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/><path d="M11 8.5v5"/><path d="M8.5 11h5"/>',
  star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z"/>',
  flag: '<path d="M5 21V4"/><path d="M5 4h11l-2 4 2 4H5"/>',
  send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  whatsapp: '<path d="M3.5 20.5 4.8 16A8.5 8.5 0 1 1 8 19.2Z"/><path d="M9 8.6c.2-.5.5-.6.8-.6h.5c.2 0 .4.1.5.4l.7 1.7c.1.2 0 .5-.1.6l-.5.6c.6 1.2 1.6 2.2 2.8 2.8l.6-.5c.2-.2.4-.2.6-.1l1.7.7c.3.1.4.3.4.5v.5c0 .3-.1.6-.6.8-.6.3-1.6.4-3-.2a8.6 8.6 0 0 1-4.3-4.3c-.6-1.4-.5-2.4-.2-3Z"/>',
  facebook: '<path d="M14 21v-8h3l.5-3.5H14V7.6c0-1 .3-1.7 1.8-1.7h1.8V2.8A24 24 0 0 0 15 2.6c-2.6 0-4.4 1.6-4.4 4.5v2.4H7.6V13h3v8"/>',
} as const;

export type IconName = keyof typeof ICON_PATHS;

export function isIconName(name: string): name is IconName {
  return Object.prototype.hasOwnProperty.call(ICON_PATHS, name);
}

/** An inline SVG icon. Throws on an unknown name so typos fail the build. */
export function icon(name: string, cls = "icon", extra = ""): string {
  if (!isIconName(name)) throw new Error(`Unknown icon "${name}". Add it to src/build/icons.ts.`);
  return `<svg class="${cls}${extra ? " " + extra : ""}" viewBox="0 0 24 24" aria-hidden="true">${ICON_PATHS[name]}</svg>`;
}
