export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function countWords(html: string) {
  const text = html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return text ? text.split(' ').filter(Boolean).length : 0
}

export function calcReadingTime(html: string) {
  return Math.max(1, Math.round(countWords(html) / 200))
}
