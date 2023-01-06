import { useClipboard, useSetState } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import axios from 'axios'
import { useEffect, useReducer, useState } from 'react'
import { useRecoilValue } from 'recoil'
import {
  CharacterCount,
  I18LangStore,
  SettingStore,
  useDeepL,
  useI18Text,
} from '~/share'
import { I18_TEXT } from '../config'
import UAParser from 'ua-parser-js'

interface CommitProps {
  prefix: string
  issue: string
  message: string
}

export const useCommitHooks = () => {
  const setting = useRecoilValue(SettingStore)
  const [loaded, updateLoaded] = useReducer(() => true, false)
  const [counter, setCounter] = useState(1)
  const lang = useRecoilValue(I18LangStore)
  const { onTranslate } = useDeepL({
    key: setting.translateKey,
    isPremium: setting.translatePlan === 'premium',
  })

  const clipboard = useClipboard({ timeout: 500 })

  const { text } = useI18Text(I18_TEXT, lang)
  const [commit, setCommit] = useSetState<CommitProps>({
    prefix: '',
    issue: '',
    message: '',
  })

  // 字数カウント
  useEffect(() => {
    const parser = UAParser()
    const browser = parser.browser
    if (!loaded) return updateLoaded()

    const count = Object.assign({}, commit)
    count.prefix = ''

    // Firefox以外ならJSで取得
    if (browser.name !== 'Firefox') {
      setCounter(CharacterCount(createMessage(count)))
      return
    }

    // FirefoxはAPIから取得
    ;(async () => {
      const body = { text: createMessage(count) }
      const res = await axios.post<number>(`/api/character-count`, body)
      if (res.status !== 200) return
      setCounter(res.data)
    })()
  }, [commit.message, commit.issue])

  const setPrefix = (val: string | null) => {
    setCommit({ prefix: val ?? '' })
  }
  const setIssue = (e: any) => {
    setCommit({ issue: e.target.value })
  }
  const setMessage = (e: any) => setCommit({ message: e.target.value })

  // メッセージコピー処理
  const handleCopy = async () => {
    const obj = Object.assign({}, commit)

    if (setting.isTranslate) {
      const msg = await onTranslate(commit.message, {
        targetLang: setting.translateTarget,
      })

      if (msg.status !== 200) return
      obj.message = msg.body?.translations[0].text ?? ''
    }

    const message = createMessage(obj)
    clipboard.copy(message)

    showNotification({
      message: text['copied'],
      styles(theme) {
        return {
          root: {
            background: theme.colors.violet[6],
            padding: theme.spacing.xl,
            border: 'none',
          },
          description: {
            color: theme.colors.violet[0],
            fontSize: theme.fontSizes.lg,
            fontWeight: 700,
          },
          closeButton: {
            color: theme.colors.violet[0],
            '&:hover': {
              backgroundColor: theme.colors.violet[7],
            },
          },
        }
      },
    })
  }

  return { handleCopy, setPrefix, setIssue, setMessage, commit, text, counter }
}

const createMessage = ({ prefix, issue, message }: CommitProps) => {
  issue = issue ? ` #${issue}` : ''
  return `${prefix}${issue} ${message}`
}
