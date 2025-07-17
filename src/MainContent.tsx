import { Fragment, useEffect, useRef, useState } from "react";
import Tile from "./components/Tile";
import { Response, useGetData } from "./services/getData"


// const flattenObj=(obj:any):any =>{
//     let resultObj:any ={};
//     for (const i in obj){
//         if typeof
//     }
// }


export default function MainContent(props: { data: Response; }){
  const {data}=props
    const [currentCollection, setCurrentCollection]=useState(0);
    const containerRef = useRef<HTMLDivElement>(null)
        console.log(data)  
        
   const container=document.querySelector(".tile-container");
const collectionElements=container?.querySelectorAll("a");
console.log(container, collectionElements)

function getRef(){
    useEffect(()=>{
  let focusedIndex=0
      
    if (containerRef.current){
      const container=containerRef.current;
      const collectionElements=containerRef.current?.childNodes;
      console.log('Ref found:', containerRef.current)
      console.log(containerRef.current?.childNodes)
    const handleKeyPress = (e:KeyboardEvent) => {
  if (collectionElements){
  if (e.key === "ArrowRight") {
    if (focusedIndex === collectionElements.length - 1) {
      focusedIndex = 0;
    } else {
      focusedIndex++;
    }
  }

  if (e.key === "ArrowLeft") {
    if (focusedIndex === 0 || focusedIndex === -1) {
      focusedIndex = collectionElements.length - 1;
    } else {
      focusedIndex--;
    }
    }
     if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
    const selected = collectionElements[focusedIndex];

    e.preventDefault();
    (selected as HTMLElement).scrollIntoView({
      block: "nearest",
      inline: "start",
      behavior: "smooth"
    });
    (selected as HTMLElement).focus({ preventScroll: true });
  }
 }
}
 const initKeyboardControl = () => {

  collectionElements?.forEach((child, index) => {
    const element = child as HTMLElement;
    if (index === 0) {
      element.setAttribute("tabIndex", '0');
    } else {
      element.setAttribute("tabIndex", '-1');
    }
  });
  // container?.setAttribute("tabIndex", '0');
  document?.addEventListener("keydown", (e:KeyboardEvent) => handleKeyPress(e));
  container?.setAttribute("aria-describedby", "projects-focus-text");
 };
initKeyboardControl();
    }
    },[])
    
    return containerRef.current
}
getRef()


  const collections=data?.containers||[]

  let focusedIndex=0

    
 
  const handleKeyPress = (e:KeyboardEvent) => {
  if (collectionElements){
  if (e.key === "ArrowRight") {
    if (focusedIndex === collectionElements.length - 1) {
      focusedIndex = 0;
    } else {
      focusedIndex++;
    }
  }

  if (e.key === "ArrowLeft") {
    if (focusedIndex === 0 || focusedIndex === -1) {
      focusedIndex = collectionElements.length - 1;
    } else {
      focusedIndex--;
    }
    }
     if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
    const selected = collectionElements[focusedIndex];

    e.preventDefault();
    selected.scrollIntoView({
      block: "nearest",
      inline: "start",
      behavior: "smooth"
    });
    selected.focus({ preventScroll: true });
  }
 }
}
  
  
  const initKeyboardControl = () => {

  collectionElements?.forEach((child, index) => 
    {if (index===0){
      child.setAttribute("tabIndex", '0')
    }else{
    child.setAttribute("tabIndex", '-1')}});
  document?.addEventListener("keydown", (e:KeyboardEvent) => handleKeyPress(e));
  container?.setAttribute("aria-describedby", "collection-text");
 };
initKeyboardControl();


const collectionRef=useRef(0)


document.addEventListener('wheel', (event: WheelEvent) => {
  if (event.deltaX !== 0) { // Check if horizontal scroll is occurring
    event.preventDefault(); // Prevent default horizontal scrolling behavior
  }
}, { passive: false }); // Use passive: false to allow preventDefault()
function refUp(){
  collectionRef.current++;
}

const handleDownPress=(event: KeyboardEvent)=>{
   const viewElement = document.querySelector('.view');
    if (viewElement && (document as any).startViewTransition) {
      (document as any).startViewTransition({
        update:() => {
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    console.log('Down arrow key pressed!');
    // Add your desired logic here
   
      // The state update will trigger the React re-render
    
    collectionRef.current<collections.length-1 
    ? 
    collectionRef.current++ 
    : 
    collectionRef.current=0;
    // console.log('Current collection:', collectionRef.current);
    setCurrentCollection(collectionRef.current);
    
  } else if (event.key === 'ArrowUp') {
    event.preventDefault();
    console.log('Up arrow key pressed!');
    // Add your desired logic here
    collectionRef.current > 0
      ? collectionRef.current--
      : collectionRef.current = collections.length - 1;
    // console.log('Current collection:', collectionRef.current);
    setCurrentCollection(collectionRef.current);
  } },
  types:['none', event.key]
 });
    }
}
// const listener=document.addEventListener('keyup', (event: KeyboardEvent) => handleDownPress(event));
useEffect(()=>{
  document.addEventListener('keyup', handleDownPress);
  return () => {
    // Cleanup the event listener when the component unmounts
    document.removeEventListener('keyup', handleDownPress);
  };
}, [collectionRef.current]);

            
    return(
        <div className="view">
         
        

          
              <h4 className="collection-title">
                        {collections[currentCollection].set.text.title.full.set.default.content}
                        </h4>
          <div className="tile-row" ref={containerRef}>
            
            {collections[currentCollection].set.items.map((item, index)=>{
                    return(
                        <Tile key={index} index={index} {...item}></Tile>
                    )
                })}
          </div>
        
        
        </div>
    )

}
function TileContainer(props: { collection: any; }){
    
    return(
      <div>
        <h4 className="collection-title">{}</h4>
      </div>
    )

}