import { TileInfo } from "../types/TileInfo";
const aspectRatio = 1.78; // Default aspect ratio

export function useGetDisplay(image: TileInfo['image'], text: TileInfo['text']) {
  // Retrieves the display content, including background image, title text, and tile image.
  const sizes = Object.keys(image.tile || {});
  const firstSize= sizes[0];
  const contentType = Object.keys(image.tile[firstSize] || {})[0];
  const overlayType=contentType==='collection'||contentType==='default'?'logo_layer':'title_treatment';
  const tileImage = image.tile[aspectRatio||firstSize][contentType]?.default?.url || '';
  const backgroundDetails =
    image?.background_details?.[aspectRatio]?.[contentType]?.default?.url ||
    image?.background?.[aspectRatio]?.[contentType]?.default?.url ||
    image?.hero_collection?.[aspectRatio]?.[contentType]?.default?.url ||
    '';// Fallback to the first available background image if specific details are not found
  const titleText=text?.title?.full?.[contentType]?.default?.content ||text?.title?.full?.collection?.default?.content|| '';
  const titleLayer= image?.[overlayType]?.[aspectRatio]?.[contentType]?.default?.url ||image?.logo?.['2.00']?.[contentType]?.default?.url ||  '';
  return { firstSize, contentType, sizes, backgroundDetails, tileImage, titleLayer, titleText };
}
