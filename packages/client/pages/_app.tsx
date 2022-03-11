import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'
import { theme } from '../config/theme'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Nimbus | File Sharing</title>
        <meta charSet="utf-8" />
      </Head>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

export default MyApp
