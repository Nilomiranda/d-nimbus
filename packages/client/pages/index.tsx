import { Button, Flex, Heading, Input, Text } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { uploadFile } from '../services/file'

const Index = () => {
  const [uploadedFile, setUploadedFile] = useState(null)

  const fileRef = useRef(null)

  const handleFileSubmit = async (event) => {
    event.preventDefault()

    const file = fileRef.current.files[0]

    const formData = new FormData()
    formData.append('document', file)

    try {
      const savedFile = await uploadFile(formData)
      setUploadedFile(savedFile)
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

        <Button mt="1rem" type="submit">
          Upload file
        </Button>
      </Flex>

      <br />

      {uploadedFile ? (
        <div>
          <p>File uploaded!</p>
          <a href={`http://localhost:3000/file/${uploadedFile.id}`}>{uploadedFile.name}</a>
        </div>
      ) : null}
    </Flex>
  )
}

export default Index
