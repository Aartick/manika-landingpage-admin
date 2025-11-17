export function slugify(text: string) {
  if (!text) return "";
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-");
}
