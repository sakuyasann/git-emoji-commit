import { useMemo } from 'react'
import { I18LangType } from '../stores'

export interface I18_TEXT_type {
  [x: string]: {
    [x in I18LangType]: string
  }
}

interface I18_Response {
  [x: string]: string
}

export const useI18Text = (data: I18_TEXT_type, lang: I18LangType = 'en') => {
  const text = useMemo(() => {
    let res: I18_Response = {}
    Object.keys(data).forEach((key) => {
      res[key] = data[key][lang]
    })

    return res
  }, [lang, data])

  return { text }
}
