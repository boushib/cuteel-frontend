import { ChangeEvent, useState } from 'react'
import ImageIcon from '@/icons/Image'

const MAX_FILE_SIZE = 5 * 1024 * 1024

type Props = {
  maxFileSize?: number
  label?: string
  onChange: (file: File) => void
}

const FileUpload: React.FC<Props> = ({
  maxFileSize = MAX_FILE_SIZE,
  label = 'Image',
  onChange,
}) => {
  const [isUploading, setIsUploading] = useState(false)
  const [isSuccess, setisSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [file, setFile] = useState<File>()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    const file = files ? files[0] : undefined
    if (file) {
      setFile(file)
      onChange(file)
    }
  }
  return (
    <>
      <label htmlFor="image">{label}</label>
      <div className="file-upload">
        <input
          type="file"
          id="image"
          name="image"
          className="form-control"
          placeholder="Product image"
          multiple={false}
          onChange={handleFileChange}
        />
        <div>
          <ImageIcon />
          {file && <p className="file__name">{file.name}</p>}
          {!file && <p>Drop your file here or Click to browse</p>}
        </div>
      </div>
    </>
  )
}

export default FileUpload
