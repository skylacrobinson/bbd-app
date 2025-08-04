
  // Inserts a space before each uppercase letter that is preceded by a lowercase letter
  // and convert the first letter of the result to uppercase if it's not already.
  
export function convertCase(string:string) {

  return string
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between camel case words
    .replace(/^./, (match) => match.toUpperCase()); // Capitalize the first letter
}