import { QueryClient } from 'react-query'
import { httpClient } from './httpClient'

const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await httpClient.get(`${queryKey[0]}`)
  return data
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
})
