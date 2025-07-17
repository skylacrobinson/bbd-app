import React, { HTMLProps, ReactNode, useState } from "react";

type ImgProps = HTMLProps<HTMLImageElement> & {
 
  src: string;
  alt: string;
//   @default null
  fallback?:  ReactNode;
}

export function TileImage({ src, alt, fallback, ...props }: ImgProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError && fallback) {
    return <>{fallback}</>;
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={(e) => {
        if (fallback) {
          setHasError(true);
        } else {
          e.currentTarget.src = "https://cdn.bamgrid.com/dp-7068675309/placeholder.png";
          e.currentTarget.alt = "Image not available";
        }
      }}
      {...props}
    />
  );
}