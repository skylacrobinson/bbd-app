export default function Instructions() {
  return (
    <div className="instructions">
        <p>*Built for Chrome at 1080p width*</p>
      <h3>-User Guide-</h3>
      
      <ul>
    
        <li><p className="header">Tile Navigation</p></li>
        <ul>
            <li>Use the left and right arrow keys to navigate through the tiles.</li>
            <li>Press the spacebar to select a tile and view its details.</li>
            <li>If a tile is focused for more than 2 seconds, it will automatically switch to video playback mode if a video is available.</li>
            <li>If you lose tile focus while on the page, use the tab key or refresh to return focus to the tile row.</li>

        </ul>
      
     
    
    <li><p className="header">Collection Navigation</p></li>
        <ul>
        <li> Use the up and down arrow keys to navigate through the collections.</li> 
        <li>Once you reach the end of the collection, they will loop back to the beginning and vice versa.</li> 
        </ul>
    <li><p className="header">Modal Navigation</p></li>
    <ul>
        <li>
            When the modal is open, use the spacebar or enter key to close it and return focus to the current tile.
        </li>
    </ul>
      </ul>
    </div>
  );
}