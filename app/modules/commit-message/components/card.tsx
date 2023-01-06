import { Box, Center, Text, Title } from '@mantine/core'
import { CommiePrefixItem, I18LangType } from '~/share'

interface Props {
  data: CommiePrefixItem
  lang?: I18LangType
}

const card = ({ data, lang = 'en' }: Props) => {
  return (
    <Box
      bg={'dark.4'}
      sx={(theme) => ({
        borderRadius: theme.radius.sm,
        overflow: 'hidden',
      })}
    >
      <Center p={'xl'} bg={'violet.4'}>
        <Text size={64}>{data.emoji}</Text>
      </Center>
      <Box py={'lg'} px={'sm'}>
        <Title size={'h3'} color={'violet.0'} align="center">
          {data.code}
        </Title>
        <Text color={'violet.0'} align="center" mt={'xs'}>
          {data.description[lang]}
        </Text>
      </Box>
    </Box>
  )
}

export default card
