import { ActionArgs } from '@remix-run/node'
import { CharacterCount } from '~/share'

export const action = async ({ request }: ActionArgs) => {
  const { text } = await request.json()
  if (!text) return
  return CharacterCount(text)
}
