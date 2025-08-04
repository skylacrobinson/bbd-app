import { Fragment, KeyboardEvent, useEffect, useRef, useState } from "react";
import ModalDetails from "./ModalDetails";
import TileRow from "./TileRow";
import { useAppContext } from "../context/AppContext";


/**
 * Hello Browser Based Devices Team! Welcome to my take-home project. I hope you find it engaging and well-executed :)
 * -Skyla Robinson
 * 
 * MainContent component provides the main interactive content area for navigating collections and tiles.
 *
 * This component manages keyboard interactions for horizontal and vertical navigation
 * through a set of collections and their tiles. It supports features similar to a remote control such as focus
 * management, arrow navigation, and selection by key interaction.
 * 
 * Features:
 * - Horizontal navigation between tiles using ArrowLeft, ArrowRight.
 * - Vertical navigation between collections using ArrowUp and ArrowDown keys.
 * - Opens a modal dialog with tile details on spacebar press.
 * - Prevents unwanted horizontal scrolling with mouse wheel or trackpad.
 * - Automatically scrolls and focuses the current tile on navigation.
 * - Integrates with a context provider for managing collection and tile state.
 * - Supports video playback when a tile is focused for more than 2 seconds.
 * 
 * @returns {JSX.Element} The rendered main content area with navigation and modal support.
 */

export default function MainContent(){

  const [open, setOpen]=useState(false); //Manage modal open state

  const {
    data,
    currentCollectionIndex,
    setCurrentCollectionIndex, 
    currentTileIndex, 
    setCurrentTileIndex,
    setCurrentTileData,
  }=useAppContext(); //Retrieve context values for data, current collection and tile indices, and functions to update them

  const containerRef = useRef<HTMLDivElement>(null); // Reference to the tile row container

  const handleClose=()=>{
    // Close the modal and reset the current tile data and return focus to the current tile
    setOpen(false);
    setCurrentTileData(null);
    const node = containerRef.current?.childNodes[currentTileIndex] as HTMLElement | undefined;
    if (node) {
      node.focus({ preventScroll: true });
    }
  }  

  useEffect(() => {
    // Add wheel event listener to the containerRef
    // This prevents horizontal scrolling when using a mouse wheel or trackpad
    
    const element = containerRef.current;
    if (containerRef.current) {
      element?.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (element) {
        element.removeEventListener('wheel', handleWheel, false);
      }
    }
  },[]);

  useEffect(() => {
        // Scroll to the current tile and focus tile when the currentTileIndex or currentCollectionIndex changes
        (containerRef?.current?.childNodes?.[currentTileIndex] as HTMLElement).scrollIntoView({
            block: "nearest",
            inline: "start",
            behavior: "smooth"
          });
        (containerRef?.current?.childNodes?.[currentTileIndex] as HTMLElement).focus({preventScroll:true})
  
  }, [currentTileIndex, currentCollectionIndex]);

 
const collectionCount = data?.containers?.length ?? 0;

/**
 * Handles horizontal keyboard navigation (Tab, ArrowRight, ArrowLeft) for a container of focusable tiles.
 *
 * - 'Tab': Prevents default tabbing and focuses the current tile without scrolling.
 * - 'ArrowRight': Moves focus to the next tile, wrapping to the first tile if at the end.
 * - 'ArrowLeft': Moves focus to the previous tile, wrapping to the last tile if at the beginning.
 * 
 *
 * @param e - The keyboard event triggered on the container element.
 */
const handleHorizontalPress = (e: KeyboardEvent<HTMLDivElement>) => {
  if (containerRef.current?.childNodes) {
        if (e.key === 'Tab') {
          e.preventDefault();
          e.stopPropagation();
          (containerRef?.current?.childNodes?.[currentTileIndex] as HTMLElement).focus({preventScroll:true})
        };
        if (e.key === "ArrowRight") {
          e.preventDefault();
          e.stopPropagation();
          // If the current tile index is the last tile, wrap around to the first tile
          // Otherwise, increment the index
          // This allows for circular navigation through the tiles
          if (currentTileIndex === containerRef?.current?.childNodes.length - 1) {
            
            setCurrentTileIndex(0)
  
          } else {
            setCurrentTileIndex((prev)=>prev+1)
          }
        }
  
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          e.stopPropagation();
          // If the current tile index is 0, wrap around to the last tile
          // Otherwise, decrement the index
          // This allows for circular navigation through the tiles
          if (currentTileIndex === 0) {
            setCurrentTileIndex(containerRef?.current?.childNodes.length - 1)
          } else {
            setCurrentTileIndex((prev)=>prev-1)

          }
        }
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          e.preventDefault();
        }
     }
  };

  /**
   * Handles vertical keyboard navigation and actions within a view element.
   * 
   * This function listens for specific key events (`ArrowDown`, `ArrowUp`, and spacebar)
   * and updates the current collection and tile indices accordingly. It also triggers
   * a view transition using the `startViewTransition` API if available.
   *
   * - `ArrowDown`: Moves to the next collection, wrapping to the first if at the end.
   * - `ArrowUp`: Moves to the previous collection, wrapping to the last if at the start.
   * - `Spacebar`: Opens a modal or dialog by setting `open` to true and stops event propagation.
   *
   * @param e - The keyboard event triggered on a div element.
   */
  const handleVerticalPress=(e:KeyboardEvent<HTMLDivElement>)=>{
    const viewElement = document.querySelector('.view');
    if (viewElement && (document as any).startViewTransition) {
        (document as any).startViewTransition({
          update:() => {
            if (e.key === 'ArrowDown') {
                  if (currentCollectionIndex === collectionCount - 1) {
                      setCurrentCollectionIndex(0)
                  }else{
                      setCurrentCollectionIndex(prev=>prev+1) 
                  }
                      setCurrentTileIndex(0)
            } 
            if (e.key === 'ArrowUp') {
              if (currentCollectionIndex === 0 || currentCollectionIndex === -1) {
                  
                setCurrentCollectionIndex(collectionCount -1)
              } else {
                setCurrentCollectionIndex((prev)=>prev-1)
              }
                setCurrentTileIndex(0)
            } 
            if (e.key === ' ') {
                  e.stopPropagation();
                  setOpen(true);
            }
          },
          types:['none', e.key, ]
      });
    }
  }  

/**
 * Handles the wheel event and prevents the default horizontal scroll behavior
 * when a horizontal scroll (deltaX) is detected.
 *
 * @param e - The event object, expected to be a WheelEvent.
 */
const handleWheel = (e: Event) => {
    const wheelEvent = e as WheelEvent;
    if (wheelEvent.deltaX !== 0) {
      wheelEvent.preventDefault();
    }
  };


  /**
   * Handles key press events on a div element, delegating to horizontal or vertical
   * press handlers based on the key pressed.
   *
   * - For "ArrowLeft", "ArrowRight", or "Tab" keys, calls `handleHorizontalPress`.
   * - For "ArrowDown", "ArrowUp", or space (" ") keys, calls `handleVerticalPress`.
   *
   * @param e - The keyboard event triggered by a key press on the div element.
   */
  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {

    if (
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "Tab"
    ){
        handleHorizontalPress(e);
      
    }
      if (
        e.key === "ArrowDown" ||
        e.key === "ArrowUp" ||
        e.key === " "
      ) {
        handleVerticalPress(e);
  }
  return;
    
  };     
  return(
    <Fragment>
      { open && <ModalDetails open={open} onClose={handleClose}/>} {/*Render modal if open*/}
      <div className="view"  onMouseDown={(e) => { e.preventDefault(); }}> {/*Prevents default anchor behavior*/}
            <h4 className="collection-title"> {data?.containers?.[currentCollectionIndex]?.set?.text?.title?.full?.set?.default?.content}</h4>
      <div className="tile-row" ref={containerRef} role='generic'  onKeyUp={handleKeyPress} > 
          <TileRow/>
      </div>
      </div>
      </Fragment>
  )

}



