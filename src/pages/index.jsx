// pages/index.tsx

import Head from 'next/head'
import Container from 'react-bootstrap/Container'
import { Header, WelcomePage, Listings } from '@/components'
import { PublicLayout } from "@/components/Layouts"

const Home = () => {
  return (
    <>
      <Head>
        <title>owo - Économie circulaire à Québec</title>
        <meta name="description" content="owo" />
      </Head>
      <Container fluid className="g-primary h-screen">
        <Header />
        <WelcomePage />
      </Container>
    </>
  )
}



Home.getLayout = function getLayout(page) {
  return <PublicLayout>{page}</PublicLayout>
}

export default Home
