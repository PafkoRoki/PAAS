import type { ReactNode } from "react";

/*
 * Ribbon icons: every element is an isometric drawing inside a 1×1×1 cube.
 *
 * Geometry is written in cube units (0…1):
 *   x → to the right-front, y → to the left-front, z → up.
 * `box()`, `face()` and `line()` project it to the 32×32 icon, so all icons share
 * the same scale, projection and shading (top light, left mid, right dark).
 *
 * Keys of SHAPES / MATERIALS are the Polish category / sub-tag names from meta.json.
 * Unknown names get a generic icon, so new sub-tags work without code changes.
 */

// ==========================
// PROJECTION
// ==========================

type P3 = [number, number, number];

const SCALE = 14; // cube edge in px → the cube spans 2…30 px vertically
const COS30 = Math.cos(Math.PI / 6);

const project = ([x, y, z]: P3): [number, number] => [
  16 + (x - y) * COS30 * SCALE,
  2 + (x + y) * 0.5 * SCALE + (1 - z) * SCALE,
];

const toPoints = (points: P3[]) =>
  points.map((p) => project(p).map((n) => +n.toFixed(2)).join(",")).join(" ");

// ==========================
// COLOURS
// ==========================

const STROKE = "#3c3c3c";
const BLUE = "#b4cce6";
const CONCRETE = "#c5cad2";
const INSULATION = "#efd77c";
const WOOD = "#d9b27a";
const GLASS = "#a9c9ee";
const SCREED = "#e4dfd3";

/** Mixes a hex colour towards white (amount > 0) or black (amount < 0). */
function shade(hex: string, amount: number) {
  const n = parseInt(hex.slice(1), 16);
  const target = amount > 0 ? 255 : 0;
  const k = Math.abs(amount);
  const channel = (shift: number) => {
    const c = (n >> shift) & 255;
    return Math.round(c + (target - c) * k);
  };
  return `rgb(${channel(16)},${channel(8)},${channel(0)})`;
}

const faceColors = (color: string) => ({
  top: shade(color, 0.55),
  left: shade(color, 0.15),
  right: shade(color, -0.12),
});

// ==========================
// PRIMITIVES
// ==========================

const face = (points: P3[], fill: string, opacity = 1) => (
  <polygon points={toPoints(points)} fill={fill} fillOpacity={opacity} stroke={STROKE} strokeWidth="0.7" />
);

const line = (points: P3[], width = 0.7, color = STROKE, dash?: string) => (
  <polyline
    points={toPoints(points)}
    fill="none"
    stroke={color}
    strokeWidth={width}
    strokeDasharray={dash}
    strokeLinecap="round"
  />
);

/** Axis-aligned box; only the three faces turned to the viewer are drawn. */
function box([x0, y0, z0, x1, y1, z1]: number[], color = BLUE, opacity = 1) {
  const c = faceColors(color);
  return (
    <>
      {face([[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]], c.top, opacity)}
      {face([[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]], c.left, opacity)}
      {face([[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]], c.right, opacity)}
    </>
  );
}

/** Text lying in the vertical plane y = const, reading along +x. */
const planeText = (at: P3, text: string, size = 6.5, anchor: "start" | "middle" = "start") => {
  const [sx, sy] = project(at);
  return (
    <text
      transform={`matrix(${COS30.toFixed(4)} 0.5 0 1 ${sx.toFixed(2)} ${sy.toFixed(2)})`}
      fontSize={size}
      fontFamily="Arial, sans-serif"
      fontWeight="700"
      textAnchor={anchor}
      fill={STROKE}
    >
      {text}
    </text>
  );
};

/** Faint reference cube drawn behind every element (hidden edges dashed). */
const ghostCube = (
  <g opacity="0.55">
    {line([[0, 0, 0], [1, 0, 0]], 0.5, "#9aa8b8", "1.2 1.2")}
    {line([[0, 0, 0], [0, 1, 0]], 0.5, "#9aa8b8", "1.2 1.2")}
    {line([[0, 0, 0], [0, 0, 1]], 0.5, "#9aa8b8", "1.2 1.2")}
    {line([[1, 0, 0], [1, 1, 0], [0, 1, 0]], 0.5, "#9aa8b8")}
    {line([[1, 0, 0], [1, 0, 1], [0, 0, 1], [0, 1, 1], [0, 1, 0]], 0.5, "#9aa8b8")}
    {line([[1, 1, 0], [1, 1, 1]], 0.5, "#9aa8b8")}
    {line([[1, 0, 1], [1, 1, 1], [0, 1, 1]], 0.5, "#9aa8b8")}
  </g>
);

// ==========================
// ELEMENTS (in cube units)
// ==========================

const wall = (
  <>
    {box([0, 0.3, 0, 1, 0.56, 1], CONCRETE)}
    {box([0, 0.56, 0, 1, 0.74, 1], INSULATION)}
  </>
);

const door = (
  <>
    {box([0.16, 0.42, 0, 0.24, 0.58, 0.92])}
    {box([0.24, 0.47, 0, 0.76, 0.53, 0.92], WOOD)}
    {box([0.76, 0.42, 0, 0.84, 0.58, 0.92])}
    {box([0.16, 0.42, 0.92, 0.84, 0.58, 1])}
    <circle cx={project([0.68, 0.53, 0.45])[0]} cy={project([0.68, 0.53, 0.45])[1]} r="0.9" fill={STROKE} />
  </>
);

const windowIcon = (
  <>
    {box([0.18, 0.49, 0.23, 0.82, 0.51, 0.87], GLASS, 0.85)}
    {box([0.1, 0.45, 0.15, 0.9, 0.55, 0.23])}
    {box([0.1, 0.45, 0.23, 0.18, 0.55, 0.87])}
    {box([0.18, 0.45, 0.52, 0.47, 0.55, 0.58])}
    {box([0.47, 0.45, 0.23, 0.53, 0.55, 0.87])}
    {box([0.53, 0.45, 0.52, 0.82, 0.55, 0.58])}
    {box([0.82, 0.45, 0.23, 0.9, 0.55, 0.87])}
    {box([0.1, 0.45, 0.87, 0.9, 0.55, 0.95])}
  </>
);

// Chimney block (e.g. Schiedel) with a flue on top
const component = (
  <>
    {box([0.28, 0.28, 0, 0.72, 0.72, 1], CONCRETE)}
    {face([[0.38, 0.38, 1], [0.62, 0.38, 1], [0.62, 0.62, 1], [0.38, 0.62, 1]], "#5b6b7d")}
  </>
);

const column = (
  <>
    {box([0.28, 0.28, 0, 0.72, 0.72, 0.1], CONCRETE)}
    {box([0.4, 0.4, 0.1, 0.6, 0.6, 1], CONCRETE)}
  </>
);

// Gable roof with standing seams
const roofShape = (x0: number, x1: number, y0: number, y1: number, eave: number, ridge: number, seams = true) => {
  const ym = (y0 + y1) / 2;
  const c = faceColors(BLUE);
  return (
    <>
      {face([[x0, ym, ridge], [x1, ym, ridge], [x1, y1, eave], [x0, y1, eave]], c.top)}
      {face([[x1, y0, eave], [x1, y1, eave], [x1, ym, ridge]], c.right)}
      {seams &&
        [0.2, 0.4, 0.6, 0.8].map((t) => {
          const x = x0 + (x1 - x0) * t;
          return <g key={t}>{line([[x, ym, ridge], [x, y1, eave]], 0.5)}</g>;
        })}
    </>
  );
};
const roof = roofShape(0, 1, 0, 1, 0.35, 0.95);

// Suspended ceiling: grid board hung on rods
const ceiling = (
  <>
    {box([0, 0, 0.56, 1, 1, 0.62])}
    {[0.25, 0.5, 0.75].map((t) => (
      <g key={t}>
        {line([[t, 0, 0.62], [t, 1, 0.62]], 0.4)}
        {line([[0, t, 0.62], [1, t, 0.62]], 0.4)}
      </g>
    ))}
    {([[0.2, 0.2], [0.8, 0.2], [0.2, 0.8], [0.8, 0.8]] as const).map(([x, y]) => (
      <g key={`${x}${y}`}>{line([[x, y, 0.62], [x, y, 1]], 0.7)}</g>
    ))}
  </>
);

// Slab on grade: concrete, insulation, screed, finish
const floor = (
  <>
    {box([0, 0, 0, 1, 1, 0.16], CONCRETE)}
    {box([0, 0, 0.16, 1, 1, 0.26], INSULATION)}
    {box([0, 0, 0.26, 1, 1, 0.34], SCREED)}
    {box([0, 0, 0.34, 1, 1, 0.38], WOOD)}
  </>
);

// Steel I-beam
const beam = (
  <>
    {box([0, 0.3, 0.3, 1, 0.7, 0.37])}
    {box([0, 0.47, 0.37, 1, 0.53, 0.63])}
    {box([0, 0.3, 0.63, 1, 0.7, 0.7])}
  </>
);

// Rectangular duct with flanges
const duct = (
  <>
    {box([0, 0.3, 0.32, 0.3, 0.7, 0.68])}
    {box([0.3, 0.26, 0.28, 0.34, 0.74, 0.72])}
    {box([0.34, 0.3, 0.32, 0.66, 0.7, 0.68])}
    {box([0.66, 0.26, 0.28, 0.7, 0.74, 0.72])}
    {box([0.7, 0.3, 0.32, 1, 0.7, 0.68])}
  </>
);

const spotElevation = (
  <>
    {box([0, 0, 0, 1, 1, 0.12], CONCRETE)}
    {face([[0.3, 0.5, 0.36], [0.54, 0.5, 0.36], [0.42, 0.5, 0.12]], "#fff")}
    {line([[0.3, 0.5, 0.36], [1, 0.5, 0.36]])}
    {planeText([0.46, 0.5, 0.42], "±0,00", 5.5)}
  </>
);

const dimension = (
  <>
    {box([0, 0.35, 0, 1, 0.65, 0.42])}
    {line([[0, 0.5, 0.42], [0, 0.5, 0.86]], 0.5)}
    {line([[1, 0.5, 0.42], [1, 0.5, 0.86]], 0.5)}
    {line([[-0.04, 0.5, 0.72], [1.04, 0.5, 0.72]], 0.7)}
    {line([[-0.06, 0.5, 0.66], [0.06, 0.5, 0.78]], 1.2)}
    {line([[0.94, 0.5, 0.66], [1.06, 0.5, 0.78]], 1.2)}
    {planeText([0.5, 0.5, 0.76], "120", 6.5, "middle")}
  </>
);

// Wedge rising towards +x, arrow pointing down the slope
const slope = (() => {
  const a = 0.12;
  const b = 0.6;
  const z = (x: number) => a + (b - a) * x;
  const c = faceColors(BLUE);
  return (
    <>
      {face([[0, 0, a], [1, 0, b], [1, 1, b], [0, 1, a]], c.top)}
      {face([[0, 1, 0], [1, 1, 0], [1, 1, b], [0, 1, a]], c.left)}
      {face([[1, 0, 0], [1, 1, 0], [1, 1, b], [1, 0, b]], c.right)}
      {line([[0.85, 0.5, z(0.85)], [0.2, 0.5, z(0.2)]], 1)}
      {line([[0.32, 0.38, z(0.32)], [0.2, 0.5, z(0.2)], [0.32, 0.62, z(0.32)]], 1)}
      {planeText([0.32, 1, 0.04], "2%", 5.5)}
    </>
  );
})();

const tag = (
  <>
    {box([0.2, 0.4, 0, 0.8, 0.6, 0.12])}
    {line([[0.5, 0.5, 0.12], [0.5, 0.5, 0.35]], 0.6)}
    {face(
      [[0.1, 0.5, 0.55], [0.25, 0.5, 0.78], [0.75, 0.5, 0.78], [0.9, 0.5, 0.55], [0.75, 0.5, 0.35], [0.25, 0.5, 0.35]],
      "#fff"
    )}
    {planeText([0.5, 0.5, 0.49], "D1", 6.5, "middle")}
  </>
);

// Extruded letter "A"
const font = (() => {
  const outline: [number, number][] = [
    [0.1, 0], [0.4, 1], [0.6, 1], [0.9, 0], [0.7, 0], [0.63, 0.25], [0.37, 0.25], [0.3, 0],
  ];
  const hole: [number, number][] = [[0.42, 0.42], [0.5, 0.72], [0.58, 0.42]];
  const at = (y: number) => (pts: [number, number][]) => toPoints(pts.map(([x, z]) => [x, y, z * 0.9 + 0.05]));
  const back = at(0.35);
  const front = at(0.6);
  return (
    <>
      <path d={`M${back(outline)}Z M${back(hole)}Z`} fill={shade(BLUE, -0.15)} fillRule="evenodd" stroke={STROKE} strokeWidth="0.7" />
      {outline.map(([x, z], i) => (
        <g key={i}>{line([[x, 0.35, z * 0.9 + 0.05], [x, 0.6, z * 0.9 + 0.05]], 0.5)}</g>
      ))}
      <path d={`M${front(outline)}Z M${front(hole)}Z`} fill={shade(BLUE, 0.4)} fillRule="evenodd" stroke={STROKE} strokeWidth="0.7" />
    </>
  );
})();

// Small house: walls, gable roof, door and window
const building = (
  <>
    {box([0.15, 0.15, 0, 0.85, 0.85, 0.5])}
    {face([[0.42, 0.85, 0], [0.58, 0.85, 0], [0.58, 0.85, 0.3], [0.42, 0.85, 0.3]], "#5b6b7d")}
    {face([[0.85, 0.35, 0.2], [0.85, 0.6, 0.2], [0.85, 0.6, 0.38], [0.85, 0.35, 0.38]], GLASS)}
    {roofShape(0.15, 0.85, 0.15, 0.85, 0.5, 0.92, false)}
  </>
);

// Portal frame: two columns and a beam
const frame = (
  <>
    {box([0.12, 0.42, 0, 0.24, 0.58, 0.8], CONCRETE)}
    {box([0.76, 0.42, 0, 0.88, 0.58, 0.8], CONCRETE)}
    {box([0.06, 0.4, 0.8, 0.94, 0.6, 0.95], CONCRETE)}
  </>
);

const generic = box([0.25, 0.25, 0, 0.75, 0.75, 0.5]);

const SHAPES: Record<string, ReactNode> = {
  Architektura: building,
  Konstrukcja: frame,
  Systemy: duct,
  Opisz: dimension,
  Ściany: wall,
  Drzwi: door,
  Okna: windowIcon,
  Komponenty: component,
  Słupy: column,
  Dachy: roof,
  Sufity: ceiling,
  Podłogi: floor,
  Belki: beam,
  Kanały: duct,
  "Rzędne punktu": spotElevation,
  Wymiary: dimension,
  Nachylenia: slope,
  Oznaczenia: tag,
  Font: font,
};

// ==========================
// MATERIALS — a 1×1×1 sample cube made of the material
// ==========================

type Pattern = "dots" | "grain" | "fibres" | "glass";

const MATERIALS: Record<string, { color: string; pattern?: Pattern }> = {
  Materiały: { color: "#c5cad2", pattern: "dots" },
  Beton: { color: "#b5b5b5", pattern: "dots" },
  "Beton konstrukcyjny": { color: "#a9a9a9", pattern: "dots" },
  "Beton podkładowy": { color: "#c4c4c4", pattern: "dots" },
  "Beton komórkowy": { color: "#ece8de" },
  Jastrych: { color: "#cfc8b8" },
  Mur: { color: "#e5ddcc" },
  Drewno: { color: "#d9ad6f", pattern: "grain" },
  Świerk: { color: "#e3bd85", pattern: "grain" },
  Grunt: { color: "#8b6b4a", pattern: "dots" },
  Piasek: { color: "#e2c98f", pattern: "dots" },
  Izolacja: { color: "#efd77c", pattern: "fibres" },
  Wełna: { color: "#efd77c", pattern: "fibres" },
  Styropian: { color: "#f6f6f6", pattern: "dots" },
  Szkło: { color: "#bfe3f2", pattern: "glass" },
  Czyste: { color: "#cfeaf6", pattern: "glass" },
};

// Fixed positions (u, v) on a face, so the pattern looks random but never changes.
const DOTS: [number, number][] = [
  [0.2, 0.25], [0.55, 0.15], [0.8, 0.4], [0.35, 0.6], [0.7, 0.75], [0.15, 0.85], [0.5, 0.42], [0.88, 0.88],
];
const faceDots = (map: (u: number, v: number) => P3, color: string) =>
  DOTS.map(([u, v], i) => {
    const [x, y] = project(map(u, v));
    return <circle key={i} cx={x} cy={y} r="0.6" fill={color} />;
  });

const waves = (map: (t: number, level: number) => P3, levels: number[], amplitude: number, color: string) =>
  levels.map((level) => (
    <g key={level}>
      {line(
        Array.from({ length: 11 }, (_, i) => {
          const t = i / 10;
          return map(t, level + amplitude * Math.sin(t * 9 + level * 7));
        }),
        0.5,
        color
      )}
    </g>
  ));

function MaterialCube({ color, pattern }: { color: string; pattern?: Pattern }) {
  if (pattern === "glass") {
    return (
      <>
        {ghostCube}
        {box([0, 0, 0, 1, 1, 1], color, 0.55)}
        {line([[0.15, 1, 0.3], [0.45, 1, 0.85]], 0.8, "#fff")}
        {line([[1, 0.2, 0.25], [1, 0.45, 0.7]], 0.8, "#fff")}
      </>
    );
  }
  const mark = shade(color, -0.45);
  return (
    <>
      {box([0, 0, 0, 1, 1, 1], color)}
      {pattern === "dots" && (
        <>
          {faceDots((u, v) => [u, v, 1], mark)}
          {faceDots((u, v) => [u, 1, v], mark)}
          {faceDots((u, v) => [1, u, v], mark)}
        </>
      )}
      {(pattern === "grain" || pattern === "fibres") && (
        <>
          {waves((t, z) => [t, 1, z], [0.2, 0.45, 0.7], pattern === "grain" ? 0.03 : 0.06, mark)}
          {waves((t, z) => [1, t, z], [0.25, 0.5, 0.75], pattern === "grain" ? 0.03 : 0.06, mark)}
          {waves((t, y) => [t, y, 1], [0.3, 0.6], pattern === "grain" ? 0.04 : 0.06, mark)}
        </>
      )}
    </>
  );
}

// ==========================
// PUBLIC ICONS
// ==========================

const Svg = ({ size, children }: { size: number; children: ReactNode }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true" strokeLinejoin="round">
    {children}
  </svg>
);

export function TermIcon({ name, size = 32 }: { name: string; size?: number }) {
  const material = MATERIALS[name];
  if (material)
    return (
      <Svg size={size}>
        <MaterialCube {...material} />
      </Svg>
    );
  return (
    <Svg size={size}>
      {ghostCube}
      {SHAPES[name] ?? generic}
    </Svg>
  );
}

/** "All": the cube split into eight smaller cubes. */
export const AllIcon = ({ size = 32 }: { size?: number }) => {
  const cells: number[][] = [];
  for (const z of [0, 0.56]) for (const y of [0, 0.56]) for (const x of [0, 0.56]) cells.push([x, y, z]);
  cells.sort((a, b) => a[2] - b[2] || a[0] + a[1] - (b[0] + b[1]));
  return (
    <Svg size={size}>
      {cells.map(([x, y, z]) => (
        <g key={`${x}${y}${z}`}>{box([x, y, z, x + 0.44, y + 0.44, z + 0.44])}</g>
      ))}
    </Svg>
  );
};

// Small flat UI icons (16 px)

export const ThumbnailsIcon = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <path d="M1.5 1.5h5.5v5.5H1.5zM9 1.5h5.5v5.5H9zM1.5 9h5.5v5.5H1.5zM9 9h5.5v5.5H9z" fill="#dce8f6" stroke={STROKE} />
  </svg>
);

export const ListIcon = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <path d="M1.5 2h3v3h-3zM1.5 6.5h3v3h-3zM1.5 11h3v3h-3z" fill="#dce8f6" stroke={STROKE} />
    <path d="M6.5 3.5h8M6.5 8h8M6.5 12.5h8" stroke={STROKE} strokeWidth="1.3" />
  </svg>
);

export const SearchIcon = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="m11 11 4 4" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
