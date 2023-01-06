import { atom } from 'recoil'
import { DeepLLang } from '../hooks'
import { I18LangType } from './i18'

export interface SettingProps {
  lang: I18LangType
  isTranslate: boolean
  translateKey: string
  translatePlan: 'free' | 'premium'
  translateTarget: DeepLLang
}

export const SettingStore = atom<SettingProps>({
  key: 'SettingStore',
  default: {
    lang: 'en',
    isTranslate: false,
    translateKey: '',
    translatePlan: 'free',
    translateTarget: 'JA',
  },
})
