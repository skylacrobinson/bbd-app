import { Fragment, KeyboardEvent, useEffect, useRef } from "react";
import BackgroundDetails from "./BackgroundDetails";
import { TileInfo } from "../types/TileInfo";
import { useAppContext } from "../context/AppContext";
import ChipDetails from "./ChipDetails";
import useFocusTrap from "../hooks-utils/useFocusTrap";



interface ModalDetailsProps {
    open: boolean;
    onClose: () => void;
  
}

/**
 * ModalDetails is a modal component that displays detailed information about a selected tile
 * from the application's data context. It handles keyboard navigation (Escape, Enter, or Spacebar to close)
 * and traps focus when open.
 *
 * Features:
 * - Displays background details and chips for the selected tile.
 * - Uses `useAppContext` to access application data and selection indices.
 * - Focuses the close button and traps focus when the modal is open.
 * - Renders `BackgroundDetails` and `ChipDetails` for the selected tile.
 * 
 * @param {boolean} props.open - Controls whether the modal is open or closed.
 * @param {() => void} props.onClose - Callback function to close the modal.
 *
 * @returns {JSX.Element} The rendered modal details component.
 *
 
 */
export default function ModalDetails({ open, onClose }: ModalDetailsProps) {
    const {data, currentCollectionIndex, currentTileIndex}=useAppContext();
    const tileData= data && data.containers[currentCollectionIndex].set.items[currentTileIndex]
    const focusRef = useRef<HTMLButtonElement>(null);
    const handleClose = (e: KeyboardEvent<Element>) => {
        if(open){
        };
        if (e.key === 'Escape') {
            onClose();
        
        }else if (e.key==='Enter'){
         e.stopPropagation();

        }
    }
    useEffect(() => { // Focus the close button when the modal opens and initialize focus trap
        if(open){
            focusRef.current?.focus();
            useFocusTrap();
        }

    }, [open])
   
 
    return (
        <div className="modal-overlay"  onKeyDown={handleClose} >
            <div className="modal-background" >
                <div className="modal" >
                    <button className="modal-button" onClick={onClose} onKeyDown={handleClose} ref={focusRef} tabIndex={0}>
                        <span>
                            <svg  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                                <path d="M15 18l-6-6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                            </svg> {/* Back Icon SVG */} 
                        </span>
                        <p>Back</p>
                    </button>

                    {tileData && (
                        <Fragment>
                            <BackgroundDetails data={tileData} />
                            <ChipDetails data={tileData} />
                        </Fragment>
                    )}

                </div>
            </div>
        </div>
    );
}