export type ImageFit = "cover" | "contain" | "stretch";
export type ImageLayer = "behind" | "infront";

export type FontSize = "sm" | "md" | "lg" | "xl";

export interface SlideData {
  title: string;
  content: string;
  notes?: string;
  layout?: string;
  image_url?: string;
  image_fit?: ImageFit;
  image_layer?: ImageLayer;
  font_size?: FontSize;
  title_color?: string;
  content_color?: string;
}
