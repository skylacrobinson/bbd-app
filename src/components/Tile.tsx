import  { useEffect, useState } from "react";
import { TileInfo } from "../types/TileInfo";
import { TileImage } from "./TileImage";
import { getDisplayContent } from "../hooks-utils/getDisplayContent";
import { FallbackImage } from "./TileFallbackImage";
import { useAppContext } from "../context/AppContext";
import { VideoPlayback } from "./VideoPlayback";


interface TileProps extends TileInfo {
    index: number;
}
/**
 * Renders a selectable tile component that displays an image or video preview based on focus state.
 * 
 * The `Tile` component displays a tile with an image and text, and plays a video preview
 * when the tile is focused for a specified duration. It manages focus and blur events to control
 * the transition between image and video views, and ensures proper cleanup of timeouts to prevent
 * memory leaks. The component also integrates with application context to determine the currently
 * focused tile.
 * 

 * @param image - The image source or identifier for the tile.
 * @param text - The text label or title for the tile.
 * @param index - The index of the tile in the list/grid.
 * @param videoArt - An array of video sources or data for video preview.
 * 
 * @returns React element representing the tile, which displays either an image or a video preview
 *          depending on focus state and available video content.
 */
export default function Tile(props:TileProps) {
    const {image, text, index, videoArt} = props;
    const {titleText, tileImage}=getDisplayContent(image,text)
    const {currentTileIndex, currentCollectionIndex}= useAppContext();
   const [view, setView] = useState<'tile'|'video'>('tile');

   useEffect(()=>{
/**
 *  Ensures correct display when the focus handler does not trigger.
 *  If the current tile index matches the index of this tile, set the view to
 *  'video' after a delay if a video is available.
 *  Otherwise, clear the timeout and set the view to 'tile'.
 *  This allows the video to play when the tile is focused and stops it when
 *  the focus is lost.
 */
       if(videoArt.length > 0 && currentTileIndex === index){
           const timeoutId = setTimeout(() => {
                setView('video');
            }, 2000);
            // The timeout is stored on the window object to ensure it persists across renders.
            (window as any)._tileTimeoutId = timeoutId; 
       }
        // The timeout is cleared when the component unmounts or when the index changes
        // to prevent memory leaks and ensure the correct behavior.
        window.clearTimeout((window as any)._tileTimeoutId);
        setView('tile');
    return () => {
            window.clearTimeout((window as any)._tileTimeoutId);
        }
   },[currentTileIndex, currentCollectionIndex])

/**
 * Handles the focus event for the tile component.
 * 
 * If there is at least one video art item, sets a timeout to change the view to 'video' after 2 seconds,
 * and stores the timeout ID on the global `window` object for potential later use (e.g., clearing the timeout).
 * Regardless of the video art length, immediately sets the view to 'tile'.
 * 
 * The transition to video view occurs only if the tile is focused for more than 2 seconds,
 */
   const handleFocus=() => {
        if(videoArt.length > 0){
            const timeoutId = setTimeout(() => {
                setView('video');
            }, 2000);
            
            // Store timeoutId on the component instance
            (window as any)._tileTimeoutId = timeoutId;
        }
        setView('tile');
    }

/**
 * Handles the blur event for the tile component.
 * 
 * Clears any existing timeout stored in the global `_tileTimeoutId` property on the `window` object,
 * and resets the view state to 'tile'.
 * 
 * Used to revert the UI to its default tile view from video view when the component loses focus.
 */
   const handleBlur=() => {
        window.clearTimeout((window as any)._tileTimeoutId);
        setView('tile');
    }
   return(
        <a 
        className="tile" 
        role='link'
        tabIndex={-1}
        data-testid={`tile-${index}`}
        aria-label={`${titleText} Select for details on this title.`} 
        style={{animationDelay: `${index * 200}ms`, viewTransitionName: `tile ${index}`}}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseDown={(e) => {
            e.preventDefault(); // Prevents default anchor behavior
        }}>
            <div className="tile-content">
                {videoArt && videoArt.length > 0 && view === 'video'
                && <VideoPlayback videoArt={videoArt} text={titleText} />
                }
                { view === 'tile' && (
                    <TileImage
                    src={tileImage}
                    alt={titleText}
                    className="tile-image"
                    fallback={<FallbackImage title={titleText} />}
                    ></TileImage>)}
            </div>
        </a>

    )
}

