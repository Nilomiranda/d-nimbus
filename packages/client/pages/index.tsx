import { Button, Flex, Heading, Input, Link, Text } from '@chakra-ui/react'
import { useRef } from 'react'
import { useMutation } from 'react-query'
import { uploadFile } from '../services/file'

const Index = () => {
  const { mutate, isLoading, isError, data } = useMutation(uploadFile)

  const fileRef = useRef(null)

  const handleFileSubmit = async (event) => {
    event.preventDefault()

    const file = fileRef.current.files[0]

    const formData = new FormData()
    formData.append('document', file)

    try {
      await mutate(formData)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Flex flexDirection="column" alignItems="center" w="100%">
      <Heading mb="1.75rem">Nimbus File Sharing</Heading>

      <Text fontWeight="bold" mb="1rem">
        Select a file to be uploaded and shared.
      </Text>
      <br />
      <br />

      <Flex as="form" onSubmit={handleFileSubmit} flexDirection="column">
        <input type="file" ref={fileRef} />

        <Button mt="1rem" type="submit" isLoading={isLoading} loadingText="Uploading your file">
          Upload file
        </Button>
      </Flex>

      <br />

      {isError ? (
        <Text fontSize="12px" fontWeight="bold">
          We couldn't upload your file. Please try again.
        </Text>
      ) : null}

      {!isLoading && !isError && data ? (
        <Flex flexDirection="column" alignItems="center">
          <Text>File uploaded!</Text>
          <Link href={`http://localhost:3000/file/${data.id}`}>{data.name}</Link>
        </Flex>
      ) : null}
    </Flex>
  )
}

export default Index
