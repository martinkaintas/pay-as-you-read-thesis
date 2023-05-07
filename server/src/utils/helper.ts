export function getParagraphText(paragraphIdx?: number): string {
  return `${paragraphIdx ? '' : 'next'} paragraph ${paragraphIdx ? paragraphIdx : ''} `
}