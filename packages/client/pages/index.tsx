import {useRef, useState} from "react";
import {uploadFile} from "../services/file";

const Index = () => {
  const [uploadedFile, setUploadedFile] = useState(null)

  const fileRef = useRef(null)

  const handleFileSubmit = async (event) => {
    event.preventDefault();

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
    <div>
      <h1>Nimbus File Sharing</h1>

      <strong>Select a file to be uploaded and shared.</strong>
      <br /><br />

      <form onSubmit={handleFileSubmit}>
        <label>
          <span>Select file</span>
          <input type="file" ref={fileRef} />
        </label>
        <br/>

        <button type="submit">Upload file</button>
      </form>

      <br />

      {
        uploadedFile ?
          (
            <div>
              <p>File uploaded!</p>
              <a href={`http://localhost:3000/file/${uploadedFile.id}`}>{uploadedFile.name}</a>
            </div>
          ) : null
      }
    </div>
  )
}

export default Index
