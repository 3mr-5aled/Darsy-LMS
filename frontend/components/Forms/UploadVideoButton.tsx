import { CldUploadWidget } from "next-cloudinary"

type UploadButtonProps = {
  onVideoUpload: (url: string, publicId: string, fileName: string) => void
}

const UploadVideoButton = ({ onVideoUpload }: UploadButtonProps) => {
  const handleUpload = (result: any, error: string | null) => {
    if (result.event === "success" && result.info?.secure_url) {
      // Call the onVideoUpload function with the uploaded Video URL
      const original_filename = result.info.original_filename
      const format = result.info.format
      const fileName = original_filename.concat("." + format)
      const publicId = result.info.public_id
      const secureUrl = result.info.secure_url

      onVideoUpload(secureUrl, publicId, fileName)
    } else {
      console.error(error || "Video upload failed")
    }
  }

  return (
    <CldUploadWidget
      uploadPreset="my_preset"
      onUpload={handleUpload}
      options={{
        sources: ["local"],
        maxFiles: 1, // Allow only one file to be uploaded
        resourceType: "video", // Specify the resource type as 'Video'
      }}
    >
      {({ open }) => {
        function handleOnClick(e: React.MouseEvent<HTMLButtonElement>) {
          e.preventDefault()
          open()
        }
        return (
          <button className="btn btn-primary" onClick={handleOnClick}>
            Upload a Video
          </button>
        )
      }}
    </CldUploadWidget>
  )
}

export default UploadVideoButton
