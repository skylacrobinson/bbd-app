import React, { HTMLProps, ReactNode, useState } from "react";
import { TileInfo } from "../types/TileInfo";
import { TileImage } from "./TileImage";

function FallbackImage(props:{title: string}) {
    return(
        <div className="tile-image-placeholder">
                <div className="tile-image-placeholder-text">
                    {props.title}
                </div>
            </div>
    )
}
interface TileProps extends TileInfo {
    index: number;
}
export default function Tile(props:TileProps) {
    
    const sizes=Object.keys(props.image.tile||{})
    const firstKey = sizes[0]
    const type=Object.keys(props.image.tile[firstKey]||{})[0]
    const textType=Object.keys(props.text.title.full||{})[0]
 


    const tileImage=props.image.tile[1.78][type].default.url
   const title=props.text.title.full[textType].default.content
   return(
        <a 
        className="tile" 
        aria-label={`${title} Select for details on this title.`} 
        style={{animationDelay: `${props.index * 200}ms`, viewTransitionName: `tile ${props.index}`}}
        >
        <div className="tile-content">
            <TileImage
            src={tileImage}
            alt={title}
            className="tile-image"
            fallback={<FallbackImage title={title} />}
            ></TileImage>
            
         

        </div>
        </a>

    )
}