import {
  Box,
  Button,
  Group,
  Input,
  Select,
  SimpleGrid,
  Text,
  Textarea,
  Title,
  Tooltip,
} from '@mantine/core'
import { useRecoilValue } from 'recoil'
import { COMMIT_PREFIX, I18LangStore } from '~/share'
import { CommitMessageCard, CommitMessageSetting } from '.'
import { useCommitHooks } from '../hooks'

const core = () => {
  const lang = useRecoilValue(I18LangStore)
  const { handleCopy, setPrefix, setIssue, setMessage, commit, text, counter } =
    useCommitHooks()

  return (
    <Box bg={'dark.7'} mih={'100vh'}>
      <Box bg={'violet.4'} py={72}>
        <Title align="center" size={72}>
          GitEmojiCommit
        </Title>
        <Text
          align="center"
          mt={'sm'}
          sx={{
            fontSize: 36,
            fontWeight: 700,
          }}
        >
          Emoji Guide for Commit Messages
        </Text>
      </Box>
      <Box maw={1200} mx={'auto'} py={'xl'} px={'xl'}>
        <Group bg={'dark.4'} py={'xs'} px={'md'} position={'apart'}>
          <Group sx={{ flex: `1 1 auto` }} align={'flex-start'}>
            <Box sx={{ flex: `1 1 auto !important` }}>
              <Select
                w={'100%'}
                data={Object.keys(COMMIT_PREFIX).map((key) => ({
                  label: COMMIT_PREFIX[key].description[lang],
                  value: COMMIT_PREFIX[key].code,
                }))}
                searchable
                placeholder={text['prefix']}
                onChange={setPrefix}
                value={commit['prefix']}
                styles={{
                  input: {
                    height: 44,
                  },
                }}
              />
            </Box>
            <Input
              variant={'filled'}
              placeholder={'#Issue Number'}
              onChange={setIssue}
              value={commit['issue']}
              styles={{
                input: {
                  height: 44,
                },
              }}
            />
            <Box sx={{ flex: `1 1 auto !important` }}>
              <Tooltip
                label={text['characterOver']}
                position={'top-end'}
                opened={counter > 71}
              >
                <Textarea
                  size="sm"
                  variant={'filled'}
                  placeholder={text['commitMessage']}
                  onChange={setMessage}
                  value={commit['message']}
                  autosize
                  rightSection={
                    <Text size={'xs'} color={counter > 71 ? 'red.6' : 'gray.6'}>
                      {counter}
                    </Text>
                  }
                />
              </Tooltip>
            </Box>
          </Group>
          <Button onClick={handleCopy} h={44}>
            {text['copy']}
          </Button>
        </Group>
        <SimpleGrid spacing={'xl'} cols={4} mt={'xl'}>
          {Object.keys(COMMIT_PREFIX).map((key) => {
            return <CommitMessageCard data={COMMIT_PREFIX[key]} lang={lang} />
          })}
        </SimpleGrid>
      </Box>
      <CommitMessageSetting />
    </Box>
  )
}

export default core
