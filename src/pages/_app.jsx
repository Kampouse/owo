// pages/_app.tsx

import { AuthenticationProvider } from '@/contexts/authentication/AuthenticationContext'
import { UiContextProvider } from '@/contexts/UiContext'
import '@/styles/globals.css'
import TimeAgo from 'javascript-time-ago'
import Head from 'next/head'
import en from 'javascript-time-ago/locale/en.json'
import fr from 'javascript-time-ago/locale/fr.json'
import { Analytics } from "@vercel/analytics/react"

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(fr)

const MyApp = ({
  Component,
  pageProps,
}) => {

  const getLayout = Component.getLayout || ((page) => page);

  return(
  <>
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
    </Head>
    <UiContextProvider>
      <AuthenticationProvider>
        {getLayout(<Component {...pageProps} />)}
      </AuthenticationProvider>
    </UiContextProvider>
    <Analytics />
  </>
  )
}

export default MyApp;
