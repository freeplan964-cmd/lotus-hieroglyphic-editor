import { GlyphDef } from "@/types/editor";

export const GLYPH_DATASET: GlyphDef[] = [
  {
    id: "A1",
    label: "Seated Man",
    category: "People",
    viewBox: "0 0 1800 1800",
    svgContent: `<g fill="currentColor">
      <ellipse cx="900" cy="320" rx="130" ry="150"/>
      <rect x="770" y="480" width="260" height="380" rx="40"/>
      <rect x="1030" y="480" width="100" height="280" rx="30" transform="rotate(15 1030 480)"/>
      <rect x="670" y="860" width="120" height="400" rx="40" transform="rotate(-5 670 860)"/>
      <rect x="1010" y="860" width="120" height="400" rx="40" transform="rotate(5 1010 860)"/>
      <ellipse cx="900" cy="240" rx="60" ry="40" fill="none" stroke="currentColor" strokeWidth="20"/>
    </g>`,
  },
  {
    id: "A2",
    label: "Man with Hand to Mouth",
    category: "People",
    viewBox: "0 0 1800 1800",
    svgContent: `<g fill="currentColor">
      <ellipse cx="900" cy="310" rx="130" ry="140"/>
      <rect x="780" y="460" width="240" height="360" rx="40"/>
      <rect x="1020" y="460" width="90" height="120" rx="25" transform="rotate(-40 1020 460)"/>
      <rect x="1100" y="380" width="90" height="90" rx="20" transform="rotate(-40 1100 380)"/>
      <rect x="680" y="820" width="120" height="420" rx="40" transform="rotate(-5 680 820)"/>
      <rect x="1000" y="820" width="120" height="420" rx="40" transform="rotate(5 1000 820)"/>
    </g>`,
  },
  {
    id: "A17",
    label: "Child",
    category: "People",
    viewBox: "0 0 1800 1800",
    svgContent: `<g fill="currentColor">
      <ellipse cx="900" cy="380" rx="110" ry="120"/>
      <rect x="800" y="510" width="200" height="280" rx="35"/>
      <rect x="700" y="790" width="100" height="320" rx="35" transform="rotate(-8 700 790)"/>
      <rect x="1000" y="790" width="100" height="320" rx="35" transform="rotate(8 1000 790)"/>
      <circle cx="860" cy="460" r="20"/>
    </g>`,
  },
  {
    id: "B1",
    label: "Seated Woman",
    category: "People",
    viewBox: "0 0 1800 1800",
    svgContent: `<g fill="currentColor">
      <ellipse cx="880" cy="310" rx="120" ry="135"/>
      <path d="M780 450 Q860 460 940 450 L980 820 Q880 840 780 820 Z"/>
      <rect x="950" y="450" width="90" height="270" rx="25" transform="rotate(12 950 450)"/>
      <path d="M700 820 L780 820 L800 1260 L680 1260 Z" rx="35"/>
      <path d="M980 820 L1060 820 L1040 1260 L960 1260 Z" rx="35"/>
    </g>`,
  },
  {
    id: "D1",
    label: "Head",
    category: "Body",
    viewBox: "0 0 1800 1800",
    svgContent: `<g fill="currentColor">
      <ellipse cx="900" cy="700" rx="320" ry="380"/>
      <ellipse cx="900" cy="700" rx="260" ry="320" fill="none" stroke="currentColor" strokeWidth="30"/>
      <ellipse cx="820" cy="640" rx="45" ry="55"/>
      <ellipse cx="980" cy="640" rx="45" ry="55"/>
      <path d="M820 820 Q900 880 980 820" fill="none" stroke="currentColor" strokeWidth="30" strokeLinecap="round"/>
      <ellipse cx="900" cy="440" rx="120" ry="60" fill="none" stroke="currentColor" strokeWidth="20"/>
    </g>`,
  },
  {
    id: "D2",
    label: "Face",
    category: "Body",
    viewBox: "0 0 1800 1800",
    svgContent: `<g fill="currentColor">
      <path d="M500 900 Q500 400 900 300 Q1300 400 1300 900 Q1300 1300 900 1400 Q500 1300 500 900 Z"/>
      <ellipse cx="740" cy="750" rx="55" ry="65" fill="black"/>
      <ellipse cx="1060" cy="750" rx="55" ry="65" fill="black"/>
      <path d="M740 1000 Q900 1100 1060 1000" fill="none" stroke="black" strokeWidth="35" strokeLinecap="round"/>
      <path d="M700 600 Q900 560 1100 600" fill="none" stroke="black" strokeWidth="28" strokeLinecap="round"/>
    </g>`,
  },
  {
    id: "D36",
    label: "Arm",
    category: "Body",
    viewBox: "0 0 1800 1800",
    svgContent: `<g fill="currentColor">
      <path d="M300 900 Q600 700 1000 800 Q1300 870 1500 780" fill="none" stroke="currentColor" strokeWidth="100" strokeLinecap="round"/>
      <ellipse cx="1500" cy="780" rx="80" ry="60" transform="rotate(-15 1500 780)"/>
      <rect x="1430" y="700" width="50" height="140" rx="20" transform="rotate(-20 1430 700)"/>
      <rect x="1490" y="680" width="50" height="130" rx="20" transform="rotate(-10 1490 680)"/>
      <rect x="1550" y="690" width="50" height="120" rx="20" transform="rotate(5 1550 690)"/>
    </g>`,
  },
  {
    id: "E1",
    label: "Bull",
    category: "Animals",
    viewBox: "0 0 1800 1800",
    svgContent: `<g fill="currentColor">
      <ellipse cx="1000" cy="800" rx="480" ry="320"/>
      <ellipse cx="460" cy="680" rx="220" ry="200"/>
      <path d="M280 480 Q240 340 320 300 Q360 400 440 480" fill="currentColor"/>
      <path d="M640 480 Q700 340 660 280 Q580 380 560 480" fill="currentColor"/>
      <rect x="600" y="1120" width="100" height="380" rx="40"/>
      <rect x="760" y="1120" width="100" height="380" rx="40"/>
      <rect x="1100" y="1120" width="100" height="380" rx="40"/>
      <rect x="1260" y="1120" width="100" height="380" rx="40"/>
      <path d="M1480 760 Q1600 700 1640 800 Q1580 860 1480 880" fill="currentColor"/>
    </g>`,
  },
  {
    id: "E17",
    label: "Goat",
    category: "Animals",
    viewBox: "0 0 1800 1800",
    svgContent: `<g fill="currentColor">
      <ellipse cx="950" cy="850" rx="450" ry="280"/>
      <ellipse cx="450" cy="700" rx="200" ry="185"/>
      <path d="M340 520 Q310 380 380 350 Q410 430 450 510" />
      <path d="M560 510 Q610 370 570 330 Q500 410 490 510" />
      <rect x="600" y="1130" width="90" height="360" rx="35"/>
      <rect x="740" y="1130" width="90" height="360" rx="35"/>
      <rect x="1100" y="1130" width="90" height="360" rx="35"/>
      <rect x="1240" y="1130" width="90" height="360" rx="35"/>
      <path d="M1400 800 Q1560 750 1600 840" fill="none" stroke="currentColor" strokeWidth="60" strokeLinecap="round"/>
    </g>`,
  },
  {
    id: "G1",
    label: "Egyptian Vulture",
    category: "Birds",
    viewBox: "0 0 1800 1800",
    svgContent: `<g fill="currentColor">
      <ellipse cx="900" cy="540" rx="380" ry="220"/>
      <ellipse cx="440" cy="440" rx="170" ry="155"/>
      <path d="M300 480 Q220 380 280 330 Q340 420 400 470" />
      <path d="M520 290 Q900 100 1380 280 Q1200 320 900 360 Q620 380 520 290 Z"/>
      <path d="M1380 480 Q1480 520 1460 620 Q1380 560 1300 540" />
      <rect x="820" y="760" width="90" height="280" rx="30"/>
      <rect x="960" y="760" width="90" height="280" rx="30"/>
    </g>`,
  },
  {
    id: "G17",
    label: "Owl",
    category: "Birds",
    viewBox: "0 0 1800 1800",
    svgContent: `<g fill="currentColor">
      <ellipse cx="900" cy="600" rx="380" ry="420"/>
      <ellipse cx="760" cy="440" rx="90" ry="80"/>
      <ellipse cx="1040" cy="440" rx="90" ry="80"/>
      <ellipse cx="760" cy="440" rx="40" ry="38" fill="black"/>
      <ellipse cx="1040" cy="440" rx="40" ry="38" fill="black"/>
      <path d="M860 600 Q900 640 940 600 Q900 580 860 600 Z"/>
      <path d="M680 1020 Q700 1180 740 1280 Q780 1200 800 1020" />
      <path d="M1000 1020 Q1020 1180 1060 1280 Q1100 1200 1100 1020" />
      <path d="M520 580 Q380 500 360 620 Q400 660 520 680" />
      <path d="M1280 580 Q1420 500 1440 620 Q1400 660 1280 680" />
    </g>`,
  },
  {
    id: "I9",
    label: "Horned Viper",
    category: "Reptiles",
    viewBox: "0 0 1800 1800",
    svgContent: `<g fill="currentColor">
      <path d="M200 1000 Q500 600 900 700 Q1200 780 1400 600 Q1500 500 1560 540 Q1480 680 1380 720 Q1160 860 900 840 Q600 820 300 1100 Z"/>
      <ellipse cx="1560" cy="510" rx="80" ry="60" transform="rotate(-20 1560 510)"/>
      <path d="M1520 440 Q1600 380 1620 300" fill="none" stroke="currentColor" strokeWidth="25"/>
    </g>`,
  },
  {
    id: "M1",
    label: "Tree",
    category: "Plants",
    viewBox: "0 0 1800 1800",
    svgContent: `<g fill="currentColor">
      <rect x="840" y="900" width="120" height="560" rx="20"/>
      <ellipse cx="900" cy="680" rx="360" ry="320"/>
      <ellipse cx="660" cy="820" rx="200" ry="180"/>
      <ellipse cx="1140" cy="820" rx="200" ry="180"/>
      <path d="M700 400 Q900 200 1100 400" fill="none" stroke="currentColor" strokeWidth="40" strokeLinecap="round"/>
    </g>`,
  },
  {
    id: "M17",
    label: "Reed",
    category: "Plants",
    viewBox: "0 0 1800 1800",
    svgContent: `<g fill="currentColor">
      <rect x="870" y="600" width="60" height="900" rx="20"/>
      <path d="M900 600 Q750 400 680 250 Q800 300 900 520" />
      <path d="M900 700 Q1050 500 1120 350 Q1000 400 900 620" />
      <path d="M900 800 Q730 620 660 480 Q780 540 900 760" />
    </g>`,
  },
  {
    id: "N1",
    label: "Sky",
    category: "Nature",
    viewBox: "0 0 1800 1800",
    svgContent: `<g fill="currentColor">
      <rect x="200" y="700" width="1400" height="80" rx="20"/>
      <rect x="200" y="680" width="80" height="420" rx="20"/>
      <rect x="1520" y="680" width="80" height="420" rx="20"/>
      <path d="M200 700 Q900 500 1600 700" fill="none" stroke="currentColor" strokeWidth="50" strokeLinecap="round"/>
    </g>`,
  },
  {
    id: "N5",
    label: "Sun",
    category: "Nature",
    viewBox: "0 0 1800 1800",
    svgContent: `<g fill="currentColor">
      <circle cx="900" cy="900" r="320"/>
      <circle cx="900" cy="900" r="200" fill="none" stroke="currentColor" strokeWidth="40"/>
      <line x1="900" y1="440" x2="900" y2="340" stroke="currentColor" strokeWidth="40" strokeLinecap="round"/>
      <line x1="900" y1="1360" x2="900" y2="1460" stroke="currentColor" strokeWidth="40" strokeLinecap="round"/>
      <line x1="440" y1="900" x2="340" y2="900" stroke="currentColor" strokeWidth="40" strokeLinecap="round"/>
      <line x1="1360" y1="900" x2="1460" y2="900" stroke="currentColor" strokeWidth="40" strokeLinecap="round"/>
    </g>`,
  },
  {
    id: "N35",
    label: "Water",
    category: "Nature",
    viewBox: "0 0 1800 1800",
    svgContent: `<g fill="currentColor">
      <path d="M200 700 Q400 600 600 700 Q800 800 1000 700 Q1200 600 1400 700 Q1600 800 1600 800 L1600 900 Q1400 1000 1200 900 Q1000 800 800 900 Q600 1000 400 900 Q200 800 200 800 Z"/>
      <path d="M200 950 Q400 850 600 950 Q800 1050 1000 950 Q1200 850 1400 950 Q1600 1050 1600 1050 L1600 1150 Q1400 1250 1200 1150 Q1000 1050 800 1150 Q600 1250 400 1150 Q200 1050 200 1050 Z"/>
    </g>`,
  },
  {
    id: "O1",
    label: "House",
    category: "Buildings",
    viewBox: "0 0 1800 1800",
    svgContent: `<g fill="currentColor">
      <path d="M300 900 L300 1400 L1500 1400 L1500 900 L900 500 Z" fill="none" stroke="currentColor" strokeWidth="60" strokeLinejoin="round"/>
      <rect x="760" y="1100" width="280" height="300" rx="20"/>
      <rect x="440" y="980" width="220" height="180" rx="10" fill="none" stroke="currentColor" strokeWidth="40"/>
    </g>`,
  },
  {
    id: "R8",
    label: "Lotus",
    category: "Symbols",
    viewBox: "0 0 1800 1800",
    svgContent: `<g fill="currentColor">
      <rect x="870" y="900" width="60" height="500" rx="20"/>
      <path d="M900 900 Q700 700 680 500 Q780 540 820 640 Q860 740 900 840" />
      <path d="M900 900 Q1100 700 1120 500 Q1020 540 980 640 Q940 740 900 840" />
      <path d="M900 840 Q800 650 820 480 Q870 520 890 640 Q895 740 900 840" />
      <path d="M900 840 Q1000 650 980 480 Q930 520 910 640 Q905 740 900 840" />
      <ellipse cx="900" cy="480" rx="140" ry="100"/>
      <ellipse cx="900" cy="460" rx="80" ry="60" fill="none" stroke="currentColor" strokeWidth="25"/>
    </g>`,
  },
  {
    id: "S1",
    label: "White Crown",
    category: "Regalia",
    viewBox: "0 0 1800 1800",
    svgContent: `<g fill="currentColor">
      <path d="M740 1400 Q680 900 780 500 Q900 200 1020 500 Q1120 900 1060 1400 Z"/>
      <ellipse cx="900" cy="1400" rx="200" ry="80"/>
      <ellipse cx="900" cy="480" rx="80" ry="80"/>
    </g>`,
  },
  {
    id: "S3",
    label: "Red Crown",
    category: "Regalia",
    viewBox: "0 0 1800 1800",
    svgContent: `<g fill="currentColor">
      <path d="M400 1300 L400 700 Q400 500 600 500 L1000 500 L1000 600 L700 600 Q600 600 600 700 L600 1300 Z"/>
      <rect x="400" y="1250" width="800" height="100" rx="30"/>
      <path d="M1000 500 Q1300 400 1400 300 Q1450 500 1200 560" />
    </g>`,
  },
  {
    id: "T3",
    label: "Knife",
    category: "Objects",
    viewBox: "0 0 1800 1800",
    svgContent: `<g fill="currentColor">
      <path d="M300 1000 Q600 900 1400 600 Q1500 580 1520 620 Q1480 680 1380 700 Q600 1000 320 1100 Z"/>
      <ellipse cx="310" cy="1050" rx="60" ry="80" transform="rotate(-10 310 1050)"/>
    </g>`,
  },
  {
    id: "U1",
    label: "Sickle",
    category: "Objects",
    viewBox: "0 0 1800 1800",
    svgContent: `<g fill="currentColor">
      <path d="M400 1200 Q300 800 400 500 Q500 300 700 280 Q900 260 1000 400 Q1100 540 1000 700 Q900 820 700 820" fill="none" stroke="currentColor" strokeWidth="80" strokeLinecap="round"/>
      <ellipse cx="400" cy="1200" rx="80" ry="100" transform="rotate(20 400 1200)"/>
    </g>`,
  },
  {
    id: "V1",
    label: "Rope Coil",
    category: "Objects",
    viewBox: "0 0 1800 1800",
    svgContent: `<g fill="currentColor">
      <circle cx="900" cy="900" r="480" fill="none" stroke="currentColor" strokeWidth="70"/>
      <circle cx="900" cy="900" r="320" fill="none" stroke="currentColor" strokeWidth="60"/>
      <circle cx="900" cy="900" r="160" fill="none" stroke="currentColor" strokeWidth="50"/>
    </g>`,
  },
  {
    id: "W1",
    label: "Oil Jar",
    category: "Objects",
    viewBox: "0 0 1800 1800",
    svgContent: `<g fill="currentColor">
      <path d="M640 1400 Q540 1100 560 700 Q580 400 900 380 Q1220 400 1240 700 Q1260 1100 1160 1400 Z"/>
      <ellipse cx="900" cy="1400" rx="260" ry="60"/>
      <ellipse cx="900" cy="380" rx="160" ry="50"/>
      <rect x="820" y="280" width="160" height="120" rx="20"/>
    </g>`,
  },
  {
    id: "X1",
    label: "Bread Loaf",
    category: "Food",
    viewBox: "0 0 1800 1800",
    svgContent: `<g fill="currentColor">
      <ellipse cx="900" cy="900" rx="560" ry="280"/>
      <ellipse cx="900" cy="900" rx="500" ry="220" fill="none" stroke="currentColor" strokeWidth="25"/>
    </g>`,
  },
  {
    id: "Z1",
    label: "Stroke",
    category: "Signs",
    viewBox: "0 0 1800 1800",
    svgContent: `<g fill="currentColor">
      <rect x="820" y="300" width="160" height="1200" rx="50"/>
    </g>`,
  },
  {
    id: "Z4",
    label: "Dual Strokes",
    category: "Signs",
    viewBox: "0 0 1800 1800",
    svgContent: `<g fill="currentColor">
      <rect x="660" y="300" width="140" height="1200" rx="45"/>
      <rect x="1000" y="300" width="140" height="1200" rx="45"/>
    </g>`,
  },
  {
    id: "Aa1",
    label: "Placenta",
    category: "Signs",
    viewBox: "0 0 1800 1800",
    svgContent: `<g fill="currentColor">
      <circle cx="900" cy="900" r="380"/>
      <circle cx="900" cy="900" r="240" fill="none" stroke="currentColor" strokeWidth="40"/>
      <circle cx="900" cy="900" r="100"/>
    </g>`,
  },
  {
    id: "F35",
    label: "Heart and Trachea",
    category: "Body",
    viewBox: "0 0 1800 1800",
    svgContent: `<g fill="currentColor">
      <path d="M900 1300 Q560 1000 420 760 Q300 540 480 420 Q620 340 760 480 Q840 560 900 660 Q960 560 1040 480 Q1180 340 1320 420 Q1500 540 1380 760 Q1240 1000 900 1300 Z"/>
      <rect x="860" y="400" width="80" height="220" rx="30"/>
      <ellipse cx="900" cy="380" rx="100" ry="60"/>
      <path d="M800 380 Q680 300 660 200 Q760 220 820 320" fill="none" stroke="currentColor" strokeWidth="30" strokeLinecap="round"/>
      <path d="M1000 380 Q1120 300 1140 200 Q1040 220 980 320" fill="none" stroke="currentColor" strokeWidth="30" strokeLinecap="round"/>
    </g>`,
  },
];

export const CATEGORIES = [...new Set(GLYPH_DATASET.map((g) => g.category))];
