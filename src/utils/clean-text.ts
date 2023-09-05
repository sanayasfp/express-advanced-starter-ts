export function cleanText(text: string) {
  const cleanedText = text.trim().replace(/([ \t\r\n])\1+/g, '$1');
  return cleanedText;
}
