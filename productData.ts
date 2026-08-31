import { Colorway, MaterialDetail, EngineeringAnnotation, StoryboardFrame } from '../types';

import heroImg from '../assets/images/aeron_hero_studio_1788202105890.jpg';
import explodedImg from '../assets/images/aeron_exploded_layers_1788202126520.jpg';
import macroImg from '../assets/images/aeron_macro_detail_1788202140836.jpg';
import soleImg from '../assets/images/aeron_sole_geometry_1788202158333.jpg';
import boneImg from '../assets/images/aeron_color_bone_1788202175227.jpg';
import silverImg from '../assets/images/aeron_color_silver_1788202194469.jpg';
import sandImg from '../assets/images/aeron_color_sand_1788202209725.jpg';
import motionImg from '../assets/images/aeron_motion_lifestyle_1788202229493.jpg';

export const PRODUCT_ASSETS = {
  hero: heroImg,
  exploded: explodedImg,
  macro: macroImg,
  sole: soleImg,
  bone: boneImg,
  silver: silverImg,
  sand: sandImg,
  motion: motionImg,
};

export const COLORWAYS: Colorway[] = [
  {
    id: 'obsidian',
    code: '01',
    name: 'OBSIDIAN',
    subtitle: 'Matte Carbon / Dark Graphite',
    hex: '#141416',
    accentHex: '#38383e',
    image: heroImg,
    description: 'Triple-density monofilament weave finished in light-absorbing carbon tones with sculpted graphite counter.'
  },
  {
    id: 'bone',
    code: '02',
    name: 'BONE',
    subtitle: 'Chalk Ivory / Soft Gray',
    hex: '#e2dfd7',
    accentHex: '#b5b2aa',
    image: boneImg,
    description: 'Mineral-washed natural knit upper paired with architectural chalk foam chassis and subtle warm gray accents.'
  },
  {
    id: 'silver',
    code: '03',
    name: 'SILVER',
    subtitle: 'Titanium / Slate Platinum',
    hex: '#9ba1a8',
    accentHex: '#d8dee6',
    image: silverImg,
    description: 'High-reflectivity micro-mesh with liquid-metal finished TPU skeleton and titanium alloy lace anchors.'
  },
  {
    id: 'sand',
    code: '04',
    name: 'SAND',
    subtitle: 'Desert Clay / Warm Taupe',
    hex: '#b39f8a',
    accentHex: '#736050',
    image: sandImg,
    description: 'Raw earth dyed organic textile weave balanced against warm stone midsole and sculpted gum rubber tread.'
  }
];

export const MATERIALS: MaterialDetail[] = [
  {
    id: 'mesh',
    name: 'BREATHABLE MESH',
    category: 'Vamp & Tongue',
    description: 'Targeted monofilament knit with zonal micro-perforations for optimal airflow and ultra-low weight.',
    position: { x: 38, y: 34 }
  },
  {
    id: 'upper',
    name: 'ENGINEERED UPPER',
    category: 'Structural Shell',
    description: 'Seamless thermo-bonded TPU exoskeletal frame providing lateral containment without rigid pressure points.',
    position: { x: 54, y: 42 }
  },
  {
    id: 'foam',
    name: 'RESPONSIVE FOAM',
    category: 'Midsole Core',
    description: 'Supercritical nitrogen-infused foam matrix returning 82% kinetic rebound on every transition.',
    position: { x: 62, y: 64 }
  },
  {
    id: 'rubber',
    name: 'PRECISION RUBBER',
    category: 'Outsole Pods',
    description: 'High-traction bio-rubber compound engineered with computational chevron micro-siping.',
    position: { x: 26, y: 72 }
  }
];

export const ENGINEERING_ANNOTATIONS: EngineeringAnnotation[] = [
  {
    id: 'heel',
    title: 'HEEL STRUCTURE',
    description: 'Sculpted anatomical carbon counter locking the calcaneus with zero friction.',
    anchor: { x: 74, y: 44 },
    lineVector: { dx: 45, dy: -30 }
  },
  {
    id: 'sole',
    title: 'SOLE GEOMETRY',
    description: 'Decoupled forefoot rocker geometry facilitating natural metatarsal roll.',
    anchor: { x: 30, y: 68 },
    lineVector: { dx: -40, dy: 30 }
  },
  {
    id: 'laces',
    title: 'LACE SYSTEM',
    description: 'Internal asymmetric webbed eyelets distributing tension across the dorsal ridge.',
    anchor: { x: 48, y: 32 },
    lineVector: { dx: 20, dy: -45 }
  },
  {
    id: 'traction',
    title: 'TRACTION PATTERN',
    description: 'Parametric directional siping adapting to dry and wet urban pavement surfaces.',
    anchor: { x: 20, y: 60 },
    lineVector: { dx: -45, dy: -25 }
  },
  {
    id: 'cushion',
    title: 'CUSHIONING AREA',
    description: 'Dual-density nitrogen cell compound dampening impact while maintaining road feel.',
    anchor: { x: 60, y: 62 },
    lineVector: { dx: 35, dy: 35 }
  }
];

export const STORYBOARD_FRAMES: StoryboardFrame[] = [
  {
    id: 'f1',
    title: '01 / STUDIO PROFILE',
    subtitle: 'Pure aerodynamic form language',
    image: heroImg,
    focalPoint: 'Profile silhouette'
  },
  {
    id: 'f2',
    title: '02 / CLOSE-UP MACRO',
    subtitle: 'Ultrasonic bonded seam precision',
    image: macroImg,
    focalPoint: 'Technical knit texture'
  },
  {
    id: 'f3',
    title: '03 / SOLE DYNAMICS',
    subtitle: 'Decoupled traction pods & carbon shank',
    image: soleImg,
    focalPoint: 'Computational grip matrix'
  },
  {
    id: 'f4',
    title: '04 / LAYER MATRIX',
    subtitle: '4-layer modular disassembly',
    image: explodedImg,
    focalPoint: 'Exploded depth architecture'
  },
  {
    id: 'f5',
    title: '05 / URBAN KINETICS',
    subtitle: 'Engineered for high-tempo urban motion',
    image: motionImg,
    focalPoint: 'Dynamic architecture'
  },
  {
    id: 'f6',
    title: '06 / SILVER EDITION',
    subtitle: 'High-reflectivity metallic weave',
    image: silverImg,
    focalPoint: 'Titanium counter'
  },
  {
    id: 'f7',
    title: '07 / HERO FINALE',
    subtitle: 'AERON 01 — Built to Move',
    image: heroImg,
    focalPoint: 'Final conversion'
  }
];

export const SIZES = [39, 40, 41, 42, 43, 44, 45];

export const PRODUCT_SPECS = [
  { label: 'PRICE', value: '$340 USD', detail: 'Includes luxury dust bag & express delivery' },
  { label: 'WEIGHT', value: '285g', detail: 'Per shoe (Sample size EU 42)' },
  { label: 'UPPER MATERIAL', value: 'AeroKnit™ Mono-Weave', detail: '100% recycled technical yarn' },
  { label: 'MIDSOLE', value: 'Supercritical Nitrogen Cell', detail: 'High-rebound dynamic response' },
  { label: 'CHASSIS', value: '3K Carbon Fiber Torsion Shank', detail: 'Torsional rigidity & energy transfer' },
  { label: 'OUTSOLE', value: 'High-Traction Bio-Rubber', detail: 'Zonal chevron micro-siping' },
  { label: 'STACK HEIGHT', value: '28mm Heel / 20mm Forefoot', detail: '8mm drop for natural biomechanics' },
  { label: 'SKU / EDITION', value: 'AER-01-V4-SPEC', detail: 'Numbered limited production run' }
];
