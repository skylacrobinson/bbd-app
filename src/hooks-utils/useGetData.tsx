import { useEffect, useState } from "react"
import { TileInfo } from "../types/TileInfo"

export interface Response{
    calltoAction: any,
    collectionGroup:CollectionGroup
    collectionId:string
    containers:Containers[]
    image:any
    text:any
    type:string
    videoArt:[]
}

interface Data {
    StandardCollection:Response 

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
    // return json.data.StandardCollection as Response;
    
  } catch (error) {
    console.error(error);
    setError('An error occured.');
  } finally{
    setLoading(false);
  }
}
getData();
  },[]);
  return {data, loading, error};
}