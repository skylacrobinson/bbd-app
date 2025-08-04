import { convertCase } from "../hooks-utils/convertCase";
import { getMoreDetails } from "../hooks-utils/getMoreDetails";
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
 * - The component expects `getMoreDetails` and `convertCase` utilities to be available in scope.
 * 
 * @param data - The tile information object containing details to display.
 * @returns React element rendering a row of chips for each detail (rating, year, tags).
 *
 */
export default function ChipContainer({ data }: { data: TileInfo }) {
    const details = getMoreDetails(data); // Retrieves additional details that will be displayed in the modal like rating, year, and tags

    return (
        <div className="chip-row">
           {details &&
           Object.entries(details)?.map(([key, value]) => { //Creates an array of key-value pairs from the details object
                if (key === "tags" && Array.isArray(value) && value.length > 0) {  // Checks if the key is 'tags' and if value is an array with length greater than 0
                    //Takes the tags array and maps over it to create a Chip for each tag
                    return (
                        <div key={key} className="chip-tags">
                            {value?.map((tag, index) => {
                                if (tag){
                                    const newTag=convertCase(tag) // Converts the tag to a more readable format from camelCase to Title Case
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