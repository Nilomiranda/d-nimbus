import { CopyIcon } from '@chakra-ui/icons'
import { Button, Flex, Heading, Text, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { FileInterface } from '../../interfaces/file'
import { downloadFile as downloadFileHelper } from '../../services/file'

const FilePage = () => {
  const router = useRouter()
  const { id } = router.query
  const toast = useToast()
  const { data: file, isLoading: loadingFile, isError: errorLoadingFile } = useQuery<unknown, unknown, FileInterface>(`/file/${id}`, { enabled: !!id })
  const { isLoading: downloadingFile, refetch: downloadFile } = useQuery(``, () => downloadFileHelper(String(id)), { enabled: false })

  const handleDownloadClick = async () => {
    if (!file) return

    try {
      const { data: { data } } = await downloadFile()

      const blob = new Blob([data])
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = `${file.uuid}${file.name}`
      link.click()
    } catch (err) {
      console.error('Error download file')
      toast({
        description: 'There was an error trying to download your file. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleCopyLinkClick = async () => {
    if (typeof window !== 'undefined') {
      await navigator.clipboard.writeText(window.location.href)
      toast({
        description: 'Link copied.',
        status: 'success',
        duration: 1500,
        isClosable: true,
      })
    }
  }

  if (!id) return <Heading>Ooops, no file to display</Heading>

  if (!file && loadingFile) return <Heading>Loading file</Heading>

  if (errorLoadingFile) return <Heading>Error loading the file. The file may not exist or you don't have access to it.</Heading>

  return (
    <Flex w="100%" h="100%" flexDirection="column" alignItems="center" justifyContent="flex-start" pt="1rem">
      <Text mb="1.5rem" fontSize="lg">
        Here's the link to share this file
      </Text>
      {typeof window !== 'undefined' ? (
        <Flex alignItems="center" mb="0">
          <Text fontWeight="bold" fontSize="md">
            {window.location.href}
          </Text>
          <Button onClick={handleCopyLinkClick} type="button" ml="0.75rem" size="xs" variant="ghost">
            <CopyIcon mr="0.25rem" />
            Copy
          </Button>
        </Flex>
      ) : null}

      <Flex mt="1.75rem" alignItems="center" justifyContent="center">
        <Button type="button" onClick={handleDownloadClick} isLoading={downloadingFile} loadingText="Downloading your file">
          Download file
        </Button>
      </Flex>
    </Flex>
  )
}

export default FilePage
