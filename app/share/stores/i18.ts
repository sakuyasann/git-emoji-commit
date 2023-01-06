import { atom } from 'recoil'

export type I18LangType = 'en' | 'ja'

export const I18LangStore = atom<I18LangType>({
  key: 'I18LangStore',
  default: 'en',
})
