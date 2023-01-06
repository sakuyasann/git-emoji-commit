import {
  Box,
  Center,
  Flex,
  Group,
  Input,
  Loader,
  Modal,
  Select,
  Stack,
  Switch,
  Text,
  TextInput,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core'
import { RiSettingsFill } from 'react-icons/ri'
import React, { useEffect, useReducer } from 'react'
import { useDisclosure, useSetState } from '@mantine/hooks'
import {
  DeepLLang,
  I18LangStore,
  I18LangType,
  SettingProps,
  SettingStore,
  useDeepL,
  useI18Text,
} from '~/share'
import { useRecoilState } from 'recoil'
import { I18_TEXT } from '../config'

const LOCAL_KEY = 'setting'

const setting = () => {
  const theme = useMantineTheme()
  const [opened, handle] = useDisclosure(false)
  const [lang, setLang] = useRecoilState(I18LangStore)
  const { text } = useI18Text(I18_TEXT, lang)
  const [loaded, updateLoaded] = useReducer(() => true, false)

  const [gSetting, setGSetting] = useRecoilState(SettingStore)

  const [setting, setSetting] = useSetState<SettingProps>(gSetting)
  const { isError, isSuccess } = useDeepL({
    key: setting.isTranslate ? setting.translateKey : '',
  })

  useEffect(() => {
    setLang(setting.lang)
    // ロードされていない時
    if (!loaded) {
      const local = localStorage.getItem(LOCAL_KEY)
      // ローカルストレージからデータをロード
      if (local) {
        setSetting(JSON.parse(local))
      }
      // ローカルストレージにデータがなければ登録
      if (!local) {
        localStorage.setItem(LOCAL_KEY, JSON.stringify(setting))
      }
      return updateLoaded()
    }

    // ローカルストレージに保存
    setGSetting(setting)
    return localStorage.setItem(LOCAL_KEY, JSON.stringify(setting))
  }, [setting])

  return (
    <>
      <UnstyledButton
        pos={'fixed'}
        bottom={56}
        right={56}
        onClick={handle.open}
      >
        <Center
          w={56}
          sx={(theme) => ({
            borderRadius: `50%`,
            backgroundColor: theme.colors.violet[9],
            aspectRatio: `1/1`,
            fontSize: 24,
          })}
        >
          <RiSettingsFill color={theme.colors.violet[0]} />
        </Center>
      </UnstyledButton>
      <Modal
        opened={opened}
        onClose={handle.close}
        centered
        size={'lg'}
        title={text['settingTitle']}
        styles={(theme) => ({
          header: {
            fontSize: theme.fontSizes.xl,
          },
        })}
      >
        <Stack mt={'xl'} spacing={'xl'}>
          <Group noWrap>
            <Text sx={{ flexGrow: 1 }}>{text['settingLanguage']}</Text>
            <Group position={'right'} w={104}>
              <Select
                data={['en', 'ja']}
                value={setting.lang}
                onChange={(val) =>
                  setSetting({ lang: val ? (val as I18LangType) : lang })
                }
              />
            </Group>
          </Group>
          <Stack>
            <Group align={'flex-start'} noWrap>
              <Box>
                <Text sx={{ flexGrow: 1 }}>{text['settingTransition']}</Text>
                <Text color={'dark.2'} size={'sm'} mt={'xs'}>
                  {text['settingTransitionDescription']}
                </Text>
              </Box>
              <Group position={'right'} w={104}>
                <Switch
                  onChange={(e) =>
                    setSetting({ isTranslate: e.target.checked })
                  }
                  checked={setting.isTranslate}
                />
              </Group>
            </Group>
            <Group spacing={'xs'} noWrap>
              <TextInput
                sx={{
                  flex: `0 0 60%`,
                }}
                label={'AuthKey'}
                placeholder="xxxxxxxxxx-xxxx-xxxx-xxxx-xxxxxx:fx"
                value={setting.translateKey}
                onChange={(e: any) =>
                  setSetting({ translateKey: e.target.value })
                }
              />
              <Select
                sx={{
                  flexGrow: 1,
                }}
                label={text['authLabelPlan']}
                data={['free', 'premium']}
                value={setting.translatePlan}
                onChange={(val) =>
                  setSetting({
                    translatePlan: val
                      ? (val as SettingProps['translatePlan'])
                      : 'free',
                  })
                }
              />
              <Select
                sx={{
                  flexGrow: 1,
                }}
                label={text['authLabelTarget']}
                data={['EN-US', 'JA']}
                value={setting.translateTarget}
                onChange={(val) =>
                  setSetting({
                    translateTarget: val
                      ? (val as SettingProps['translateTarget'])
                      : 'EN-US',
                  })
                }
              />
            </Group>
            {setting.translateKey && setting.isTranslate && (
              <Group>
                {!isSuccess && !isError && (
                  <>
                    <Loader size={'xs'} />
                    <Text size={'xs'} color={'gray.6'}>
                      {text['AuthKeyVerify']}
                    </Text>
                  </>
                )}
                {isSuccess && (
                  <Text size={'sm'} color={'green.6'}>
                    {text['AuthKeyVerifySuccess']}
                  </Text>
                )}
                {isError && (
                  <Text size={'sm'} color={'red.6'}>
                    {text['AuthKeyVerifyError']}
                  </Text>
                )}
              </Group>
            )}
          </Stack>
        </Stack>
      </Modal>
    </>
  )
}

export default setting
