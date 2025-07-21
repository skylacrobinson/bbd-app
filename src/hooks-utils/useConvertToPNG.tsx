// Converts a given link to a PNG format by appending the appropriate query parameter.
export default function useConvertToPNG(link:string) { 
if (link) {
    const url= new URL(link);
    const urlParams = new URLSearchParams(url.search);
    urlParams.set('format', 'png');
    const newUrl = `${url.origin}${url.pathname}?${urlParams.toString()}`;
    return newUrl;
}return;
}
