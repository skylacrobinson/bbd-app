import { useEffect, useState } from "react"
import { TileInfo } from "../types/TileInfo"

export interface Response{
    callToAction: any,
    collectionGroup:CollectionGroup
    collectionId:string
    containers:Containers[]
    image:any
    text:any
    type:string
    videoArt:[]
}


interface CollectionGroup{
    collectionGroupId: string
    contentClass: string
    key:string
    slugs:Slugs[]
   

}

interface Containers{
    set:Set
    style:string
    type:string
}
export interface Set{
    contentClass:string
    items:TileInfo[]
    meta:Meta
    setId:string
    text:any
    type:string
}

interface Meta{
    hits:number
    offset:number
    page_size:number
}
interface Slugs{
    language:string
    value:string
}

const url= 'https://cd-static.bamgrid.com/dp-7068675309/home.json'



/** Custom hook to fetch data from a given URL and return the response, loading state, and error state.
This hook uses the Fetch API to retrieve data from the specified URL and manages the loading and error
states internally.
 * @returns {Object} An object containing the fetched data, loading state, and error state.
 * - `data`: The fetched data from the URL.
 * - `loading`: A boolean indicating whether the data is currently being loaded.
 * - `error`: A string containing any error message that occurred during the fetch operation.
 */
export const useGetData=()=>{
  const [data, setData] = useState<Response>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(()=>{
   async function getData(){
    try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
   
    setData(json.data.StandardCollection as Response);
    
    
  } catch (error) {
    console.error(error);
    setError('An error occurred.');
  } finally{
    setLoading(false);
  }
}
getData();
  },[]);
  return {data, loading, error};
}