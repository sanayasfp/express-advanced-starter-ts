export function randomString(length: number, {
  startWith = '', endWith = '', lowercase = true, uppercase = true, numeric = true }: {
  startWith?: string; endWith?: string;
  lowercase?: boolean; uppercase?: boolean; numeric?: boolean;
} = {}) {
  const lowercaseCharacters = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numericCharacters = '0123456789';
  const characters = `${uppercase ? uppercaseCharacters : ''}${lowercase ? lowercaseCharacters : ''}${numeric ? numericCharacters : ''}`;
  const charactersLength = characters.length;
  length -= startWith.length + endWith.length;
  let result = startWith;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return result + endWith;
}
