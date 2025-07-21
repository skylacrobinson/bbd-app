import React, { HTMLProps, ReactNode, useEffect, useState, } from "react";

type ImgProps = HTMLProps<HTMLImageElement> & {
 
  src: string;
  alt: string;
  text?:string|ReactNode;
  fallback?:  ReactNode;
}
function DefaultFallback({ children }: { children: ReactNode }) {
    return (
        <div className="image-placeholder">
            <div className="image-placeholder-text">
                {children}
            </div>
        </div>
    );
}

/**
 * Renders an image with error handling and fallback support.
 *
 * The `TileImage` component attempts to display an image from the provided `src`.
 * If the image fails to load, it displays a fallback element or a default placeholder with optional text.
 * The error state resets whenever the `src` prop changes.
 *
 * @param src - The source URL of the image.
 * @param alt - The alt text for the image.
 * @param fallback - Optional React node to display if the image fails to load.
 * @param text - Optional text to display in the default fallback placeholder.
 * @param props - Additional props to pass to the underlying `<img>` element.
 *
 * @returns The image element, a fallback, or a default placeholder if loading fails.
 */
export function TileImage({ src, alt, fallback, text, ...props }: ImgProps) {
    const [hasError, setHasError] = useState(false);
    useEffect(() => {
        //Detects if source has changed and resets the error state
        setHasError(false)
    }, [src]); 

  if (hasError) { 
    // If there is an error loading the image, return the fallback or a default placeholder
    return <>{fallback ||  
    <DefaultFallback>{text}</DefaultFallback>}</>;
  } 

  return (
    <img
      src={src}
      alt={alt}
      key={src}
      onError={() => {
          setHasError(true);
      }}
      {...props}
    />
  );
}