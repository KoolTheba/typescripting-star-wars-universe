export const removeSpaces = (str: string) => str.replace(/\s{2,}/g, " ").trim();

export const removeSpecialChars = (str: string) =>
  str.replace(/[^a-zA-Z0-9 ]/g, "");
