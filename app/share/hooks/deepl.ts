import { useEffect, useRef, useState } from 'react'

export type DeepLLang = 'EN-US' | 'JA'

interface DeepLSetting {
  key: string
  defaultTargetLang?: DeepLLang | string
  isPremium?: boolean
}

interface TranslateOption {
  targetLang: DeepLLang | string
  sourceLang?: DeepLLang | string
}

interface TranslateInput {
  text: string
  target_lang: string
  source_lang: string
  [x: string]: string
}

interface TranslateOutput {
  status: 200 | 400
  body?: {
    translations: {
      detected_source_language: string
      text: string
    }[]
  }
  errorMessage?: string
}

export const useDeepL = ({
  key,
  defaultTargetLang = 'EN-US',
  isPremium = false,
}: DeepLSetting) => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [debouncedKey, setDebouncedKey] = useDebouncedState(key, 1000)
  useEffect(() => {
    setDebouncedKey(key)
  }, [key])

  const API_URL = isPremium
    ? `https://api.deepl.com/v2`
    : `https://api-free.deepl.com/v2`

  const defaultOption: TranslateOption = {
    targetLang: defaultTargetLang,
  }

  // AuthKeyが正しいか確認
  useEffect(() => {
    if (!debouncedKey || !key) return setIsSuccess(false)
    try {
      ;(async () => {
        await setIsError(false)
        await setIsSuccess(false)

        const input: TranslateInput = {
          text: '',
          target_lang: defaultOption.targetLang,
          source_lang: 'JA',
          auth_key: key,
        }
        const body = Object.keys(input).reduce(
          (o, key) => (o.set(key, input[key]), o),
          new URLSearchParams()
        )
        const resp = await fetch(`${API_URL}/translate`, {
          method: 'POST',
          body: body,
        })

        setIsError(!resp.ok)
        setIsSuccess(resp.ok)
      })()
    } catch {}
  }, [debouncedKey])

  const onTranslate = async (
    text: string,
    option = defaultOption
  ): Promise<TranslateOutput> => {
    try {
      if (text === '') throw '原文を入力してください'
      const input: TranslateInput = {
        text: text,
        target_lang: option.targetLang,
        source_lang: option.targetLang === 'JA' ? 'EN-US' : 'JA',
        auth_key: key,
      }
      const body = Object.keys(input).reduce(
        (o, key) => (o.set(key, input[key]), o),
        new URLSearchParams()
      )

      const resp = await fetch(`${API_URL}/translate`, {
        method: 'POST',
        body: body,
      })

      if (!resp.ok) throw '翻訳に失敗しました'
      return {
        status: 200,
        body: (await resp.json()) as any,
      }
    } catch (err: any) {
      return {
        status: 400,
        errorMessage: err,
      }
    }
  }

  return { onTranslate, isSuccess, isError }
}

export const useDebouncedState = <T = any>(
  defaultValue: T,
  wait: number,
  options = { leading: false }
) => {
  const [value, setValue] = useState(defaultValue)
  const timeoutRef = useRef<number>(null)
  const leadingRef = useRef(true)

  // @ts-ignore
  const clearTimeout = () => window.clearTimeout(timeoutRef.current)
  useEffect(() => clearTimeout, [])

  const debouncedSetValue = (newValue: T) => {
    clearTimeout()
    if (leadingRef.current && options.leading) {
      setValue(newValue)
    } else {
      // @ts-ignore
      timeoutRef.current = window.setTimeout(() => {
        leadingRef.current = true
        setValue(newValue)
      }, wait)
    }
    leadingRef.current = false
  }

  return [value, debouncedSetValue] as const
}
