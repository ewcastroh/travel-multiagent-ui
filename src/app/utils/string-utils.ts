export function stringToList(inputString: string, separator: string): string[] {
  const trimmedString = inputString.startsWith('[') && inputString.endsWith(']')
    ? inputString.slice(1, -1)
    : inputString;

  const stringArray = trimmedString.split(separator);
  const cleanedArray = stringArray.map(str => {
    let trimmedStr = str.trim();
    if (trimmedStr.endsWith(',')) {
      trimmedStr = trimmedStr.slice(0, -1).trim();
    }
    return trimmedStr;
  });
  return cleanedArray;
}
