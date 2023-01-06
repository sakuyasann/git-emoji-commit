export const CharacterCount = (text: string): number => {
  // @ts-ignore
  const segmenter = new Intl.Segmenter('ja', { granularity: 'grapheme' })
  return [...segmenter.segment(text)].length
}
