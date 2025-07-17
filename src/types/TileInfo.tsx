
interface ImageInner{
            default:{
                masterId?:string
                masterHeight?:number
                masterWidth?:number
                url:string
            }
       
    
}
type ImageType=Record<string,ImageInner>
type ImageProps=Record<string,ImageType>;

interface Image{
tile:ImageProps, 
title_treatment_layer:any, 
title_treatment: ImageProps, 
background:ImageProps, 
background_details: any
}

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
type PossibleKeys="program"|"series"|"collection"|string
type RecordType=Record<PossibleKeys, Series>
export interface TileInfo{
callToAction: null
contentId: string
currentAvailability:{
    region: string,
    kidsMode:boolean
}
encodedSeriesId: string
image: Image
mediaRights:{
    downloadBlocked:boolean 
    pconBlocked:false
}
ratings: Ratings[]
releases:Releases[] 
seriesId:string 
tags: any[]
text:{
    title:{
       full:RecordType 
       slug:RecordType
    }
}
textExperienceId:string
type:string 
videoArt: VideoArt[]
conentType?:string
family?:any
groups?:any[]
programId?:string
programType?:string
}