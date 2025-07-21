import { TileInfo } from "../types/TileInfo";

/**
 * Renders a video playback component with overlay text.
 * Features:
 * - The video is set to autoplay, loop, and play inline without sound.
 * - The overlay text is positioned at the bottom-left corner of the video.
 * 
 * @param videoArt - An array of video art objects, where the first item's mediaMetadata contains the video URL.
 * @param text - The text to display as an overlay on the video.
 *
 *.
 */
export function VideoPlayback({ videoArt, text }: { videoArt: TileInfo['videoArt'], text:string }) {
    const video = videoArt?.[0]?.mediaMetadata.urls?.[0]?.url || '';
    return (
        <div>
        <div className="video-text" style={{
            position: "absolute",
            bottom: 8,
            left: 8,
            zIndex: 2,
            
        }}>
            {text}
        </div>
        <video width={'100%'} autoPlay muted preload="auto" src={video} className="tile-video" loop playsInline/>
        </div>
    );
}