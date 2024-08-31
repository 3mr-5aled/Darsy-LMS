import React, { useState } from "react";
import aws from "aws-sdk";
const s3 = new aws.S3({
  region: process.env.NEXT_PUBLIC_REGION,
  accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
});
type UploadButtonProps = {
  onVideoUpload: (url: string, publicId: string, fileName: string) => void;
};
const AwsUploader = ({ onVideoUpload }: UploadButtonProps) => {
  const [uploadedObject, setUploadedObject] = useState<any>(null);
  const [progress, setProgress] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file?.type);
    if (!file?.name || file?.type !== "video/mp4") {
      return;
    }
    const Key = Date.now() + file?.name;
    if (file) {
      try {
        const uploadParams = {
          Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
          Key,
          Body: file,
        };
        const uploadedVideo = await s3
          .upload(uploadParams as any)
          .on("httpUploadProgress", (progress : any) => {
            setProgress((progress.loaded / progress.total).toFixed(0));
          })
          .promise();
        console.log(uploadedVideo);
        onVideoUpload(
          uploadedVideo.Location,
          uploadedVideo.Key,
          uploadedVideo.Key,
        );
        setProgress("100");
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <>
      {progress === null ? (
        <label className="btn btn-primary">
          Upload a Video
          <input
            title="video-upload"
            className="input input-bordered"
            type="file"
            hidden
            onChange={handleFileChange}
          />
        </label>
      ) : (
        <div className=" flex items-center gap-2">
          <progress
            className="progress progress-primary h-10 w-full bg-transparent"
            value={progress}
            max="100"
          ></progress>
          <span>{progress}%</span>
        </div>
      )}
    </>
  );
};

export default AwsUploader;
