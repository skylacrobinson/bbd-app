import { TileInfo } from "../types/TileInfo";

/**
 * Retrieves additional details from the TileInfo object.
 * This function is used to extract more details from the TileInfo object, such as rating,
 * year of release, and tags.
 * @param data - The TileInfo object containing various properties.
 * @returns An object containing rating, year, and tags extracted from the TileInfo.
 */

export function getMoreDetails(data: TileInfo) {

const rating=data?.ratings?.[0].value;
const year=data?.releases?.[0].releaseYear;
const tags=data?.tags?.filter(tag => tag.value==='true')?.map(tag => tag.type);



    return {rating, year, tags};

}