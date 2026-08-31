export interface Colorway {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  hex: string;
  accentHex: string;
  image: string;
  description: string;
}

export interface SpecificationItem {
  label: string;
  value: string;
  detail?: string;
}

export interface MaterialDetail {
  id: string;
  name: string;
  category: string;
  description: string;
  position: { x: number; y: number };
}

export interface DisassemblyLayer {
  id: string;
  name: string;
  depth: string;
  description: string;
  offsetY: number;
}

export interface EngineeringAnnotation {
  id: string;
  title: string;
  description: string;
  anchor: { x: number; y: number }; // Percentage in viewport
  lineVector: { dx: number; dy: number };
}

export interface StoryboardFrame {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  focalPoint: string;
}

export interface CartItem {
  id: string;
  colorway: Colorway;
  size: number;
  quantity: number;
  unitPrice: number;
}
