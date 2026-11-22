/**
 * Small drawn scenes for the programs, used with {{scene:NAME:Label}}.
 * They stand in for photos until real (consented) photos exist. No people are drawn,
 * so nothing pretends to show a real person or event.
 * Each is an inline SVG (a few KB, no download), drawn on a 400 × 300 canvas.
 */

const scenes = {
  /** Reach the Sick: a hospital window, a bed, flowers on the bedside table. */
  hospital: {
    label: "Drawing of a hospital bed by a sunny window, with flowers on the bedside table",
    svg: `<defs>
<linearGradient id="hs-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FBE4DF"/><stop offset="1" stop-color="#F4B7AE"/></linearGradient>
<linearGradient id="hs-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF6E6"/><stop offset="1" stop-color="#FBE4DF"/></linearGradient>
</defs>
<rect width="400" height="300" fill="url(#hs-wall)"/>
<rect y="214" width="400" height="86" fill="#E9978E"/>
<rect y="214" width="400" height="6" fill="#DD8379"/>
<g transform="translate(46 34)">
  <rect width="150" height="120" rx="10" fill="url(#hs-sky)"/>
  <circle cx="110" cy="38" r="20" fill="#E3A13C"/><circle cx="110" cy="38" r="30" fill="#E3A13C" opacity=".18"/>
  <path d="M0 96c26-18 52-20 76-8s48 10 74-6v38H0Z" fill="#A9D38D"/>
  <path d="M0 108c30-10 60-8 90 0s44 6 60 0v12H0Z" fill="#7DB96A"/>
  <rect width="150" height="120" rx="10" fill="none" stroke="#fff" stroke-width="8"/>
  <path d="M75 0v120M0 60h150" stroke="#fff" stroke-width="6"/>
</g>
<g transform="translate(214 132)">
  <rect x="0" y="34" width="164" height="44" rx="12" fill="#fff"/>
  <path d="M8 34h148a8 8 0 0 1 8 8v6H0v-6a8 8 0 0 1 8-8Z" fill="#FBF8F2"/>
  <rect x="6" y="10" width="54" height="30" rx="12" fill="#FBF8F2" stroke="#F1D7D1" stroke-width="2"/>
  <path d="M70 40h94v38H58Z" fill="#E7F1E0"/><path d="M70 40h94v8H66Z" fill="#D5E8CB"/>
  <rect x="-6" y="78" width="176" height="14" rx="5" fill="#C23B3A"/>
  <rect x="-2" y="0" width="10" height="110" rx="4" fill="#A8302F"/>
  <rect x="156" y="40" width="10" height="70" rx="4" fill="#A8302F"/>
</g>
<g transform="translate(120 172)">
  <rect x="0" y="22" width="62" height="64" rx="6" fill="#0F2E22"/>
  <rect x="6" y="40" width="50" height="4" rx="2" fill="#24503D"/>
  <path d="M22 22c-2-16 2-24 10-26 6 2 10 10 8 26Z" fill="#FBF8F2" opacity=".9"/>
  <path d="M31 2c-6-16-18-24-30-20 10 6 20 12 30 20Zm0 0c4-18 18-26 30-22-10 6-22 12-30 22Z" fill="#4C9A5E"/>
  <path d="M31 2V-26" stroke="#2C7A4C" stroke-width="3"/>
  <circle cx="31" cy="-30" r="10" fill="#F05657"/><circle cx="16" cy="-20" r="8" fill="#E3A13C"/><circle cx="46" cy="-20" r="8" fill="#fff"/>
  <circle cx="31" cy="-30" r="3.5" fill="#FBE4DF"/>
</g>
<path d="M330 58c0-8 6-14 14-14 5 0 9 3 11 7 2-4 6-7 11-7 8 0 14 6 14 14 0 16-25 30-25 30s-25-14-25-30Z" fill="#C23B3A" opacity=".85"/>`,
  },

  /** OPTRTE: five stepping stones along a path, ending at a home. */
  journey: {
    label: "Drawing of a winding path with five stepping stones leading over green hills to a small home",
    svg: `<defs>
<linearGradient id="js-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F2F8EE"/><stop offset="1" stop-color="#DCEDD1"/></linearGradient>
</defs>
<rect width="400" height="300" fill="url(#js-sky)"/>
<circle cx="330" cy="62" r="26" fill="#E3A13C"/><circle cx="330" cy="62" r="40" fill="#E3A13C" opacity=".15"/>
<path d="M0 150c60-30 120-34 190-14s140 18 210-10v174H0Z" fill="#B9DCA3"/>
<path d="M0 196c70-26 150-28 220-8s120 14 180-6v118H0Z" fill="#8EC967"/>
<path d="M0 240c80-20 170-20 250-4s110 10 150 0v64H0Z" fill="#6FAE58"/>
<path d="M40 300C70 250 150 246 190 222s70-54 120-74" fill="none" stroke="#FBF8F2" stroke-width="30" stroke-linecap="round"/>
<path d="M40 300C70 250 150 246 190 222s70-54 120-74" fill="none" stroke="#F3ECE0" stroke-width="22" stroke-linecap="round" stroke-dasharray="2 14"/>
<g stroke="#fff" stroke-width="3">
  <ellipse cx="66" cy="270" rx="17" ry="9" fill="#C23B3A"/>
  <ellipse cx="128" cy="246" rx="15" ry="8" fill="#E3A13C"/>
  <ellipse cx="186" cy="224" rx="13" ry="7" fill="#4C9A5E"/>
  <ellipse cx="236" cy="192" rx="11" ry="6" fill="#2C7A4C"/>
  <ellipse cx="278" cy="164" rx="10" ry="5" fill="#0F2E22"/>
</g>
<g transform="translate(300 104)">
  <rect x="0" y="22" width="58" height="42" fill="#FBF8F2"/>
  <path d="M-8 26 29 -6l37 32Z" fill="#C23B3A"/>
  <rect x="22" y="38" width="14" height="26" rx="2" fill="#0F2E22"/>
  <rect x="6" y="32" width="11" height="11" fill="#A9D38D"/>
  <rect x="42" y="32" width="11" height="11" fill="#A9D38D"/>
</g>
<g fill="#4C9A5E"><circle cx="372" cy="150" r="14"/><circle cx="384" cy="140" r="10"/><rect x="370" y="150" width="4" height="18" fill="#24503D"/></g>`,
  },

  /** The Balm Basket: a woven basket of food and essentials. */
  basket: {
    label: "Drawing of a woven basket filled with bread, fruit, vegetables and cooking oil",
    svg: `<defs>
<linearGradient id="bs-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FCF5E8"/><stop offset="1" stop-color="#F2D29A"/></linearGradient>
<clipPath id="bs-weave"><path d="M96 168h208l-20 96a14 14 0 0 1-14 11H130a14 14 0 0 1-14-11Z"/></clipPath>
</defs>
<rect width="400" height="300" fill="url(#bs-bg)"/>
<rect y="248" width="400" height="52" fill="#E3A13C" opacity=".55"/>
<ellipse cx="200" cy="278" rx="130" ry="12" fill="#A86A10" opacity=".25"/>
<rect x="232" y="74" width="34" height="100" rx="10" fill="#E3A13C"/><rect x="240" y="56" width="18" height="24" rx="4" fill="#C23B3A"/>
<rect x="236" y="110" width="26" height="30" rx="4" fill="#FCF5E8"/><circle cx="249" cy="125" r="7" fill="#4C9A5E"/>
<path d="M116 150c4-30 34-48 66-40 22 6 30 24 26 46Z" fill="#D9A15A"/>
<path d="M132 128c8-6 18-8 28-6M126 140c10-6 24-8 38-4" stroke="#B57B32" stroke-width="3" fill="none" stroke-linecap="round"/>
<circle cx="292" cy="148" r="22" fill="#F28C28"/><circle cx="292" cy="128" r="3" fill="#4C9A5E"/>
<circle cx="214" cy="150" r="18" fill="#C23B3A"/><path d="M214 132c4-8 12-10 16-8-4 4-10 6-16 8Z" fill="#4C9A5E"/>
<path d="M170 150c-6-26 8-44 24-50-2 18 0 34-8 50Z" fill="#4C9A5E"/><path d="M168 152c14-22 34-28 48-26-12 10-26 20-38 30Z" fill="#6FAE58"/>
<path d="M96 168h208l-20 96a14 14 0 0 1-14 11H130a14 14 0 0 1-14-11Z" fill="#C98A2E"/>
<g clip-path="url(#bs-weave)" stroke="#A86A10" stroke-width="3" opacity=".7">
  <path d="M90 190h230M90 212h230M90 234h230M90 256h230"/>
  <path d="M120 168v110M150 168v110M180 168v110M210 168v110M240 168v110M270 168v110M300 168v110" stroke-dasharray="11 11"/>
</g>
<rect x="88" y="160" width="224" height="16" rx="8" fill="#A86A10"/>
<path d="M118 162c10-56 154-56 164 0" fill="none" stroke="#A86A10" stroke-width="8" stroke-linecap="round"/>
<g transform="translate(286 196) rotate(12)"><rect width="44" height="34" rx="6" fill="#fff"/><path d="M14 13c0-4 3-6 6-6 2 0 3 1 4 3 1-2 2-3 4-3 3 0 6 2 6 6 0 7-10 12-10 12s-10-5-10-12Z" fill="#C23B3A"/></g>`,
  },

  /** The Balm Summit: a round table with seven chairs, one for each trustee. */
  summit: {
    label: "Drawing of a round meeting table seen from above, with seven chairs and papers on the table",
    svg: `<defs>
<radialGradient id="ss-light" cx=".5" cy=".45" r=".6"><stop offset="0" stop-color="#2D6A4F"/><stop offset="1" stop-color="#0F2E22"/></radialGradient>
</defs>
<rect width="400" height="300" fill="url(#ss-light)"/>
<g opacity=".08" fill="#fff"><circle cx="40" cy="40" r="60"/><circle cx="370" cy="270" r="80"/></g>
<g transform="translate(200 150)">
  <g fill="#E3A13C">
    <circle cx="0" cy="-104" r="17"/><circle cx="81" cy="-65" r="17"/><circle cx="101" cy="23" r="17"/>
    <circle cx="45" cy="94" r="17"/><circle cx="-45" cy="94" r="17"/><circle cx="-101" cy="23" r="17"/><circle cx="-81" cy="-65" r="17"/>
  </g>
  <g fill="#C98A2E">
    <circle cx="0" cy="-104" r="9"/><circle cx="81" cy="-65" r="9"/><circle cx="101" cy="23" r="9"/>
    <circle cx="45" cy="94" r="9"/><circle cx="-45" cy="94" r="9"/><circle cx="-101" cy="23" r="9"/><circle cx="-81" cy="-65" r="9"/>
  </g>
  <circle r="78" fill="#FBF8F2"/><circle r="78" fill="none" stroke="#F3ECE0" stroke-width="8"/>
  <circle r="58" fill="none" stroke="#E6DFD2" stroke-width="1.5"/>
  <g fill="#fff" stroke="#E6DFD2" stroke-width="1.5">
    <rect x="-8" y="-66" width="16" height="20" rx="2"/><rect x="38" y="-40" width="16" height="20" rx="2" transform="rotate(50 46 -30)"/>
    <rect x="46" y="12" width="16" height="20" rx="2" transform="rotate(100 54 22)"/><rect x="12" y="46" width="16" height="20" rx="2" transform="rotate(155 20 56)"/>
    <rect x="-28" y="46" width="16" height="20" rx="2" transform="rotate(205 -20 56)"/><rect x="-62" y="12" width="16" height="20" rx="2" transform="rotate(260 -54 22)"/>
    <rect x="-54" y="-40" width="16" height="20" rx="2" transform="rotate(310 -46 -30)"/>
  </g>
  <circle r="22" fill="#E7F1E0"/>
  <path d="M-9-2c0-6 4-9 9-9 3 0 5 2 6 4 1-2 3-4 6-4 5 0 9 3 9 9 0 10-15 18-15 18S-9 8-9-2Z" transform="translate(-6 0)" fill="#C23B3A"/>
</g>`,
  },
} as const;

export type SceneName = keyof typeof scenes;

export function isSceneName(name: string): name is SceneName {
  return Object.prototype.hasOwnProperty.call(scenes, name);
}

/** A drawn scene filling its frame, with an optional small label in the corner. */
export function scene(name: string, label = ""): string {
  if (!isSceneName(name)) {
    throw new Error(`Unknown scene "${name}". Use one of: ${Object.keys(scenes).join(", ")}.`);
  }
  const { label: alt, svg } = scenes[name];
  const lab = label ? `<span class="frame-label">${label}</span>` : "";
  return (
    `<div class="scene scene-${name}"><svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${alt}">` +
    `${svg}</svg></div>${lab}`
  );
}
