import { Fragment } from "react/jsx-runtime";
import Tile from "./Tile";
import { useAppContext } from "../context/AppContext";


/**
 * TileRow component renders a row of tiles based on the current collection index from the app context.
 * It maps over the items in the current collection and renders a Tile component for each item.
 *
 * @returns React component displaying a row of tiles.
 */

export default function TileRow() {
    const {currentCollectionIndex, data}=useAppContext()
    return (
        <Fragment>
            {data?.containers[currentCollectionIndex].set.items.map((item, index) =>  (
                    <Tile key={item.contentId||item.collectionId} index={index} {...item}></Tile>
                )
            )}
        </Fragment>
    );
}