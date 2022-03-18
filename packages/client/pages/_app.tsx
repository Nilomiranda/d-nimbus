import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'
import { theme } from '../config/theme'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '../config/queryClient'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Nimbus | File Sharing</title>
        <meta charSet="utf-8" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
