import type { LinksFunction, MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import { MantineProvider, createEmotionCache } from '@mantine/core'
import { StylesPlaceholder } from '@mantine/remix'
import { NotificationsProvider } from '@mantine/notifications'
import { MantineTheme } from './share'
import { RecoilRoot } from 'recoil'
import favicon from './share/assets/images/favicon.svg'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'GitEmojiCommit',
  viewport: 'width=device-width,initial-scale=1',
})

export const links: LinksFunction = () => {
  return [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap',
    },
    { rel: 'icon', href: favicon, type: `image/svg+xml` },
  ]
}

createEmotionCache({ key: 'mantine' })

export default function App() {
  return (
    <MantineProvider theme={MantineTheme} withGlobalStyles withNormalizeCSS>
      <html lang="en">
        <head>
          <StylesPlaceholder />
          <Meta />
          <Links />
        </head>
        <body>
          <RecoilRoot>
            <NotificationsProvider>
              <Outlet />
            </NotificationsProvider>
          </RecoilRoot>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </MantineProvider>
  )
}
