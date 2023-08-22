import React, { useState } from "react";
import aws from "aws-sdk";
const s3 = new aws.S3({
  accessKeyId: "",
  secretAccessKey: "",
  region: "",
});
const AwsUploader: React.FC = () => {
  const [uploadedObject, setUploadedObject] = useState<any>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file?.name) {
      return;
    }
    const Key = Date.now() + file?.name;
    if (file) {
      try {
        const uploadParams = {
          Bucket: "lessons-videos",
          Key,
          Body: file,
      };

        const url = (await s3.upload(uploadParams).promise()).Location
        console.log(url)
        

        // try {
        //   const objectResponse = await s3.getObject(getObjectParams).promise()
        //   const objectKey = getObjectParams.Key; // Assuming you have the object's key
        //   const bucketName = getObjectParams.Bucket; // Assuming you have the bucket name
        //   const params = { Bucket: bucketName, Key: objectKey }; // Expires after 1 hour
        //   const objectUrl = await s3.getSignedUrlPromise("getObject", params);
        //   console.log(objectUrl);
        // } catch (error) {
        //   console.error("Error getting object:", error);
        // }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default AwsUploader;
