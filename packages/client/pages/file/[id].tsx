import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FileInterface } from '../../interfaces/file'
import { downloadFile, getFile } from '../../services/file'

const FilePage = () => {
  const router = useRouter()
  const { id } = router.query

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

  const handleCopyLinkClick = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (!id) return <h1>Ooops, no file to display</h1>

  if (!file && !errorLoadingFile) return <h1>Loading file</h1>

  if (errorLoadingFile) return <h1>{errorLoadingFile}</h1>

  return (
    <div>
      <h1>Here's the link to share this file</h1>
      {typeof window !== 'undefined' ? <strong>{window.location.href}</strong> : null}
      <button onClick={handleCopyLinkClick} type="button">
        Copy
      </button>
      <br />

      <button type="button" onClick={handleDownloadClick}>
        Download file
      </button>
    </div>
  )
}

export default FilePage
