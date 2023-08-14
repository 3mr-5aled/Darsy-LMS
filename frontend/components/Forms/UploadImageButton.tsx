import { CldUploadWidget } from "next-cloudinary"

type UploadButtonProps = {
  onImageUpload: (url: string, publicId: string, fileName: string) => void
}

const UploadButton = ({ onImageUpload }: UploadButtonProps) => {
  const handleUpload = (result: any, error: string | null) => {
    if (result.event === "success" && result.info?.secure_url) {
      // Call the onImageUpload function with the uploaded image URL
      const original_filename = result.info.original_filename
      const format = result.info.format
      const fileName = original_filename.concat("." + format)
      const publicId = result.info.public_id
      const secureUrl = result.info.secure_url

      onImageUpload(secureUrl, publicId, fileName)
    } else {
      console.error(error || "Image upload failed")
    }
  }

  return (
    <CldUploadWidget
      uploadPreset="my_preset"
      onUpload={handleUpload}
      options={{
        sources: ["local", "camera", "url"],
        maxFiles: 1, // Allow only one file to be uploaded
        resourceType: "image", // Specify the resource type as 'image'
      }}
    >
      {({ open }) => {
        function handleOnClick(e: React.MouseEvent<HTMLButtonElement>) {
          e.preventDefault()
          open()
        }
        return (
          <button className="btn btn-primary" onClick={handleOnClick}>
            Upload an Image
          </button>
        )
      }}
    </CldUploadWidget>
  )
}

export default UploadButton
