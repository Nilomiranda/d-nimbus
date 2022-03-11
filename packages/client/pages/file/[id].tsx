import { CopyIcon } from '@chakra-ui/icons'
import { Button, Flex, Text, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FileInterface } from '../../interfaces/file'
import { downloadFile, getFile } from '../../services/file'

const FilePage = () => {
  const router = useRouter()
  const { id } = router.query
  const toast = useToast()

  const [file, setFile] = useState<FileInterface | null>(null)
  const [errorLoadingFile, setErrorLoadingFile] = useState('')

  useEffect(() => {
    console.log({ fileId: id })
    const loadFile = async () => {
      try {
        setFile(await getFile(String(id)))
      } catch (err) {
        console.error('LoadFile:Error::', err)
        setErrorLoadingFile('Could not load file. It might not exist anymoe.')
      }
    }

    if (id) loadFile()
  }, [id])

  const handleDownloadClick = async () => {
    if (!file) return

    const { data } = await downloadFile(file.id)

    const blob = new Blob([data])
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = `${file.uuid}${file.name}`
    link.click()
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

  if (!id) return <h1>Ooops, no file to display</h1>

  if (!file && !errorLoadingFile) return <h1>Loading file</h1>

  if (errorLoadingFile) return <h1>{errorLoadingFile}</h1>

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
          <Button onClick={handleCopyLinkClick} type="button" ml="0.75rem" size="xs">
            <CopyIcon mr="0.25rem" />
            Copy
          </Button>
        </Flex>
      ) : null}

      <Flex mt="1.75rem" alignItems="center" justifyContent="center">
        <Button type="button" onClick={handleDownloadClick}>
          Download file
        </Button>
      </Flex>
    </Flex>
  )
}

export default FilePage
