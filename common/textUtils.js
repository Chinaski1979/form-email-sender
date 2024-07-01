import { capitalize } from "lodash";

export const cleanText = (text) => {
  if(!text) return '';
  const cleanedKey = text?.replace(/wf-form-/gi, "")?.replace(/[-_]/gi, " ");
  return capitalize(cleanedKey)
}