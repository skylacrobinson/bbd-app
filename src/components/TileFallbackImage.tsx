/**
 * Renders a fallback image placeholder component displaying the provided title.
 *
 * @param title - The text to display inside the placeholder.
 * @returns React element representing the fallback image placeholder.
 */

export function FallbackImage({title}: {title: string}) {
    return(
        <div className="tile-image-placeholder">
                <div className="tile-image-placeholder-text">
                    {title}
                </div>
            </div>
    )
}