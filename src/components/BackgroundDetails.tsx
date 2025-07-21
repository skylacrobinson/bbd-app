import { Fragment } from "react/jsx-runtime";
import { useGetDisplay } from "../hooks-utils/useGetDisplay";
import { TileInfo } from "../types/TileInfo";
import useConvertToPNG from "../hooks-utils/useConvertToPNG";
import { TileImage } from "./TileImage";

// This component displays the background details for a tile, including the background image and title treatment.
// It uses the `useGetDisplay` hook to retrieve the necessary images and text

/**
 * Renders the details for a tile, including the background image and title treatment.
 *
 * @param data - The tile information object containing image and text data.
 * @returns A React component displaying the background image and title treatment if available.
 *
 * This component uses `useGetDisplay` to retrieve display content such as the background image, title layer, and title text.
 * It also uses `useConvertToPNG` to ensure the title treatment image is in PNG format for transparent backgrounds.
 */
export default function BackgroundDetails({ data }: { data: TileInfo }) {
   const { backgroundDetails, titleLayer, titleText } = useGetDisplay(data.image, data.text); // Retrieves the necessary display content like background image and title text
    const titlePNG = useConvertToPNG(titleLayer); // converts the title treatment URL to return PNG instead of JPEG
    return (
      <div className="background-details">
        <div className="background-container">
          {backgroundDetails ? (
            <Fragment>
              <TileImage
                src={backgroundDetails}
                alt={`${titleText ?? "Untitled"} background image`}
                className="background-image"
              />

              <div className="background-title-container">
                <TileImage
                  src={titlePNG || titleLayer}
                  alt={`${titleText ?? "Untitled"} title treatment`}
                  className="background-title"
                  text={<h2>{titleText ?? "Untitled"}</h2>}
                />
              </div>
            </Fragment>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
}
