import { useState } from "react"
import { Upload } from "@aws-sdk/lib-storage"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"

function VideoUpload() {
  const [progress, setProgress] = useState<null | string>(null)
  const client = new S3Client({
    region: process.env.NEXT_PUBLIC_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_ACCESSKEYID,
      secretAccessKey: process.env.NEXT_PUBLIC_SECRETACCESSKEY,
    },
  })
  const handleFileChange = async (e: any) => {
    const file = e.target.files[0]
    try {
      const parallelUploads3 = new Upload({
        client,
        params: { Bucket: "bucket name", Key: "file name", Body: file },
        leavePartsOnError: false, // optional manually handle dropped parts
      })

      parallelUploads3.on("httpUploadProgress", (progress: any) => {
        setProgress(progress.loaded / progress.total + "%")
      })

      await parallelUploads3.done()
      const command = new GetObjectCommand({
        Bucket: "bucket name",
        Key: "file name",
      })
      const url = await getSignedUrl(client, command)
      console.log("success")
      return url
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <input type="file" hidden onChange={(e) => handleFileChange(e as any)} />
    </div>
  )
}

export default VideoUpload
