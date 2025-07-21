
// This file defines the structure of TileInfo and related types

export interface Image {
  tile: ImageProps
  background?: ImageProps
  background_details?: ImageProps
  logo?: ImageProps
  logo_layer?: ImageProps
  
  title_treatment?: ImageProps
  hero_collection: ImageProps
  heroTile: ImageProps
}


export interface TileInfo{
callToAction: null
contentId: string
collectionId?: string
currentAvailability:{
    region: string,
    kidsMode:boolean
}
encodedSeriesId: string
image: Image
mediaRights:{
    downloadBlocked:boolean 
    pconBlocked:boolean
}
ratings: Ratings[]
releases:Releases[] 
seriesId?:string 
tags?: Tags[]
text:{
    title:{
       full:RecordType 
       slug:RecordType
    }
}
textExperienceId:string
type:string 
videoArt: VideoArt[]
contentType?:string
family?: unknown
groups?: unknown[]
programId?:string
programType?:string
}

type ImageProps={
    [aspectRatio: string]: {
      [contentType: string]: {
        default?: {
          url?: string;
        };
      };
    };
  };;

type Url={
    url:string
}
type Ratings={
    advisories:any[]
    description:string|null
    system: string
    value:string

}

type Releases={
    releaseDate:string
    releaseType:string
    releaseYear:string
}
interface Series{
    default:{
        content:string
        language:string
        sourceEntity:string
    }
}
interface VideoArt{
    mediaMetadata:{
        urls:Url[]
    }
    purpose:string 
}

interface Tags{
    value?:string
    type?:string
    displayName?:string|null

}

type PossibleKeys="program"|"series"|"collection"|string;

type RecordType=Record<PossibleKeys, Series>

