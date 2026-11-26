export type PortfolioTab = 'all' | 'photography' | 'graphic-design';

export interface PhotoItem {
  id: string;
  title: string;
  category: 'portrait' | 'event' | 'street' | 'low-light';
  imageUrl: string;
  description: string;
  camera: string;
  lens: string;
  settings: {
    aperture: string;
    shutter: string;
    iso: string;
    focalLength: string;
  };
  year: string;
  aspectRatio: 'landscape' | 'portrait' | 'square';
  focalPoint?: string;
}

export interface DesignProject {
  id: string;
  title: string;
  client: string;
  category: 'branding' | 'social-media' | 'print' | 'merch';
  imageUrl: string;
  description: string;
  tools: string[];
  deliverables: string[];
  year: string;
  colorPalette?: string[];
}
