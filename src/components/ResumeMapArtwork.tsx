/* Hand-drawn pixel geometry; interaction lives in native overlay buttons. */
function ResumeMapArtwork() {
  return (
    <svg className="resume-map__art" viewBox="0 0 900 600" aria-hidden="true" focusable="false" shapeRendering="crispEdges">
      <defs>
        <pattern id="map-terrain" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M8 12h8v4H8zm24 22h4v8h-4" fill="currentColor" opacity=".08" /></pattern>
        <pattern id="map-sleepers" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M0 4h8v20H0" fill="var(--color-text-muted)" opacity=".5" /></pattern>
        <g id="map-tree"><path d="M16 32h8v24h-8" fill="var(--color-text-muted)" /><path d="M8 8h24v8h8v24H0V16h8" fill="var(--color-accent)" opacity=".4" /><path d="M8 16h8v16H8" fill="var(--color-accent)" opacity=".5" /></g>
      </defs>
      <path fill="var(--color-surface)" d="M0 0h900v600H0z" />
      <path fill="url(#map-terrain)" d="M0 0h900v600H0z" />
      <path d="M0 488h96v-24h80v24h64v32h-64v32H96v24H0zM760 460h140v140H712v-48h48z" fill="var(--color-accent)" opacity=".13" />
      <path d="M0 512h144m616 16h140M16 552h64m704 24h72" stroke="var(--color-accent)" strokeWidth="8" opacity=".3" />
      <path d="M180 220v100h496V220M450 320v144" fill="none" stroke="var(--color-border)" strokeWidth="40" />
      <path d="M180 220v100h496V220M450 320v144" fill="none" stroke="var(--color-text-muted)" strokeWidth="4" strokeDasharray="8 16" opacity=".45" />
      <path fill="url(#map-sleepers)" d="M0 190h296v28H0z" /><path d="M0 194h296M0 214h296" stroke="var(--color-text-muted)" strokeWidth="4" />
      {/* Train station, platform and tiny locomotive. */}
      <g transform="translate(108 92)">
        <path d="M-12 80h168v20H-12z" fill="var(--color-border)" />
        <path d="M0 24h144v56H0z" fill="var(--color-text-muted)" /><path d="M-8 16h16V8h128v8h16v16H-8z" fill="var(--color-accent)" opacity=".75" />
        <path d="M16 40h24v24H16zm88 0h24v24h-24zM56 40h32v40H56z" fill="var(--color-surface)" />
        <path d="M-72 104h56v24h-56zm8-16h32v16h-32z" fill="var(--color-accent)" /><path d="M-64 128h12v8h-12zm32 0h12v8h-12z" fill="var(--color-text)" />
      </g>
      {/* Data center: server windows and antenna. */}
      <g transform="translate(604 80)">
        <path d="M0 40h144v80H0zM16 24h112v16H16z" fill="var(--color-text-muted)" /><path d="M-8 120h160v16H-8z" fill="var(--color-border)" />
        <path d="M24 56h32v48H24zm64 0h32v48H88z" fill="var(--color-surface)" /><path d="M32 64h16v8H32zm0 16h16v8H32zm64-16h16v8H96zm0 16h16v8H96z" fill="var(--color-accent)" />
        <path d="M72 0v24M56 8h32M64 0h16" stroke="var(--color-accent)" strokeWidth="4" />
      </g>
      {/* Workshop: open garage, tools and crates. */}
      <g transform="translate(378 380)">
        <path d="M0 24h144v88H0z" fill="var(--color-text-muted)" /><path d="M-8 16h16V8h128v8h16v16H-8z" fill="var(--color-accent)" opacity=".65" />
        <path d="M24 48h96v64H24z" fill="var(--color-surface)" /><path d="M32 56h80v8H32zm0 16h80v4H32z" fill="var(--color-border)" />
        <path d="M56 88h40v8H56zm8 8h8v16h-8zm24 0h8v16h-8zM152 80h24v32h-24z" fill="var(--color-accent)" opacity=".7" />
        <path d="M-8 112h192v16H-8z" fill="var(--color-border)" />
      </g>
      {[ [48,48],[340,72],[800,80],[72,340],[772,324],[280,488],[600,504] ].map(([x,y]) => <use key={`${x}-${y}`} href="#map-tree" x={x} y={y} />)}
      <path d="M336 224h24v16h-24zm216-176h32v16h-32zM832 408h24v16h-24zM304 384h16v16h-16z" fill="var(--color-text-muted)" opacity=".35" />
    </svg>
  )
}

export default ResumeMapArtwork
