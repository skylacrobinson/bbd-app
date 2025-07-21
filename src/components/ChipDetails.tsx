import { useConvertCase } from "../hooks-utils/useConvertCase";
import { getMoreDetails } from "../hooks-utils/useGetMoreDetails";
import { TileInfo } from "../types/TileInfo";


function Chip({ label }: { label: string }) {
    return(
        label && label.length>0 && 
        <div className="chip">
            <div className="chip-label">{label}</div>
        </div>
    )
}
/**
 * Displays additional details for a given tile, such as rating, year, and tags, using Chip components.
 * 
 * - Tags are displayed as individual chips with case conversion applied.
 * - Only non-empty tags are rendered.
 * - The component expects `getMoreDetails` and `useConvertCase` utilities to be available in scope.
 * 
 * @param data - The tile information object containing details to display.
 * @returns React element rendering a row of chips for each detail (rating, year, tags).
 *
 * 
 * 
 */
export default function ChipDetails({ data }: { data: TileInfo }) {
    const details = getMoreDetails(data); // Retrieves additional details like rating, year, and tags

    return (
        <div className="chip-row">
           {details &&
           Object.entries(details)?.map(([key, value]) => {
                if (key === "tags" && Array.isArray(value) && value.length > 0) {
                    return (
                        <div key={key} className="chip-tags">
                            {value?.map((tag, index) => {
                                if (tag){
                                    const newTag=useConvertCase(tag)
                                    return(
                                        <Chip key={index} label={newTag} />
                                    )
                                }
                            })}
                        </div>
                    );
                } else if (key === "rating" || key === "year") {
                    return (
                        <Chip label={value as string} key={key}></Chip>
                        
                    );
                }
                return null;
            })}
        </div>
    );
}