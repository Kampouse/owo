// pages/index.tsx

import Head from 'next/head'
import WelcomePage from '@/components/AuthPage'
import { AuthLayout } from "@/components/Layouts"

const Home = () => {
  return (
    <>
      <Head>
        <title>owo - Économie circulaire à Québec</title>
        <meta name="description" content="owo" />
      </Head>
      <WelcomePage />
    </>
  )
}



Home.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>
}

export default Home
